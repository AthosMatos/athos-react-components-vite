import { useEffect, useMemo, useState } from "react";
import Trees from "..";
import { ATHOSCollapse } from "../../../../../ATHOSCollapse/component";
import { ATHOSTreeviewMove } from "../../../context/move";
import { ATHOSTreeviewProps } from "../../../context/props";
import { useColors } from "../hooks/useColors";
import Funcs from "./Funcs";
import { useSelected } from "./hooks/useSelected";
import { TreeProps } from "./interfaces";

const TreeItem = ({ tree, id, index }: TreeProps) => {
  const { fillWidth, onSelect } = ATHOSTreeviewProps();
  const { movingId } = ATHOSTreeviewMove();
  const [isOpen, setIsOpen] = useState(false);

  const hasSubcategories = useMemo(() => {
    return tree.sub ? Object.keys(tree.sub).length > 0 : false;
  }, [tree.sub]);

  const { hasSelectedSubcategory, isSelected } = useSelected({ tree, id });
  const { bgColor, color } = useColors({ index });

  const baseClassName = `rounded-md ${
    hasSubcategories ? "pb-2 " : ""
  } py-1 px-2 gap-2 transition-colors duration-200 flex justify-between ${fillWidth ? "" : "w-fit"}`;

  useEffect(() => setIsOpen(hasSelectedSubcategory), [hasSelectedSubcategory]);

  const isMovingThisTree = useMemo(() => {
    return movingId === tree.id;
  }, [movingId, tree.id]);

  const isMoving = useMemo(() => {
    return movingId !== null;
  }, [movingId]);

  return (
    <div
      key={id}
      style={{
        marginLeft: `${index * 10}px`,
        backgroundColor: isSelected ? bgColor : "transparent",
        color: isSelected ? color : "inherit",
        borderColor: isMovingThisTree ? color : "transparent",
      }}
      className={`border border-dashed ${baseClassName} transition-[border] `}
    >
      {tree.sub && Object.keys(tree.sub).length > 0 ? (
        <ATHOSCollapse
          open={hasSelectedSubcategory}
          onToggle={(isopen) => setIsOpen(!!isopen)}
          collapsedClassName={`flex flex-col ${fillWidth ? "w-full" : ""} gap-1`}
          wrapperClassName={`${fillWidth ? "w-full" : ""}`}
          spacing={6}
          collpasedComponent={<Trees data={tree.sub} index={index + 1} parentId={tree.id} />}
          buttonClassName="cursor-pointer flex items-center gap-2 w-full"
          buttonContainerClassName="w-full flex items-center justify-between"
          extraButton={<Funcs index={index} isMoving={isMoving} isMovingThisTree={isMovingThisTree} tree={tree} />}
        >
          {isOpen ? "-" : "+"} {tree.icon} {tree.component || tree.name}
        </ATHOSCollapse>
      ) : (
        <span className={`${isMoving ? "" : "cursor-pointer"} w-full flex items-center justify-between gap-2`}>
          <div
            className="flex items-center gap-2 w-full"
            onClick={() => {
              if (isMoving) return;
              onSelect?.(tree.id);
              tree.onClick?.(tree.id);
            }}
          >
            {tree.icon} {tree.component || tree.name}
          </div>
          <Funcs index={index} isMoving={isMoving} isMovingThisTree={isMovingThisTree} tree={tree} />
        </span>
      )}
    </div>
  );
};

export default TreeItem;
