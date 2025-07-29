import { usePropsContext } from "../../../contexts/propsContext";
import { ADTCellColWrapper } from "../../../styled";
import { getCellWrapperStyle } from "../../funcs";
import { usePrimaryColHandler } from "../ADTCellColumn/hooks/usePrimaryColHandler";

interface ExtraColsProps {
  row: any;
  isCheck: boolean;
  onlyOneLeft?: boolean;
  isLast: boolean;
}

const ExtraColCell = ({
  extraColumn,
  row,
  isCheck,
  onlyOneLeft,
  isLast,
  index,
}: {
  extraColumn: any;
  row: any;
  isCheck: boolean;
  onlyOneLeft?: boolean;
  isLast: boolean;
  index: number;
}) => {
  const {
    persistPrimaryColumn,
    tableStyle,
    spacingBetweenCells,
    spacingBetweenColumns,
    spacingBetweenExtraColumns,
  } = usePropsContext();

  const rowSpacingColor = tableStyle?.selected?.rowSpacingColor;

  const selectedColor = tableStyle?.selected;

  const persistStyle = usePrimaryColHandler({
    index: onlyOneLeft ? 0 : 1,
    isLast,
    isCheck,
  });
  const center = extraColumn.center === false ? false : true;
  return (
    <ADTCellColWrapper
      className={`${center ? "text-center" : "text-start"}`}
      style={{
        ...getCellWrapperStyle({
          bRightLeft: true,
          paddingHorizontal: spacingBetweenColumns,
        }),
        paddingRight: 0,
        paddingLeft: index == 0 ? 0 : spacingBetweenExtraColumns ?? 6,
        /*  borderBottomRightRadius: "6px",
            borderTopRightRadius: "6px", */
        borderTopColor:
          onlyOneLeft && typeof persistPrimaryColumn == "object"
            ? persistPrimaryColumn.backgroundColor
            : rowSpacingColor,
        borderTopWidth: spacingBetweenCells,
      }}
      animate={{
        ...persistStyle,
        ...(isCheck && {
          boxShadow: `0 1px 0 ${
            tableStyle?.selected?.rowBorderColor || "#000"
          } inset, 0 -1px 0 ${
            tableStyle?.selected?.rowBorderColor || "#000"
          } inset , -1px 0 0 ${
            tableStyle?.selected?.rowBorderColor || "#000"
          } inset`,
        }),
        ...(isCheck && {
          color: selectedColor?.rowTextColor || "inherit",
        }),
      }}
      key={extraColumn.component.toString()}
    >
      {extraColumn.component(row)}
    </ADTCellColWrapper>
  );
};

const ADTCellExtraCols = ({
  row,
  isCheck,
  onlyOneLeft,
  isLast,
}: ExtraColsProps) => {
  const { extraCellColumns: extraColumns } = usePropsContext();

  return extraColumns
    ?.filter(
      (extraColumn) =>
        !(extraColumn.showCondition && !extraColumn.showCondition(row))
    )
    .map((extraColumn, index) => (
      <ExtraColCell
        key={index}
        extraColumn={extraColumn}
        row={row}
        isCheck={isCheck}
        onlyOneLeft={onlyOneLeft}
        isLast={isLast}
        index={index}
      />
    ));
};

export default ADTCellExtraCols;
