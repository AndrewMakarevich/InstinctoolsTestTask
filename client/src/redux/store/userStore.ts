
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import { rootReducer } from "../reducers";

const userStore = createStore(rootReducer);
export const useThunkDispatch = () => useDispatch<typeof userStore.dispatch>();
export default userStore;