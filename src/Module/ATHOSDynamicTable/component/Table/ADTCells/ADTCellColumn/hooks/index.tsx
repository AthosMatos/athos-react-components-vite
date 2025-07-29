import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { usePropsContext } from "../../../../contexts/propsContext";
import { ADTState } from "../../../../redux/store";
import { useMobileTouchHandler } from "./useMobileTouchHandler";
import { usePrimaryColHandler } from "./usePrimaryColHandler";
import { useTextColor } from "./useTextColor";

const useADTCellCol = ({
  index,
  row,
  rowIndex,
  isLast,
  isCheck,
  extraCol,
  column,
}: {
  row: any;
  rowIndex: number;
  index: number;
  isCheck?: boolean;
  extraCol?: any;
  column: any;
  isLast: any;
}) => {
  const {
    colConfig,
    extraColumns,
    globalConfig,
    startShort,
    customColumns: customCols,
  } = usePropsContext();

  const short = useSelector(
    (state: ADTState) => state.ADTCustomStatesReducer.columnsShort
  );

  const [showTooltip, setShowTooltip] = useState(false);

  const textColor = useTextColor({ column, row, rowIndex });
  const touch = useMobileTouchHandler({ index, rowIndex, showTooltip });
  const persistStyle = usePrimaryColHandler({ index, isLast, isCheck });
  const maxCharToCut =
    (extraColumns?.length &&
      extraCol &&
      extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1])
        ?.maxCharToCut) ||
    (colConfig && colConfig[column]?.maxCharToCut) ||
    globalConfig?.maxCharToCut ||
    10;
  const className =
    (extraColumns?.length &&
      extraCol &&
      extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1])
        ?.className) ||
    (colConfig && colConfig[column]?.className);
  const style =
    (extraColumns?.length &&
      extraCol &&
      extraColumns.find((xc) => xc.id == extraCol.split("-isExtraCol-")[1])
        ?.style) ||
    (colConfig && colConfig[column]?.style);

  const formatter = colConfig && colConfig[column]?.formatter;

  const hasExtraCol = useMemo(
    () =>
      !!(
        extraColumns?.length &&
        extraCol &&
        extraColumns.find((exc) => exc.id == extraCol.split("-isExtraCol-")[1])
          ?.cellComponent
      ),
    [extraColumns, extraCol]
  );
  const rowValue = useMemo(() => {
    if (hasExtraCol) return;
    if (
      typeof row[column] === "string" &&
      ((short && short[column]) ||
        (typeof startShort === "boolean" && startShort) ||
        (typeof startShort === "object" && startShort[column])) &&
      row[column].length > maxCharToCut
    ) {
      setShowTooltip(true);
      return formatter
        ? formatter(row[column].slice(0, maxCharToCut) + "...")
        : row[column].slice(0, maxCharToCut) + "...";
    }
    setShowTooltip(false);
    return formatter ? formatter(row[column]) : row[column];
  }, [hasExtraCol, row, column, short, startShort, maxCharToCut, formatter]);

  const cell = useMemo(() => {
    if (hasExtraCol) {
      return extraColumns
        ?.find((exc) => exc.id == extraCol.split("-isExtraCol-")[1])
        ?.cellComponent?.(formatter ? formatter(row[column]) : row[column]);
    } else if (colConfig && colConfig[column]?.cellComponentRowData) {
      return colConfig[column]?.cellComponentRowData(
        formatter ? formatter(row) : row
      );
    } else if (colConfig && colConfig[column]?.cellComponent) {
      return colConfig[column]?.cellComponent(
        formatter ? formatter(row[column]) : row[column]
      );
    }
    const customColumns = customCols
      ?.find((col) => col.newLabel === column)
      ?.render?.(row);
    return customColumns || rowValue;
  }, [
    hasExtraCol,
    colConfig,
    column,
    customCols,
    row,
    rowValue,
    extraColumns,
    formatter,
    extraCol,
  ]);

  const Cell = useMemo(() => {
    if (className || style) {
      return (
        <div className={className} style={style}>
          {cell}
        </div>
      );
    }
    return cell;
  }, [className, style, cell]);

  return {
    textColor,
    showTooltip,

    touch,
    persistStyle,

    Cell,
  };
};

export default useADTCellCol;
