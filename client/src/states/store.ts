import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/useReducer";
import { use } from "i18next";

const store = configureStore({
  reducer: {
    user: userReducer as any,
    isAuthenticated: userReducer as any,
    lang:userReducer as any,
  },
});


export default store;