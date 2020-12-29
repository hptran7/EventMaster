const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  if (action.type == "ON_AUTH") {
    return {
      ...state,
      isAuthenticated: true,
    };
  } else if ((action.type = "onLoginSuccess")) {
    return {
      ...state,
      isAuthenticated: false,
    };
  }
  return state;
};

export default reducer;
