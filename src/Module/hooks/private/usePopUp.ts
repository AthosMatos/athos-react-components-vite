import { useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";

export type PopUpPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "left-top"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-bottom";

interface IusePopUp {
  position?: PopUpPosition;
  spacing?: number;
  onToggle?: (isOpen: boolean) => void;
  onClickOutside?: () => void;
  id?: string;
}

export const usePopUp = ({ position = "top", onClickOutside, spacing = 6, onToggle, id: ID }: IusePopUp) => {
  const id = useMemo(() => ID || v4(), [ID]);
  const [isOpened, setIsOpened] = useState(false);
  const pos =
    position === "top"
      ? "dropdown-top dropdown-center"
      : position === "top-left"
      ? "dropdown-top"
      : position === "top-right"
      ? "dropdown-top dropdown-end"
      : position === "bottom"
      ? "dropdown-bottom dropdown-center"
      : position === "bottom-left"
      ? "dropdown-bottom"
      : position === "bottom-right"
      ? "dropdown-bottom dropdown-end"
      : position === "left"
      ? "dropdown-left dropdown-center"
      : position === "left-top"
      ? "dropdown-left"
      : position === "left-bottom"
      ? "dropdown-left dropdown-end"
      : position === "right"
      ? "dropdown-right dropdown-center"
      : position === "right-top"
      ? "dropdown-right"
      : position === "right-bottom"
      ? "dropdown-right dropdown-end"
      : "dropdown-top dropdown-center";

  const gap = useMemo(
    () =>
      position.startsWith("top")
        ? { marginBottom: `${spacing}px` }
        : position.startsWith("bottom")
        ? { marginTop: `${spacing}px` }
        : position.startsWith("left")
        ? { marginRight: `${spacing}px` }
        : { marginLeft: `${spacing}px` },
    [spacing, position]
  );
  const childRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);

  // Handle backdrop/outside click - only close if clicking directly on backdrop, not content
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpened(false);
      if (onClickOutside) onClickOutside();
    }
  };

  useEffect(() => {
    if (onToggle) onToggle(isOpened);
  }, [isOpened]);

  return { id, pos, gap, childRef, contentRef, setIsOpened, isOpened, handleBackdropClick };
};

export type usePopUpHookReturn = ReturnType<typeof usePopUp>;
