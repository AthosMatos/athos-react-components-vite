import { memo, useMemo } from "react";
import { ATHOSColors } from "../../../../../colors/colors";
import { usePropsContext } from "../../../contexts/propsContext";
import {
  ADTColBorderWrapper,
  ADTColumnWrapper,
  persistentBorderStyle,
  persitentBorderWidth,
} from "../../../styled";
import { tdClassName } from "../../funcs";

const ADTColExtraCellCols = ({ index }: { index: number }) => {
  const {
    spacingBetweenColumns,
    persistPrimaryColumn,
    tableStyle,
    boldColumns,
    spacingHeader,
    extraCellColumns,
  } = usePropsContext<any>();

  const persistStyle = useMemo(() => {
    if (persistPrimaryColumn && index === 0) {
      const obj = {} as any;
      if (typeof persistPrimaryColumn === "boolean") {
        obj["backgroundColor"] = ATHOSColors.white.eggshell_faded;
      } else {
        if (persistPrimaryColumn.backgroundColor) {
          obj["backgroundColor"] = persistPrimaryColumn.backgroundColor;
        }
      }

      const bColor =
        (persistPrimaryColumn as any).borderColor ?? "rgba(0, 0, 0, 0.13)";
      obj["borderTopColor"] = bColor;
      obj["borderRightColor"] = bColor;

      obj["borderTopWidth"] = persitentBorderWidth;
      obj["borderRightWidth"] = persitentBorderWidth;
      obj["borderTopStyle"] = persistentBorderStyle;
      obj["borderRightStyle"] = persistentBorderStyle;
      return obj;
    }
  }, [index, persistPrimaryColumn]);

  return extraCellColumns?.map((extraColumn) => {
    const textColor = useMemo(() => {
      const globalColor = tableStyle?.columnTextColor?.global;
      const specificColor =
        tableStyle?.columnTextColor?.specific &&
        extraColumn.label &&
        tableStyle?.columnTextColor?.specific[extraColumn.label];

      return specificColor ?? globalColor;
    }, [extraColumn.label, tableStyle?.columnTextColor]);

    const center = extraColumn.center === false ? false : true;
    return (
      extraColumn.label && (
        <ADTColumnWrapper
          persistent={!!persistPrimaryColumn && index === 0}
          className={`${center ? "text-center" : "text-start"}
          ${tdClassName(index, persistPrimaryColumn)}
           rounded-se-md`}
          style={{
            ...persistStyle,
            paddingBottom: spacingHeader,
            left: index === 0 ? "36px" : undefined,
            paddingLeft: index > 0 ? spacingBetweenColumns : undefined,
            paddingRight: index > 0 ? spacingBetweenColumns : undefined,
          }}
          textColor={textColor}
        >
          <ADTColBorderWrapper className="!w-fit" bold={boldColumns}>
            {extraColumn.label}
          </ADTColBorderWrapper>
        </ADTColumnWrapper>
      )
    );
  });
};

export default memo(ADTColExtraCellCols);
