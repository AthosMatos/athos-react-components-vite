import { createContext, ReactNode, useContext, useState } from "react";
import { PopUpPosition } from "../../../hooks/private/usePopUp";
import { ATHOSRangeProps } from "../intefaces";

interface ATHOSRangeContextI {
  props: ATHOSRangeProps;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ATHOSRangeContext = createContext<ATHOSRangeContextI | null>(null);

const ATHOSRangeProvider = (
  props: ATHOSRangeProps & {
    children: ReactNode;
    onToggle?: (isOpen: boolean) => void;
    position?: PopUpPosition;
    spacing?: number | string;
    matchLabelWidth?: boolean;
  }
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ATHOSRangeContext.Provider
      value={{
        props,
        isOpen,
        setIsOpen,
      }}
    >
      {props.children}
    </ATHOSRangeContext.Provider>
  );
};

export const useATHOSRangeContext = () => {
  const context = useContext(ATHOSRangeContext);
  if (!context) {
    throw new Error("useATHOSRangeContext must be used within a ATHOSRangeProvider");
  }
  return context;
};
export { ATHOSRangeProvider };
