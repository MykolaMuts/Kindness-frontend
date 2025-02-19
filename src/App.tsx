import Navbar from "./components/Navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import AppRoutes from "./AppRoutes.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {BrowserRouter} from "react-router-dom";
import Tests1 from "./pages/Tests1.tsx";

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
    <div className="App pt-20">



      <AuthProvider>
        <BrowserRouter>
          <Navbar isTopOfPage={isTopOfPage}/>
          <AppRoutes/>
          <Tests1></Tests1>
        </BrowserRouter>
      </AuthProvider>

      <Footer/>


    </div>
  )
}

export default App
