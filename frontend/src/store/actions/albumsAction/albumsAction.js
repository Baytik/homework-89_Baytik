import axiosAPI from "../../../axiosAPI";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const POST_ALBUMS_ERROR = 'POST_ALBUMS_ERROR';
export const DELETE_ALBUM_ERROR = 'DELETE_ALBUMS_ERROR';

export const fetchAlbumsSuccess = (albums) => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const errorMessage = (error) => ({type: ERROR_MESSAGE, error});

export const postAlbumsError = (error) => ({type: POST_ALBUMS_ERROR, error});
export const deleteAlbumError = (error) => ({type: DELETE_ALBUM_ERROR, error});

export const fetchAlbums = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            const response =  await axiosAPI.get(`/albums?artist=${id}`, {headers: {'Authorization': token.token}});
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const postAlbum = (album) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/albums', album, {headers: {'Authorization': token.token}});
        } catch (error) {
            dispatch(postAlbumsError(error))
        }
    }
};

export const deleteAlbum = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.delete(`/albums/${id}`, {headers: {'Authorization': token.token}});
        } catch (error) {
            dispatch(deleteAlbumError(error));
        }
    }
};