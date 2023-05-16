const initialState = {
    darkMode: false,
    language: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DARK_MODE": 
            return {
                ...state,
                darkMode: action.payload,
            };
        case "SET_LANGUAGE":
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;