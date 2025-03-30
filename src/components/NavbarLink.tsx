import { SelectedPages } from "../App.constants.tsx";
import {Link} from "react-router-dom";

type Props = {
  name: string;
  page: SelectedPages;
};

const NavbarLink = ({ name, page }: Props) => {
  return (
    <Link
      className="transition duration-500 hover:text-primary-300"
      to={page}
    >
      {name}
    </Link>
  );
};

export default NavbarLink;