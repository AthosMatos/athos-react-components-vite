import { useSelector } from "react-redux";
import { usePropsContext } from "../../contexts/propsContext";
import { ADTState } from "../../redux/store";
import { ADTTR } from "../../styled";
import ADTCellCheckBox from "./ADTCellCheckBox";
import ADTCellColumn from "./ADTCellColumn";
import ADTCellExtraCols from "./ADTCellExtraCols";

/* const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}; */

const ADTCells = () => {
  const { extraCellColumns, tableStyle, globalConfig, selectable } =
    usePropsContext();

  const selected = tableStyle?.selected;
  const rowClassName = tableStyle?.rowClassName;
  const rowClick = globalConfig?.rowClick;

  const { filteredColumns, pageSize, filteredData, selectedRows } = useSelector(
    (state: ADTState) => ({
      filteredColumns: state.ADTFilteringReducer.filteredColumns,
      pageSize: state.ADTFilteringReducer.filteredData.length,
      filteredData: state.ADTFilteringReducer.filteredData,
      selectedRows: state.ADTSelectReducer.selectedRows,
    })
  );

  return filteredData?.map((row, rowIndex) => (
    <ADTTR
      key={row.uniqueId}
      /*  initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants} */
      animate={{
        backgroundColor: selectedRows.includes(row.uniqueId)
          ? selected?.rowColor
          : "transparent",
      }}
      className={`transition-colors ${rowClassName} `}
      layout="position"
      transition={{ duration: 0.2 }}
      onClick={() => rowClick?.(row)}
    >
      {selectable && (
        <ADTCellCheckBox
          isLast={rowIndex === pageSize - 1}
          rowId={row.uniqueId}
          isCheck={selectedRows.includes(row.uniqueId)}
        />
      )}
      {filteredColumns.map((column, index) => (
        <ADTCellColumn
          hasExtraCols={!!extraCellColumns}
          key={index}
          col={column}
          isCheck={selectedRows.includes(row.uniqueId)}
          isLastRow={rowIndex === pageSize - 1}
          index={index}
          row={row}
          rowIndex={rowIndex}
          isLastCol={index === filteredColumns.length - 1}
        />
      ))}

      {extraCellColumns && (
        <ADTCellExtraCols
          isLast={rowIndex === pageSize - 1}
          onlyOneLeft={filteredColumns.length === 0}
          isCheck={selectedRows.includes(row.uniqueId)}
          row={row}
        />
      )}
    </ADTTR>
  ));
};

export default ADTCells;
