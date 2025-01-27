import "./Navbar.scss";
// // import { Bars3Icon, XMarkIcon}
// import { BeakerIcon } from '@heroicons/react/24/solid'
import Logo from '@/assets/Logo.jpg';
import {SelectedPages} from "../../App.constants.tsx";
import useMediaQuery from "../../hooks/useMediaQuery.ts";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import Link from "./Link.tsx";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPages;
  setSelectedPage: (value: SelectedPages) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {

    const flexBetween = "flex items-center justify-between";
    const isAboveMediumSize = useMediaQuery("(min-width: 1060px)");
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const navbarBackgroundColor = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

    return <nav>

      <div className={`${navbarBackgroundColor} ${flexBetween} fixed top-0 z-30 w-full py-6'}`}>

        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/*Left side*/}
            <img alt="Logo" src={Logo} className="responsive-image"/>

            {isAboveMediumSize ? (
              // Full Screen
              <div className={`${flexBetween} w-full`}>
                {/*Central side*/}
                <div className={`${flexBetween} gap-8 text-sm`}>

                  <Link
                    page="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <Link
                    page="Create event"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <Link
                    page="Contact Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <Link
                    page="About Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>

                {/*Right Side*/}
                <div className={`${flexBetween} gap-8`}>
                  <p>Login</p>
                  <a
                    className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
                    href={SelectedPages.Login}
                  >Sign In</a>
                </div>
              </div>


              // Mobile Screen
            ) : <button
              className="rounded-full bg-secondary-500"
              onClick={() => {
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <Bars3Icon className="h-6 w-6 text-white"/>
            </button>}


          </div>
        </div>
      </div>

      {/*Mobile menu modal*/}
      {!isAboveMediumSize && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
          {/*Close icon*/}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-grey-400"/>
            </button>
          </div>

          {/*Menu items*/}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">

            <Link
              page="Login"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <Link
              page="Registration"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <Link
              page="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <Link
              page="Create event"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <Link
              page="Contact Us"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <Link
              page="About Us"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>

        </div>
      )}

    </nav>

  }

export default Navbar