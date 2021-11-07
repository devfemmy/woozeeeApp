import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import addressReducer from "./reducers/address";
import lawyerReducer from "./reducers/lawyer";
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";

export const reducers = combineReducers({
  address: addressReducer,
  lawyer: lawyerReducer,
  auth: authReducer,
  user: userReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
