import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../redux/user/userSlice";
import { userApi } from "./api/userApiSlice";
import { commentApi } from "./api/commentSlice";
export const store = configureStore({
  reducer: {
    user: UserReducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
});

export default store;