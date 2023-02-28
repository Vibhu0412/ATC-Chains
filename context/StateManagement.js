import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();
export default function StateManagement({ children }) {
  const [selectIndustry, setSelectIndustry] = useState();
  return (
    <Context.Provider value={{ selectIndustry, setSelectIndustry }}>
      {children}
    </Context.Provider>
  );
}
export const useStateContext = () => useContext(Context);
