import { combineReducers } from "redux";
import { getMovieListReducers } from "../Reducers/Tmoviez.reducers";

const rootReducer = combineReducers({
  movie: getMovieListReducers,
});

export default rootReducer;
