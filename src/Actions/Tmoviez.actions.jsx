import axios from "axios";
import {
  GET_ALL_MOVIES_FAILURE,
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
} from "../Constants/Tmoviez.constants";

// Get All Movie Actions
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
