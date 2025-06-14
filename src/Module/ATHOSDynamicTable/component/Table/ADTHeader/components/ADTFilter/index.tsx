import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSPopUp } from "../../../../../../ATHOSPopUp/component";
import { ADTState } from "../../../../redux/store";
import { ButtonWrapper, ListWrapperClassname } from "../../styledWrappers";
import Filter from "./Filter";

const ADTFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { name } = useSelector((state: ADTState) => ({
    name: state.ADTPropsReducer.tableColFilterName,
  }));

  return (
    <ATHOSPopUp
      position="bottom-right"
      onToggle={(isOpen) => setIsOpen(isOpen)}
      contentWrapperClassName={`${ListWrapperClassname} bg-white/85 dark:bg-zinc-800`}
      content={<Filter />}
    >
      <ButtonWrapper open={isOpen} label={name || "Filtros"} icon={<FaFilter size={16} />} />
    </ATHOSPopUp>
  );
};

export default ADTFilter;
