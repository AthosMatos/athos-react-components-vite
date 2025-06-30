import { AnimatePresence, motion, type Variants } from "motion/react";
import { usePopUp } from "../../hooks/private/usePopUp";
import type { ATHOSDropDownProps, ATHOSDropDownPropsCols, ATHOSDropDownPropsList, LabelI } from "./interfaces";
/**
 *
 */

const ListItem = ({
  option,
  onClick,
  className,
  style,
}: {
  option: LabelI;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const defaultClassName = `cursor-pointer select-none `;

  return (
    <li
      style={{
        ...style,
        ...option.style,
      }}
      onClick={onClick}
      className={`${defaultClassName} ${className} ${option.className}`}
    >
      {option.label}
    </li>
  );
};
const variants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
  },
};
export const ATHOSDropDown = (props: ATHOSDropDownProps) => {
  const {
    children,
    className,
    labelsStyle,
    position = "bottom-left",
    style,
    spacing,
    matchChildrenWidth = false,
    onToggle,
    listButtonsClassName: labelClassName,
    buttonClassName,
    buttonStyle,
    disabled,
  } = props;

  const { childRef, setIsOpened, isOpened, contentRef } = usePopUp({
    onToggle,
    matchChildrenWidth,
    position,
    spacing,
  });

  // Type guard function to check if we have labels
  const hasLabels = (props: ATHOSDropDownProps): props is ATHOSDropDownPropsList => {
    return "labels" in props && Array.isArray(props.labels);
  };

  // Type guard function to check if we have cols
  const hasCols = (props: ATHOSDropDownProps): props is ATHOSDropDownPropsCols => {
    return "cols" in props && Array.isArray(props.cols);
  };

  return (
    <div className={`relative`}>
      <button disabled={disabled} className={buttonClassName} onClick={() => setIsOpened(!isOpened)} ref={childRef} style={buttonStyle}>
        {children}
      </button>
      <AnimatePresence>
        {isOpened && (
          <motion.ul
            ref={contentRef}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            style={{
              ...style,
              [position.startsWith("top") ? "bottom" : "top"]: childRef.current ? `${childRef.current.offsetHeight}px` : "0px",
            }}
            className={`overflow-hidden min-w-full w-fit absolute z-[999] flex justify-end flex-col gap-1 ${className}`}
          >
            {hasLabels(props)
              ? props.labels?.map((option, index) => (
                  <ListItem style={labelsStyle} className={labelClassName} onClick={option.onClick} key={index} option={option} />
                ))
              : hasCols(props)
              ? props.cols?.map((colGroup, index) => (
                  <div key={index} className={`flex ${props.colClassName}`} style={props.colStyle}>
                    {colGroup.map((option, index) => (
                      <ListItem style={labelsStyle} className={labelClassName} key={index} onClick={option.onClick} option={option} />
                    ))}
                  </div>
                ))
              : null}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
