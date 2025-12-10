import { motion } from "motion/react";
import { useSwitchSelect } from "../hooks";
import type { StyleI, SwitchProps } from "./interfaces";

const duration = 0.24;
const transition = { duration, ease: [0.43, 0.13, 0.23, 0.96] };

export const Switch = ({ icon, label, className, style, dftClassName, dftStyle, index, id, onSelected }: SwitchProps) => {
  const { isSelected, handleSelect } = useSwitchSelect(index, id);

  // Merge styles based on selection state
  const activeStyle = isSelected ? style?.active : style?.default;
  const mergedStyle = { ...dftStyle, ...activeStyle };

  // Merge classNames based on selection state
  const activeClassName = isSelected ? dftClassName?.active : dftClassName?.default;
  const mergedClassName = `${className || ""} ${activeClassName || ""}`;

  const handleClick = () => {
    handleSelect();
    onSelected?.();
  };

  // Remove background color classes for transparency
  const classNameWithoutBg = mergedClassName
    .split(" ")
    .filter((c) => !c.startsWith("bg-"))
    .join(" ");

  return (
    <div
      id={`${id}-${index}`}
      style={mergedStyle}
      onClick={handleClick}
      className={`!bg-transparent ${classNameWithoutBg} text-black ${
        isSelected ? "" : "opacity-30"
      } flex z-50 transition-all duration-300 gap-2 select-none cursor-pointer text-sm rounded-lg p-1 px-2 items-center !border-none`}
    >
      {icon}
      {label}
    </div>
  );
};

export const Floating = ({ aRef, className, style, dftClassName, dftStyle }: StyleI & { aRef: React.RefObject<HTMLDivElement | null> }) => {
  const activeStyle = style?.active;
  const mergedStyle = { ...dftStyle, ...activeStyle };

  const activeClassName = dftClassName?.active;
  const mergedClassName = `${className || ""} ${activeClassName || ""}`;

  return (
    <motion.div
      ref={aRef}
      initial={false}
      transition={transition}
      style={mergedStyle}
      className={`${mergedClassName} absolute select-none`}
    />
  );
};
