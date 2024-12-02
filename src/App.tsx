import Navbar from "./components/Navbar/Navbar.tsx";
import {useState} from "react";

function App() {

  const [selectedPage, setSelectedPage] =useState('Home');

  return (
    <div className="App bg-gray-20">
      <Navbar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}

      />
    </div>
  )
}

export default App
