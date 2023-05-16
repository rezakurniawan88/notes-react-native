import AsyncStorage from "@react-native-async-storage/async-storage";

// Save Theme To Local Storage
export const saveThemeToAsyncStorage = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    AsyncStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    return result;
};

// Save Language To Local Storage
export const saveLanguageToAsyncStorage = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    AsyncStorage.setItem("language", JSON.stringify(state.language));
    return result;
};