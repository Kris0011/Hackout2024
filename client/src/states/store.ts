import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/useReducer";

const store = configureStore({
  reducer: {
    user: userReducer as any,
    isAuthenticated: userReducer as any,
    auction : userReducer as any,
    lang:userReducer as any,
  },
});


export default store;