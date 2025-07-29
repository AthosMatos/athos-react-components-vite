import { useMemo, useState } from "react";
import { FaColumns } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSPopUp } from "../../../../../../ATHOSPopUp/component";
import { usePropsContext } from "../../../../contexts/propsContext";
import { ADTState } from "../../../../redux/store";
import { ButtonWrapper, ListWrapperClassname } from "../../styledWrappers";
import ColGroup from "./ColGroup";

const ADTColumnsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { columns, tableStyle, tableColFilterName, tableName } =
    usePropsContext<any>();

  const { filteredColumns } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
  }));

  const colors = tableStyle?.header?.functionsColors?.body;
  const activeCols = useMemo(
    () => columns?.filter((col) => filteredColumns.includes(col)) || [],
    [columns, filteredColumns]
  );
  const inactiveCols = useMemo(
    () => columns?.filter((col) => !filteredColumns.includes(col)) || [],
    [columns, filteredColumns]
  );
  const cols = useMemo(
    () => [...activeCols, ...inactiveCols],
    [activeCols, inactiveCols]
  );

  return (
    <ATHOSPopUp
      id={`${tableName}-columns-filter`}
      position="bottom-right"
      onToggle={(isOpen) => setIsOpen(isOpen)}
      contentWrapperClassName={`${ListWrapperClassname} ${colors?.className}`}
      content={<ColGroup activeCols={activeCols.length} cols={cols} />}
    >
      <ButtonWrapper
        open={isOpen}
        label={tableColFilterName || "Colunas"}
        icon={<FaColumns size={16} />}
      />
    </ATHOSPopUp>
  );
};

export default ADTColumnsFilter;
