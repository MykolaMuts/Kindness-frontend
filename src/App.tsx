import Navbar from "./components/Navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import {SelectedPages} from "./shared/App.constants.tsx";
import AppRoutes from "./AppRoutes.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {BrowserRouter} from "react-router-dom";

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

      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      <AuthProvider>
        <BrowserRouter>
          <AppRoutes/>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>


    </div>
  )
}

export default App
