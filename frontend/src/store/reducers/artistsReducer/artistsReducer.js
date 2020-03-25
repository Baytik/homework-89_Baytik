import {FETCH_ARTISTS_SUCCESS} from "../../actions/artistsAction/artistsAction";

const initialState = {
    artists: [],
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_SUCCESS:
            return {...state, artists: action.artists};
        default:
            return state;
    }
};

export default artistsReducer;