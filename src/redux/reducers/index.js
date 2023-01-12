import { combineReducers } from "redux";
import { actorReducer, moviesReducer, producerReducer } from "./movie.reducer";
const reducers = combineReducers({
  movies: moviesReducer,
  actor: actorReducer,
  producer: producerReducer
});
export default reducers;