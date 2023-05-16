import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { saveThemeToAsyncStorage, saveLanguageToAsyncStorage } from "./middleware/localStorage";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(saveThemeToAsyncStorage, saveLanguageToAsyncStorage),
});

export default store;