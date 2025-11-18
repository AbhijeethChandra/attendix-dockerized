import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApiInstance, apiInstance } from "./api";
import themeSlice from "./features/theme/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage.default,
  whitelist: ["theme"],
};

const rootReducer = combineReducers({
  [apiInstance.reducerPath]: apiInstance.reducer,
  [authApiInstance.reducerPath]: authApiInstance.reducer,
  theme: themeSlice,
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
