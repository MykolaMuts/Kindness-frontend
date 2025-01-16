import AnchorLink from "react-anchor-link-smooth-scroll";
import {SelectedPages} from "../../shared/App.constants.tsx";

type Props = {
  page: string;
  selectedPage: SelectedPages;
  setSelectedPage: (page: SelectedPages) => void;
}

const Link =
  ({page, selectedPage, setSelectedPage}: Props) => {

    const lowerCasePage = page.toLowerCase().replace(/ /g, '') as SelectedPages;

    return (
      <AnchorLink
        className={`${selectedPage === lowerCasePage} ? "test-primary-500" : ""
        transition duration={500} hover:text-primary-300
      `}
        href={`${lowerCasePage}${page}`}
        onClick={() => setSelectedPage(lowerCasePage)}
      >

        {page}

      </AnchorLink>
    )
  }

export default Link;