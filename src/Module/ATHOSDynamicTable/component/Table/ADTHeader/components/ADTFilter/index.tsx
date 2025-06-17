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
  const colors = useSelector(
    (state: ADTState) =>
      state.ADTPropsReducer.tableStyle?.header?.functionsColors?.body
  );

  const colsToFilter = useSelector(
    (state: ADTState) => state.ADTPropsReducer.colsToFilter
  );

  return (
    colsToFilter &&
    Object.keys(colsToFilter).length > 0 && (
      <ATHOSPopUp
        position="bottom-right"
        onToggle={(isOpen) => setIsOpen(isOpen)}
        contentWrapperClassName={`${ListWrapperClassname} ${colors?.className}`}
        content={<Filter />}
      >
        <ButtonWrapper
          open={isOpen}
          label={name || "Filtros"}
          icon={<FaFilter size={16} />}
        />
      </ATHOSPopUp>
    )
  );
};

export default ADTFilter;
