import { useEffect, useState } from "react";
import { usePropsContext } from "../../../../contexts/propsContext";

interface ADTCellColumnProps {
  column: string;
}

export const useColumnResizeHandler = ({ column }: ADTCellColumnProps) => {
  const { colConfig, tableName, globalConfig } = usePropsContext();

  const minColWidthToShort =
    (colConfig && colConfig[column]?.minColWidthToShort) ||
    globalConfig?.minColWidthToShort;
  const [short, setShort] = useState<boolean>();

  useEffect(() => {
    if (!minColWidthToShort) return;
    const DTColDiv = document.getElementById(`${tableName}-${column}-th`);
    /* console.log(DTColDiv); */
    if (
      (colConfig && colConfig[column]?.cellComponent) ||
      !minColWidthToShort ||
      !DTColDiv
    )
      return;

    // Callback function to execute when resize is observed
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      console.log(column, width);
      if (width < minColWidthToShort) {
        !short && setShort(true);
      } else {
        short && setShort(false);
      }
    };

    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(DTColDiv);

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.unobserve(DTColDiv);
      resizeObserver.disconnect();
    };
  }, [colConfig, column, minColWidthToShort, short, tableName]);

  return { short };
};
