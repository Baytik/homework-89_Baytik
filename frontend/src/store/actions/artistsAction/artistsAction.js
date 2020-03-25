import axiosAPI from "../../../axiosAPI";

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const fetchArtistsSuccess = (artists) => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistsError = (error) => ({type: ERROR_MESSAGE, error});

export const fetchArtists = () => {
    return async (dispatch) => {
        try {
            const response =  await axiosAPI.get('/artists');
            dispatch(fetchArtistsSuccess(response.data));
        } catch (error) {
            dispatch(fetchArtistsError(error))
        }
    }
};