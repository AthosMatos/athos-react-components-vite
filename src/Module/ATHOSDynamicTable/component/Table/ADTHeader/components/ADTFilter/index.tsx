import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { ATHOSPopUp } from "../../../../../../ATHOSPopUp/component";
import { usePropsContext } from "../../../../contexts/propsContext";
import { ButtonWrapper, ListWrapperClassname } from "../../styledWrappers";
import Filter from "./Filter";

const ADTFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { tableColFilterName, tableStyle, colsToFilter, tableName } =
    usePropsContext<any>();

  const colors = tableStyle?.header?.functionsColors?.body;

  return (
    colsToFilter &&
    Object.keys(colsToFilter).length > 0 && (
      <ATHOSPopUp
        id={`${tableName}-filter`}
        position="bottom-right"
        onToggle={(isOpen) => setIsOpen(isOpen)}
        contentWrapperClassName={`${ListWrapperClassname} ${colors?.className}`}
        content={<Filter />}
      >
        <ButtonWrapper
          open={isOpen}
          label={tableColFilterName || "Filtros"}
          icon={<FaFilter size={16} />}
        />
      </ATHOSPopUp>
    )
  );
};

export default ADTFilter;
