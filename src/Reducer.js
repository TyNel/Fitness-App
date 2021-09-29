const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return {
        ...state,
        exercises: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
