import Navbar from "./components/Navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import {SelectedPages} from "./shared/App.constants.tsx";
import Tests1 from "./components/Tests1.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Registration from "./components/Registration/Registration.tsx";
// import Home from "./pages/Home.tsx";
import Login from "./components/Login/Login.tsx";
import Footer from "./components/Footer/Footer.tsx";

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
    <div className="App">

      <Router>
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />


        {/*//todo fix later*/}
        <div className="content" style={{paddingTop: "80px"}}>
          <Routes>
            {/*<Route path={SelectedPages.Home} element={<Home/>}/>*/}
            <Route path={SelectedPages.Login} element={<Login/>}/>
            <Route path={SelectedPages.Registration} element={<Registration/>}/>
          </Routes>
        </div>

        <a href={SelectedPages.Login}
           className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Login</a>

        <a href={SelectedPages.User}
           className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          User</a>
        <a href={SelectedPages.Registration}
           className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Registration</a>


        <Tests1/>

        <Footer/>

      </Router>

    </div>
  )
}

export default App
