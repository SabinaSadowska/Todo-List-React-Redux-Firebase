import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./modules/rootReducer";
import thunk from "redux-thunk";
export default function configureStore(intialState) {
  return createStore(rootReducer, intialState, compose(applyMiddleware(thunk)));
}
