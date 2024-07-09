import {
  CLEAR_ERRORS,
  GET_ALL_MOVIES_FAILURE,
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
  GET_MOVIE_BY_ID_FAILURE,
  GET_MOVIE_BY_ID_REQUEST,
  GET_MOVIE_BY_ID_SUCCESS,
} from "../Constants/Tmoviez.constants";

// Get All Search Movies
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

// Get Movie By Id
export const getMovieByIdReducers = (
  state = {
    Single_Movie: {},
  },
  action
) => {
  switch (action.type) {
    case GET_MOVIE_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        Single_Movie: action.payload,
      };
    case GET_MOVIE_BY_ID_FAILURE:
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
