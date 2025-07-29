import { memo, useMemo } from "react";
import { ATHOSColors } from "../../../../../colors/colors";
import ADTCheckBox from "../../../components/ADTCheckBox";
import { useADTSelect } from "../../../redux/Select/hook";
import {
  ADTCellColWrapper,
  persistentBorderStyle,
  persitentBorderWidth,
} from "../../../styled";
import { getCellWrapperStyle } from "../../funcs";

import { useSelector } from "react-redux";
import { usePropsContext } from "../../../contexts/propsContext";
import { ADTState } from "../../../redux/store";

const ADTCellCheckBox = ({
  rowId,
  isLast,
  isCheck,
}: {
  rowId: string;
  isLast: boolean;
  isCheck: boolean;
}) => {
  const { checkCellClick } = useADTSelect();

  const checkState = useSelector(
    (state: ADTState) => state.ADTSelectReducer.checkState
  );

  const { persistPrimaryColumn, paddingInCells, tableStyle } =
    usePropsContext();
  const selectedColor = tableStyle?.selected;

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn == "boolean") {
        obj["backgroundColor"] =
          isCheck && selectedColor?.rowColor
            ? selectedColor?.rowColor
            : ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] =
            isCheck && selectedColor?.rowColor
              ? selectedColor?.rowColor
              : persistPrimaryColumn.backgroundColor;
        }
      }
      const bColor =
        (persistPrimaryColumn as any).borderColor ?? "rgba(0, 0, 0, 0.13)";
      obj["borderLeftColor"] = bColor;
      obj["borderLeftWidth"] = persitentBorderWidth;
      obj["borderLeftStyle"] = persistentBorderStyle;

      if (isLast) {
        obj["borderBottomColor"] = bColor;
        obj["borderBottomWidth"] = persitentBorderWidth;
        obj["borderBottomStyle"] = persistentBorderStyle;
      }
      return obj;
    }
  }, [persistPrimaryColumn, isLast, isCheck, selectedColor]);

  const rowSpacingColor = selectedColor?.rowSpacingColor;
  const rowBorderColor = selectedColor?.rowBorderColor;
  const rowColor = selectedColor?.rowColor;
  return (
    <ADTCellColWrapper
      persistent={!!persistPrimaryColumn}
      className={`${persistPrimaryColumn ? "sticky left-0" : ""} ${
        isLast ? "rounded-es-md" : ""
      }`}
      style={{
        ...getCellWrapperStyle({
          bRightLeft: true,
        }),
        borderColor:
          typeof persistPrimaryColumn == "object"
            ? persistPrimaryColumn.backgroundColor
            : rowSpacingColor,
        borderTopWidth: paddingInCells,
        ...persistStyle,
      }}
      animate={{
        ...(isCheck && {
          boxShadow: `1px 0 0 ${rowBorderColor || rowColor} inset, 0 1px 0 ${
            rowBorderColor || rowColor
          } inset, 0 -1px 0 ${rowBorderColor || rowColor} inset`,
        }),
      }}
    >
      <ADTCheckBox
        isRow
        checked={isCheck === true ? true : checkState}
        check={() => checkCellClick(rowId)}
      />
    </ADTCellColWrapper>
  );
};

export default memo(ADTCellCheckBox);
