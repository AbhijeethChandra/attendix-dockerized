import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApiInstance, apiInstance } from "./apiInstance";
import themeSlice from "./slice/themeSlice";
import authSlice from "./slice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage.default,
  whitelist: ["theme", "auth"],
};

const rootReducer = combineReducers({
  [apiInstance.reducerPath]: apiInstance.reducer,
  [authApiInstance.reducerPath]: authApiInstance.reducer,
  theme: themeSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDERATE"],
      },
    }).concat(authApiInstance.middleware, apiInstance.middleware),
});

export const persistor = persistStore(store);

export default store;
