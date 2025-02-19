import "./Navbar.scss";
import Logo from '@/assets/Logo.png';
import {ScreenSize, SelectedPages} from "../App.constants.tsx";
import useMediaQuery from "../hooks/useMediaQuery.ts";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import NavbarLink from "./NavbarLink.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import ProfilePicture from "./ProfilePicture.tsx";

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({isTopOfPage}: Props) => {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumSize = useMediaQuery(ScreenSize.Small);
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const navbarBackgroundColor = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div className={`${navbarBackgroundColor} ${flexBetween} fixed top-0 z-30 w-full h-3 py-7`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/*Left side*/}
            <Link to={SelectedPages.Home}>
              <img
                alt="Logo"
                src={Logo}
                className="h-full max-h-12 w-auto object-contain"
              />
            </Link>
            {isAboveMediumSize ? (
              // Full Screen
              <div className={`${flexBetween} w-full`}>
                {/* Central side */}
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <NavbarLink name="Home" page={SelectedPages.Home}/>
                  <NavbarLink name="Create Event" page={SelectedPages.Event}/>
                  <NavbarLink name="Contact Us" page={SelectedPages.Contact}/>
                  <NavbarLink name="About Us" page={SelectedPages.About}/>
                </div>

                {/* Right Side */}
                <div className={`${flexBetween} gap-8`}>
                  {user ? (
                    <div className="flex items-center gap-4">
                      {/*<span className="font-medium text-gray-700">Welcome, {user.username}</span>*/}
                      <NavbarLink name="Profile" page={SelectedPages.User}/>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                      >
                        Logout
                      </button>
                      <ProfilePicture profilePicUrl={user.profilePicUrl} />
                    </div>
                  ) : (
                    <>
                      <NavbarLink name="Login" page={SelectedPages.Login}/>
                      <a
                        className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
                        href={SelectedPages.Registration}
                      >
                        Sign In
                      </a>
                    </>
                  )}
                </div>
              </div>
            ) : (
              // Mobile Screen
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-500"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white"/>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu modal */}
      {
        !isAboveMediumSize && isMenuToggled && (
          <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
            {/* Close icon */}
            <div className="flex justify-end p-12">
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <XMarkIcon className="h-6 w-6 text-grey-400"/>
              </button>
            </div>

            {/* Menu items */}
            <div className="ml-[33%] flex flex-col gap-10 text-2xl">
              {user ? (
                <>
                  {/*<span className="font-medium text-gray-700">Hello, {user.username}</span>*/}
                  <NavbarLink name="Profile" page={SelectedPages.User}/>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavbarLink name="Login" page={SelectedPages.Login}/>
                  <NavbarLink name="Sign Up" page={SelectedPages.Registration}/>
                </>
              )}

              <NavbarLink name="Home" page={SelectedPages.Home}/>
              <NavbarLink name="Create Event" page={SelectedPages.Event}/>
              <NavbarLink name="Contact Us" page={SelectedPages.Contact}/>
              <NavbarLink name="About Us" page={SelectedPages.About}/>
            </div>
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
