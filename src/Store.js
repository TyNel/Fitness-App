import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const date = new Date()
  .toLocaleString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

const INITIAL_STATE = {
  exercises: [],
  type: [],
  dateClicked: date,
  currentUser: "",
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(INITIAL_STATE);

export default Store;
