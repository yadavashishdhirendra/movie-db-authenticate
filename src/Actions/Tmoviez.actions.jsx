import axios from "axios";
import {
  GET_ALL_MOVIES_FAILURE,
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
  GET_MOVIE_BY_ID_FAILURE,
  GET_MOVIE_BY_ID_REQUEST,
  GET_MOVIE_BY_ID_SUCCESS,
} from "../Constants/Tmoviez.constants";

// Get All Movie (Search) Actions
export const GetAllMovieActions = (keyword, page) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_MOVIES_REQUEST,
    });

    const { data } = await axios.get(
      process.env.REACT_APP_BASE_URI +
        `?s=${keyword}&apikey=` +
        process.env.REACT_APP_API_KEY +
        `&page=${page}`
    );
    dispatch({
      type: GET_ALL_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_MOVIES_FAILURE,
      payload: error.message,
    });
  }
};

// Get Movie By Id Actions
export const GetMovieByIdActions = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MOVIE_BY_ID_REQUEST,
    });

    const { data } = await axios.get(
      process.env.REACT_APP_BASE_URI +
        `?i=${id}&apikey=` +
        process.env.REACT_APP_API_KEY
    );
    dispatch({
      type: GET_MOVIE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOVIE_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
