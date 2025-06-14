import React from "react";
import { PiCaretDownLight } from "react-icons/pi";
import { AIInputLabel } from "../../../../ATHOSInput/component/styled";
import { useATHOSRangeContext } from "../../context";
import SelectedItem from "./SelectedItem";

const isNotCurrencyOrDate = (value?: any) => {
  //if value has any char that is not a number, return true
  const regex = /^[0-9.,]+$/;
  if (!regex.test(value)) {
    const isDate = !isNaN(Date.parse(value));
    return !isDate; // Return true if it's not a date
  }
  return value === null || value === undefined || value === "" || isNaN(value);
};

const Selected = ({ setIsOpened, isOpened }: { setIsOpened: React.Dispatch<React.SetStateAction<boolean>>; isOpened: boolean }) => {
  const {
    props: { className, style, thin, label, labelClassName, values },
  } = useATHOSRangeContext();

  return (
    <button
      className={`${className} w-full min-w-[100px] relative flex items-center px-3 ${
        thin ? "!p-0 justify-between" : ""
      } gap-2 cursor-pointer`}
      onClick={() => setIsOpened((prev) => !prev)}
      style={style}
    >
      {thin && label && <AIInputLabel className={`${labelClassName} dark:!text-white !text-black cursor-pointer`}>{label}</AIInputLabel>}
      <div className={`flex items-center ${thin ? "justify-end" : ""} gap-2 w-full`}>
        <div className={`flex  ${thin ? "text-zinc-500 dark:text-zinc-400 gap-1" : "w-full gap-2"}`}>
          <SelectedItem>
            {isNotCurrencyOrDate(values?.min) ? "Mínimo" : values?.min} {" - "}
            {isNotCurrencyOrDate(values?.max) ? "Máximo" : values?.max}
          </SelectedItem>
        </div>

        <PiCaretDownLight
          className={`transition-all duration-200 ease-in-out ${thin ? "" : "mr-3"}  ${
            isOpened ? `${thin ? "rotate-[-0deg]" : "rotate-180"}` : `${thin ? "rotate-[-90deg]" : ""}`
          }`}
          size={16}
        />
      </div>
    </button>
  );
};

export default Selected;
