import { FaSearch } from "react-icons/fa";
import { ATHOSInput } from "../../../../ATHOSInput/component";
import { useATHOSSelectContext } from "../../context";

const SearchBar = () => {
  const {
    props: { search },
    searchValue,
    setSearchValue,
  } = useATHOSSelectContext();
  if (typeof search === "boolean") return null;
  return (
    <ATHOSInput
      innerPadding={{
        vertical: "0.38rem",
      }}
      value={searchValue}
      icon={<FaSearch />}
      placeholder={search?.placeholder || "Procurar"}
      className={`rounded-lg sticky top-0 z-10 w-full`}
      inputClassName={search?.className}
      colors={search?.colors}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
    />
  );
};

export default SearchBar;
