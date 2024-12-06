import Navbar from "./components/Navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import {SelectedPages} from "./App.constants.tsx";
import Tests1 from "./components/Tests1.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import User from "./pages/Users.tsx"
import Registration from "./pages/Registration.tsx";

function App() {

  const [selectedPage, setSelectedPage] = useState<SelectedPages>(SelectedPages.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {

      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPages.Home);
      } else {
        setIsTopOfPage(false);
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  return (
    <div className="App bg-gray-20">

      <Router>
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        <Routes>
          <Route path="/" element={<User/>}/>
          <Route path="/registration" element={<Registration/>}/>
        </Routes>

        <Tests1/>

      </Router>

    </div>
  )
}

export default App
