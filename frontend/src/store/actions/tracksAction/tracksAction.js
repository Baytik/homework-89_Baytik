import axiosAPI from "../../../axiosAPI";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const FETCH_TRACKS_HISTORY = 'FETCH_TRACKS_HISTORY';

export const fetchTrackSuccess = (tracks) => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const errorMessage = (error) => ({type: ERROR_MESSAGE, error});
export const fetchTracksHistory = track => ({type: FETCH_TRACKS_HISTORY, track});

export const fetchTrack = (id) => {
    return async (dispatch) => {
        try {
            const response =  await axiosAPI.get(`/tracks?album=${id}`);
            dispatch(fetchTrackSuccess(response.data));
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const postHistory = (track) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/track_history', track,{headers: {'Authorization': token.token}});
            alert('Listened');
        } catch (error) {
            dispatch(errorMessage(error))
        }
    }
};

export const fetchHistory = () => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            const response = await axiosAPI.get('/track_history', {headers: {'Authorization': token.token}});
            dispatch(fetchTracksHistory(response.data))
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};