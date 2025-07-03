import chroma from "chroma-js";
import { useMemo } from "react";
import { ATHOSTreeviewProps } from "../../../context/props";

interface UseStylesProps {
  index: number;
}

export const useColors = ({ index }: UseStylesProps) => {
  const { styles, levelIndicator } = ATHOSTreeviewProps();

  const colorIndex = 0 + (index / 10) * 4;

  const bgColor = useMemo(() => {
    if (styles?.selected?.bgcolorIndex) {
      return styles.selected.bgcolorIndex(colorIndex);
    }

    const chromaBg = chroma(styles?.selected?.bgColor || "#d6b2d1");
    if (levelIndicator === "brighten") {
      return chromaBg.brighten(colorIndex).hex();
    }
    return chromaBg.darken(colorIndex).hex();
  }, [colorIndex, styles]);

  const color = useMemo(() => {
    if (styles?.selected?.colorIndex) {
      return styles.selected.colorIndex(colorIndex);
    }
    const chromaColor = chroma(styles?.selected?.color || "#5c126b");
    if (levelIndicator === "brighten") {
      return chromaColor.brighten(colorIndex).hex();
    }
    return chromaColor.darken(colorIndex).hex();
  }, [colorIndex, styles]);

  return {
    bgColor,
    color,
  };
};
