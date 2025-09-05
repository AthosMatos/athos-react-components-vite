import { usePopUp } from "../../hooks/private/usePopUp";
import type { ATHOSPopUpProps } from "./interfaces";

const ATHOSPopUp = ({
  children,
  onToggle,
  position = "top",
  contentWrapperClassName: contentClassName,
  content,
  style,
  matchChildrenWidth,
  spacing,
  className,
  isOpen,
  onClickOutside,
  contentWrapperStyle: contentStyle,
  generalWrapperClassName,
  id,
  showOnHover = false,
}: ATHOSPopUpProps) => {
  const {
    childRef,
    gap,
    pos,
    contentRef,
    setIsOpened,
    id: popoverId,
  } = usePopUp({
    onToggle,
    position,
    spacing,
    onClickOutside,
    id,
  });
  const handleMouseEnter = () => {
    if (showOnHover) {
      setIsOpened(true);
      contentRef?.current?.showPopover?.();
    }
  };

  const handleMouseLeave = () => {
    if (showOnHover) {
      setIsOpened(false);
      contentRef?.current?.hidePopover?.();
    }
  };
  return (
    <div className={`${pos} ${generalWrapperClassName || ""}`}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        onClick={() => setIsOpened((prev) => !prev)}
        ref={childRef}
        popoverTarget={popoverId}
        style={{ ...style, anchorName: `--anchor-${popoverId}` } as any}
      >
        {children}
      </button>
      <ul
        ref={contentRef}
        className={`dropdown ${isOpen ? "dropdown-open" : ""} flex flex-col ${contentClassName}`}
        popover="auto"
        id={popoverId}
        style={
          {
            //boxShadow: "2px 8px 20px rgba(0, 0, 0, 0.14)",
            ...contentStyle,
            ...gap,
            positionAnchor: `--anchor-${popoverId}`,
            ...(matchChildrenWidth ? { width: `anchor-size(--anchor-${popoverId} width)` } : {}),
          } as any
        }
      >
        {content}
      </ul>
    </div>
  );
};

export { ATHOSPopUp };
