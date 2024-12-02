import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}

const Link =
  ({page, selectedPage, setSelectedPage}: Props) => {

    const lowerCasePage = page.toLowerCase().replace(/ /g, '');

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