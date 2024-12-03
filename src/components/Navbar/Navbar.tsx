import "./Navbar.scss";
// // import { Bars3Icon, XMarkIcon}
// import { BeakerIcon } from '@heroicons/react/24/solid'
import Logo from '@/assets/Logo.jpg'
import Link from "./Link.tsx";
import {SelectedPages} from "../../App.constants.tsx";
import useMediaQuery from "../../hooks/useMediaQuery.ts";
import {Bars3Icon} from "@heroicons/react/16/solid";

type Props = {
  selectedPage: SelectedPages;
  setSelectedPage: (page: SelectedPages) => void;
}

const Navbar =
  ({selectedPage, setSelectedPage}: Props) => {

    const flexBetween = "flex items-center justify-between";
    const isAboveMediumSize = useMediaQuery("(min-width: 1060px)");

    return <nav>

      <div className={`${flexBetween} fixed bg-green-400 top-0 z-30 w-full py-6'}`}>

        <div className={`${flexBetween} mx-auto w-5/6 bg-blue-700`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/*Left side*/}
            <img alt="Logo" src={Logo} className="responsive-image"/>

            {isAboveMediumSize ? (
              // Full Screen
              <div className={`${flexBetween} w-full`}>
                {/*Central side*/}
                <div className={`${flexBetween} w-full gap-8 text-sm`}>

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
                <div className={`${flexBetween} gap-8 bg-amber-400`}>
                  <p>Login</p>
                  <p>Sign in</p>
                </div>
              </div>


              // Mobile Screen
            ) : <button
              className="rounded-full bg-secondary-500"
              onClick={() => {
                setIsMenuToggled
              }}
            >
              <Bars3Icon className="h-6 w-6 text-white"/>
            </button>}


          </div>

        </div>
      </div>
    </nav>

  }

export default Navbar