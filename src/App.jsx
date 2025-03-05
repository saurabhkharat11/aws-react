import "./App.css";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { GlobalContextWrapper } from "./contexts/GlobalContext";


function App() {


  return (
    <>
      <GlobalContextWrapper>
        <Home />
      </GlobalContextWrapper>
    </>
  );
}

export default App;
