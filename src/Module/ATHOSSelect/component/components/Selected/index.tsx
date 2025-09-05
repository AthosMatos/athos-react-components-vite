import React from "react";
import { PiCaretDownLight } from "react-icons/pi";
import { VscLoading } from "react-icons/vsc";
import { AIInputLabel } from "../../../../ATHOSInput/component/styled";
import { useATHOSSelectContext } from "../../context";
import SelectedItem from "./SelectedItem";

const Selected = ({
  setIsOpened,
  id,
  childRef,
  isOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  childRef: React.RefObject<HTMLButtonElement | null>;
  isOpened: boolean;
}) => {
  const {
    props: { className, style, multiSelect, thin, loading, label, labelClassName },
    updating,
    originalLabels,
    selectedItems: selected,
    lastSelected,
  } = useATHOSSelectContext();

  return (
    <button
      type="button"
      className={`${className} min-w-[100px] relative flex items-center ${thin ? "!p-0 justify-between cursor-pointer" : ""} ${
        multiSelect ? "px-1" : "px-3"
      } gap-2`}
      onClick={() => setIsOpened((prev) => !prev)}
      ref={childRef}
      popoverTarget={id}
      style={
        {
          anchorName: `--anchor-${id}`,
          ...style,
        } as any
      }
    >
      {thin && label && <AIInputLabel className={`${labelClassName} dark:!text-white !text-black cursor-pointer`}>{label}</AIInputLabel>}
      <div className={`flex items-center ${thin ? "justify-end" : ""} gap-2 w-full`}>
        <div className={`flex  ${thin ? "text-zinc-500 dark:text-zinc-400 gap-1" : "w-full gap-2"}`}>
          {loading || (updating && !multiSelect) ? (
            <VscLoading className="animate-spin" />
          ) : (
            <>
              {selected.slice(0, typeof multiSelect === "boolean" ? 3 : multiSelect?.amountBeforeShortening).map((item) => {
                const label = originalLabels?.find((label) => label.value === item)?.label;
                return (
                  label && (
                    <SelectedItem lastSelected={item == lastSelected} isMultiSelect={!!multiSelect} key={item}>
                      {label}
                    </SelectedItem>
                  )
                );
              })}
              {multiSelect && selected.length > (typeof multiSelect === "boolean" ? 3 : multiSelect?.amountBeforeShortening) && (
                <SelectedItem isMultiSelect={!!multiSelect}>
                  <span className="text-sm">{`+${
                    selected.length - (typeof multiSelect === "boolean" ? 3 : multiSelect?.amountBeforeShortening)
                  }`}</span>
                </SelectedItem>
              )}
            </>
          )}
        </div>

        {loading ? (
          <VscLoading className="animate-spin" />
        ) : (
          <PiCaretDownLight
            className={`transition-all duration-200 ease-in-out ${thin ? "" : "mr-3"}  ${
              isOpened ? `${thin ? "rotate-[-0deg]" : "rotate-180"}` : `${thin ? "rotate-[-90deg]" : ""}`
            }`}
            size={16}
          />
        )}
      </div>
    </button>
  );
};

export default Selected;
