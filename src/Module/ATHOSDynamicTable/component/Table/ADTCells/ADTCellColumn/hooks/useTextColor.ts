import { useMemo } from "react";
import { usePropsContext } from "../../../../contexts/propsContext";

export const useTextColor = ({
  column,
  rowIndex,
  row,
}: {
  column: string;
  rowIndex: number;
  row: any;
}) => {
  const { tableStyle } = usePropsContext();
  const textColor = useMemo(() => {
    const globalColor = tableStyle?.cellTextColor?.global;
    const specificGlobalColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.global;
    const specificIndexColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex &&
      tableStyle?.cellTextColor?.specific[
        column
      ]?.specificIndex?.indexes.includes(rowIndex) &&
      tableStyle?.cellTextColor?.specific[column]?.specificIndex?.color;
    const specificConditionColor =
      tableStyle?.cellTextColor?.specific &&
      tableStyle?.cellTextColor?.specific[column]?.condional?.showCondition(
        row[column]
      ) &&
      tableStyle?.cellTextColor?.specific[column]?.condional?.color;

    return (
      specificConditionColor ||
      specificIndexColor ||
      specificGlobalColor ||
      globalColor
    );
  }, [
    column,
    row,
    rowIndex,
    tableStyle?.cellTextColor?.global,
    tableStyle?.cellTextColor?.specific,
  ]);

  return textColor;
};
