import {
  CLEAR_ERRORS,
  GET_ALL_MOVIES_FAILURE,
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
} from "../Constants/Tmoviez.constants";

// Get All Movies
export const getMovieListReducers = (
  state = {
    movies: {},
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_MOVIES_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case GET_ALL_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
