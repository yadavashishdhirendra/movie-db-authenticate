import { combineReducers } from "redux";
import {
  getMovieByIdReducers,
  getMovieListReducers,
} from "../Reducers/Tmoviez.reducers";

const rootReducer = combineReducers({
  movie: getMovieListReducers,
  SingleMovie: getMovieByIdReducers,
});

export default rootReducer;
