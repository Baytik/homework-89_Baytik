import {FETCH_TRACKS_SUCCESS} from "../../actions/tracksAction/tracksAction";

const initialState = {
    tracks: [],
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return {...state, tracks: action.tracks};
        default:
            return state;
    }
};

export default tracksReducer;