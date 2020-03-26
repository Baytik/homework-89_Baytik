import {FETCH_TRACKS_HISTORY} from "../../actions/tracksAction/tracksAction";

const initialState = {
    tracksHistories: [],
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_HISTORY:
            return {...state, tracksHistories: action.track};
        default:
            return state;
    }
};

export default historyReducer;