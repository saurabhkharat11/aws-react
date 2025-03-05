import { useState, createContext } from "react";

export const GlobalContext = createContext({});

export const GlobalContextWrapper = ({ children }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [ tasks, setTask ] = useState([]);
  
  return (
    <GlobalContext.Provider value={{ isModalVisible, setModalVisibility, tasks, setTask }}>
      {children}
    </GlobalContext.Provider>
  );
};

