import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { GripIcon } from "../../../../../module-index";
import { ATHOSCollapse } from "../../../../ATHOSCollapse/component";
import { ATHOSTreeviewProps } from "../../context/props";
import { SortableItemContext } from "../../context/sortable";
import { CrumbType } from "../../interfaces/crumbs";
import Crumbs from "../Crumbs";
import { DragHandle } from "../DragHandle";

interface CrumbProps {
  crumb: CrumbType;
  id: string;
  index: number;
}
function animateLayoutChanges(args: any) {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}
const Crumb = ({ crumb, id, index }: CrumbProps) => {
  const { selected, onDelete, fillWidth, onSelect, styles } = ATHOSTreeviewProps();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if any subcategory is selected recursively
  const checkIfHasSelectedSubcategory = useCallback(
    (crumb: CrumbType, id: string): boolean => {
      if (selected?.some((selectedId) => selectedId === crumb.id)) return true;
      return crumb.sub ? Object.values(crumb.sub).some((sub) => checkIfHasSelectedSubcategory(sub, id)) : false;
    },
    [selected]
  );

  const hasSelectedSubcategory = useMemo(() => {
    return checkIfHasSelectedSubcategory(crumb, id);
  }, [crumb, checkIfHasSelectedSubcategory, id]);

  // Calculate color index for styling (min 1, max 9)
  const colorIndex = useMemo(() => {
    return index > 8 ? 8 : index;
  }, [index]);

  // Determine if this crumb is selected (directly or has selected children)
  const isSelected = useMemo(() => {
    return selected?.some((selectedId) => selectedId === crumb.id) || hasSelectedSubcategory;
  }, [selected, crumb.id, hasSelectedSubcategory]);

  // Get the appropriate className and inline styles for selected state
  const selectedStyling = useMemo(() => {
    if (!isSelected) return { className: "", style: {} };

    if (styles?.selectedClassName) {
      const className = typeof styles.selectedClassName === "function" ? styles.selectedClassName(colorIndex) : styles.selectedClassName;
      return { className, style: {} };
    }

    // Fallback to inline styles with varied zinc colors for package compatibility
    // Creates a gradient effect from light to darker based on nesting level
    const zincColors = [
      "rgba(244, 244, 245, 0.8)", // zinc-100 with opacity
      "rgba(228, 228, 231, 0.8)", // zinc-200 with opacity
      "rgba(212, 212, 216, 0.8)", // zinc-300 with opacity
      "rgba(161, 161, 170, 0.8)", // zinc-400 with opacity
      "rgba(113, 113, 122, 0.8)", // zinc-500 with opacity
      "rgba(82, 82, 91, 0.8)", // zinc-600 with opacity
      "rgba(63, 63, 70, 0.8)", // zinc-700 with opacity
      "rgba(39, 39, 42, 0.8)", // zinc-800 with opacity
      "rgba(24, 24, 27, 0.8)", // zinc-900 with opacity
    ];

    const selectedColorIndex = Math.min(index, zincColors.length - 1);
    return {
      className: "",
      style: { backgroundColor: zincColors[selectedColorIndex] },
    };
  }, [isSelected, styles?.selectedClassName, colorIndex, index]);

  useEffect(() => {
    setIsOpen(hasSelectedSubcategory);
  }, [hasSelectedSubcategory]);

  const hasSubcategories = useMemo(() => {
    return crumb.sub && Object.keys(crumb.sub).length > 0;
  }, [crumb.sub]);

  const baseClassName = `rounded-md ${
    hasSubcategories ? "pb-2 " : ""
  } py-1 px-2 gap-2 transition-colors duration-200 flex justify-between ${fillWidth ? "" : "w-fit"}`;
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id,
    animateLayoutChanges,
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <SortableItemContext.Provider value={context}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        key={id}
        ref={setNodeRef}
        style={{
          ...style,
          marginLeft: `${index * 10}px`,
          ...selectedStyling.style,
        }}
        className={`${baseClassName} ${selectedStyling.className}`}
      >
        {crumb.sub && Object.keys(crumb.sub).length > 0 ? (
          <ATHOSCollapse
            forceOpen={hasSelectedSubcategory}
            onToggle={(isopen) => setIsOpen(!!isopen)}
            collapsedClassName={`flex flex-col ${fillWidth ? "w-full" : ""} gap-1`}
            wrapperClassName={`${fillWidth ? "w-full" : ""}`}
            spacing={6}
            collpasedComponent={<Crumbs data={crumb.sub} index={index + 1} parentId={crumb.id} isHovered={isHovered} />}
          >
            <span className=" cursor-pointer flex items-center justify-between gap-2">
              {isOpen ? "-" : "+"} {crumb.icon} {crumb.component || crumb.name}
            </span>
          </ATHOSCollapse>
        ) : (
          <span
            onClick={() => {
              onSelect?.(crumb.id);
              crumb.onClick?.(crumb.id);
            }}
            className="cursor-pointer"
          >
            {crumb.icon} {crumb.component || crumb.name}
          </span>
        )}
        {onDelete && (
          <FaTrash
            className={`cursor-pointer text-sm mt-1  ${isHovered ? "opacity-30" : "opacity-0"} transition-opacity duration-200`}
            onClick={() => onDelete(crumb.id)}
          />
        )}
        <DragHandle>
          <GripIcon className="w-32" />
        </DragHandle>
      </div>
    </SortableItemContext.Provider>
  );
};

export default Crumb;
