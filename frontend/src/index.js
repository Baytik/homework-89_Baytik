import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import userLogReducer from "./store/reducers/userLogReducer/userLogReducer";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from "connected-react-router";
import artistsReducer from "./store/reducers/artistsReducer/artistsReducer";
import albumsReducer from "./store/reducers/albumsReducer/albumsReducer";
import tracksReducer from "./store/reducers/tracksReducer/tracksReducer";
import historyReducer from "./store/reducers/historyReducer/historyReducer";

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log('Could not save state')
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    router: connectRouter(history),
    user: userLogReducer,
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    tracksHistories: historyReducer
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, enhancers);
store.subscribe(() => {
    saveToLocalStorage({
        user: {
            user: store.getState().user.user
        }
    })
});

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));