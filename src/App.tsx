import Navbar from "./components/Navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import {SelectedPages} from "./App.constants.tsx";
import AppRoutes from "./AppRoutes.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {

  const [selectedPage, setSelectedPage] = useState<SelectedPages>(
    SelectedPages.Home
  );
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

      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      <AuthProvider>
        <BrowserRouter>
          <AppRoutes/>
          <a href={SelectedPages.Login}
             className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Login</a>

          <a href={SelectedPages.User}
             className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            User</a>
          <a href={SelectedPages.Registration}
             className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Registration</a>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>


    </div>
  )
}

export default App
