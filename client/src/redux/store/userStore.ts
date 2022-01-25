
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";

const userStore = createStore(rootReducer, applyMiddleware(thunk));
export default userStore;