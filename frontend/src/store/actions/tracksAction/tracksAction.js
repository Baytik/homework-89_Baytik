import axiosAPI from "../../../axiosAPI";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const FETCH_TRACKS_HISTORY = 'FETCH_TRACKS_HISTORY';
export const DELETE_TRACK_ERROR = 'DELETE_TRACK_ERROR';
export const PUBLISH_TRACK_ERROR = 'PUBLISH_TRACK_ERROR';
export const CREATE_TRACK_ERROR = 'CREATE_TRACK_ERROR';

export const fetchTrackSuccess = (tracks) => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const errorMessage = (error) => ({type: ERROR_MESSAGE, error});
export const fetchTracksHistory = track => ({type: FETCH_TRACKS_HISTORY, track});
export const deleteTrackError = (error) => ({type: DELETE_TRACK_ERROR, error});
export const createTrackError = (error) => ({type: CREATE_TRACK_ERROR, error});

export const publishTrackError = (error) => ({type: PUBLISH_TRACK_ERROR, error});

export const fetchTrack = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            const response =  await axiosAPI.get(`/tracks?album=${id}`, {headers: {'Authorization': token.token}});
            dispatch(fetchTrackSuccess(response.data));
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const createTrack = (track, id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/tracks', track, {headers: {'Authorization': token.token}});
            dispatch(fetchTrack(id))
        } catch (error) {
            dispatch(createTrackError(error))
        }
    }
};

export const deleteTrack = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.delete(`/tracks/${id}`, {headers: {'Authorization': token.token}});
        } catch (error) {
            dispatch(deleteTrackError(error));
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

export const publishTrack = (id) => {
    return async (dispatch,  getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post(`tracks/${id}/published`, id, {headers: {'Authorization': token.token}});
            alert('Please rendering');
        } catch (error) {
            dispatch(publishTrackError(error));
        }
    }
};