import {SelectedPages} from "../../App.constants.tsx";

type Props = {
  page: string;
  selectedPage: SelectedPages;
  setSelectedPage: (page: SelectedPages) => void;
}

const Link =
  ({page, selectedPage, setSelectedPage}: Props) => {

    const lowerCasePage = page.toLowerCase().replace(/ /g, '') as SelectedPages;

    return (
      <a
        className={`${selectedPage === lowerCasePage} ? "test-primary-500" : ""
        transition duration={500} hover:text-primary-300`}
        href={lowerCasePage}
        onClick={() => setSelectedPage(lowerCasePage)}
      >

        {page}

      </a>
    )
  }

export default Link;