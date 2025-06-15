import { useMemo, useState } from "react";
import { FaColumns } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSPopUp } from "../../../../../../ATHOSPopUp/component";
import { ADTState } from "../../../../redux/store";
import { ButtonWrapper, ListWrapperClassname } from "../../styledWrappers";
import ColGroup from "./ColGroup";

const ADTColumnsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { columns, filteredColumns, name } = useSelector((state: ADTState) => ({
    columns: state.ADTPropsReducer.columns,
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
    name: state.ADTPropsReducer.tableColFilterName,
  }));

  const activeCols = useMemo(() => columns?.filter((col) => filteredColumns.includes(col)) || [], [columns, filteredColumns]);
  const inactiveCols = useMemo(() => columns?.filter((col) => !filteredColumns.includes(col)) || [], [columns, filteredColumns]);
  const cols = useMemo(() => [...activeCols, ...inactiveCols], [activeCols, inactiveCols]);
  const colors = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.header?.functionsColors?.body);

  return (
    <ATHOSPopUp
      position="bottom-right"
      onToggle={(isOpen) => setIsOpen(isOpen)}
      contentWrapperClassName={`${ListWrapperClassname} ${colors?.className}`}
      content={<ColGroup activeCols={activeCols.length} cols={cols} />}
    >
      <ButtonWrapper open={isOpen} label={name || "Colunas"} icon={<FaColumns size={16} />} />
    </ATHOSPopUp>
  );
};

export default ADTColumnsFilter;
