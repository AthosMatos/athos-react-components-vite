import { type Variants } from "motion/react";
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

  const { childRef, gap, id, pos, contentRef, setIsOpened } = usePopUp({
    onToggle,
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
    <div className={`${pos}`}>
      <button
        disabled={disabled}
        className={buttonClassName}
        popoverTarget={id}
        style={{ ...buttonStyle, anchorName: `--anchor-${id}` } as any}
        ref={childRef}
        onClick={() => {
          setIsOpened((prev) => !prev);
        }}
      >
        {children}
      </button>
      <ul
        popover="auto"
        id={id}
        ref={contentRef}
        style={
          {
            ...style,
            ...gap,
            positionAnchor: `--anchor-${id}`,
          } as any
        }
        className={`dropdown flex flex-col ${className}`}
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
      </ul>
    </div>
  );
};
