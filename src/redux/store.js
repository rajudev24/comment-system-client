import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../redux/user/userSlice";
import { userApi } from "./api/userApiSlice";
import { commentApi } from "./api/commentSlice";
import commentsSlice from "./features/commentsSlice";
export const store = configureStore({
  reducer: {
    user: UserReducer,
    comments: commentsSlice,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, commentApi.middleware),
});

export default store;