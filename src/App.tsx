import Navbar from "./components/Navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import AppRoutes from "./AppRoutes.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {

  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {

      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      } else {
        setIsTopOfPage(false);
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  return (
    <div className="App">



      <AuthProvider>
        <BrowserRouter>
          <Navbar
            isTopOfPage={isTopOfPage}
          />
          <AppRoutes/>
        </BrowserRouter>
      </AuthProvider>

      <Footer/>


    </div>
  )
}

export default App
