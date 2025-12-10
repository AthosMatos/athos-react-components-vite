type PopUpPosition =
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
interface LightPopoverProps {
  children: React.ReactNode;
  position?: PopUpPosition;
  contentClassName?: string;
  className?: string;
  wrapperClassName?: string;
  content?: React.ReactNode;
  id: string;
  minWidthIsChildren?: boolean;
}

const getPos = (position: PopUpPosition) => {
  return position === "top"
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
};

const LightPopover = ({
  children,
  contentClassName = "",
  position,
  content,
  className = "",
  wrapperClassName = "",
  id,
  minWidthIsChildren = true,
}: LightPopoverProps) => {
  const pos = getPos(position || "bottom");

  return (
    <div className={`${pos} ${wrapperClassName}`}>
      <button className={`${className}`} popoverTarget={`popover-${id}`} style={{ anchorName: `--anchor-${id}` } as React.CSSProperties}>
        {children}
      </button>
      <ul
        className={`dropdown flex flex-col ${contentClassName}
          
          `}
        popover="auto"
        id={`popover-${id}`}
        style={
          {
            positionAnchor: `--anchor-${id}`,
            minWidth: minWidthIsChildren ? `anchor-size(--anchor-${id} width)` : undefined,
          } as React.CSSProperties
        }
      >
        {content}
      </ul>
    </div>
  );
};

export default LightPopover;
