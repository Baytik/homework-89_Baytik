import axiosAPI from "../../../axiosAPI";
import {push} from 'connected-react-router';

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const POST_ARTIST_ERROR = 'POST_ARTIST_ERROR';
export const DELETE_ARTIST_ERROR = 'DELETE_ARTIST_ERROR';

export const fetchArtistsSuccess = (artists) => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistsError = (error) => ({type: ERROR_MESSAGE, error});

export const postArtistError = (error) => ({type: POST_ARTIST_ERROR, error});
export const deleteArtistError = (error) => ({type: DELETE_ARTIST_ERROR, error});

export const fetchArtists = () => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            const response =  await axiosAPI.get('/artists', {headers: {'Authorization': token.token}});
            dispatch(fetchArtistsSuccess(response.data));
        } catch (error) {
            dispatch(fetchArtistsError(error))
        }
    }
};

export const postArtist = (artist) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/artists', artist, {headers: {'Authorization': token.token}});
            dispatch(push('/'))
        } catch (error) {
            dispatch(postArtistError(error))
        }
    }
};

export const deleteArtist = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.delete(`/artists/${id}`, {headers: {'Authorization': token.token}});
            dispatch(fetchArtists());
        } catch (error) {
            dispatch(deleteArtistError(error));
            dispatch(fetchArtists());
        }
    }
};