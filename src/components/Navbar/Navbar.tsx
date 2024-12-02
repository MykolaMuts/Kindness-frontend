import "./Navbar.scss";
// // import { Bars3Icon, XMarkIcon}
// import { BeakerIcon } from '@heroicons/react/24/solid'
import Logo from '@/assets/Logo.jpg'
import Link from "./Link.tsx";

type Props = {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}

const Navbar =
  ({selectedPage, setSelectedPage}: Props) => {

    const flexBetween = "flex items-center justify-between";

    return <nav>

      <div className={`${flexBetween} fixed bg-green-400 top-0 z-30 w-full py-6'}`}>

        <div className={`${flexBetween} mx-auto w-5/6 bg-blue-700`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/*Left side*/}
            <img alt="Logo" src={Logo} className="responsive-image"/>

            {/*Right side*/}
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

            <div className={`${flexBetween} gap-8 bg-amber-400`}>
              <p>Login</p>
              <p>Sign in</p>
            </div>

          </div>

        </div>

      </div>
    </nav>

  }

export default Navbar