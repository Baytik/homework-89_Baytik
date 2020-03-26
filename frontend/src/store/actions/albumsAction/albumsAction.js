import axiosAPI from "../../../axiosAPI";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const fetchAlbumsSuccess = (albums) => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const errorMessage = (error) => ({type: ERROR_MESSAGE, error});

export const fetchAlbums = (id) => {
    return async (dispatch) => {
        try {
            const response =  await axiosAPI.get(`/albums?artist=${id}`);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};