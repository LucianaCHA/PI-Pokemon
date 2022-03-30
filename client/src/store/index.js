import { createStore, applyMiddleware, compose } from "redux";
import {reducer} from "../reducer/index";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  storeEnhancers(applyMiddleware(thunk))
);

