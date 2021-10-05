const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return {
        ...state,
        exercises: action.payload,
      };
    case "SET_TYPE":
      return {
        ...state,
        type: action.payload,
      };
    case "SET_DATE":
      return {
        ...state,
        dateClicked: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
