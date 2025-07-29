import { useEffect, useState } from "react";
import { usePropsContext } from "../../../../contexts/propsContext";

export const useMobileTouchHandler = ({
  index,
  rowIndex,
  showTooltip,
}: {
  index: number;
  rowIndex: number;
  showTooltip: boolean;
}) => {
  const { columns } = usePropsContext();

  const [touch, setTouch] = useState(false);

  const cellId = `${columns[index]} - ${rowIndex} -${index}`;

  useEffect(() => {
    //on touch set touch to true
    if (!showTooltip) return;
    const CellId = document.getElementById(cellId);
    if (!CellId) return;

    const handleTouchStart = () => {
      setTouch(true);
    };
    const handleTouchEnd = () => {
      setTouch(false);
    };

    CellId.addEventListener("touchstart", handleTouchStart);
    CellId.addEventListener("touchend", handleTouchEnd);

    return () => {
      CellId.removeEventListener("touchstart", handleTouchStart);
      CellId.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showTooltip]);

  return touch;
};
