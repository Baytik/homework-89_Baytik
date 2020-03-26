import {FETCH_ALBUMS_SUCCESS} from "../../actions/albumsAction/albumsAction";

const initialState = {
    albums: [],
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_SUCCESS:
            return {...state, albums: action.albums};
        default:
            return state;
    }
};

export default albumReducer;