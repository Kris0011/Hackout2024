
const intitalState = {
    user: null,
    isAuthenticated:false,
  };

  const userReducer = (state = intitalState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          isAuthenticated : true
        };
      case "CLEAR_USER":
        return {
          ...state,
          user: null,
          isAuthenticated : false
        };
      case "TOGGLE_LANG":
        return {
          ...state,
          lang: action.payload,
        };
      default:
        return state;
    }
  };
  
export default userReducer;
