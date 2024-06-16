import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeSlice from "./reducers/themeSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "theme"],
};

const rootReducer = combineReducers({
  user: usersReducer,
  theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
