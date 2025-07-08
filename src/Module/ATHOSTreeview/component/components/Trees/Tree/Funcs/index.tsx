import { FaPlus, FaTrash } from "react-icons/fa6";

import chroma from "chroma-js";
import { useMemo, useState } from "react";
import { IoMdMore, IoMdMove } from "react-icons/io";
import { LuSquareDashed } from "react-icons/lu";
import { ATHOSCollapse } from "../../../../../../ATHOSCollapse/component";
import { ATHOSTreeviewFuncs } from "../../../../context/funcs";
import { ATHOSTreeviewMove } from "../../../../context/move";
import { ATHOSTreeviewProps } from "../../../../context/props";
import { TreeType } from "../../../../interfaces/tree";
import { useColors } from "../../hooks/useColors";
interface FuncsProps {
  isMoving: boolean;
  isMovingThisTree: boolean;
  tree: TreeType;
  index: number;
}

const Funcs = ({ isMoving, isMovingThisTree, tree, index }: FuncsProps) => {
  const { onDelete, onMove, onAdd, levelIndicator } = ATHOSTreeviewProps();
  const { setFuncOpenId, funcOpenId } = ATHOSTreeviewFuncs();
  const { setMovingId, movingId } = ATHOSTreeviewMove();

  const [viewingToMove, setViewingToMove] = useState(false);

  const isOpen = useMemo(() => {
    return funcOpenId === tree.id;
  }, [funcOpenId, tree.id]);

  const { color } = useColors({ index });

  const noFunctions = useMemo(() => {
    return !onAdd && !onMove && !onDelete;
  }, [onAdd, onMove, onDelete]);
  if (noFunctions) {
    return null;
  }
  return isMovingThisTree ? (
    <IoMdMove
      className="opacity-60 hover:opacity-100 hover:text-red-400 transition-all duration-200 cursor-pointer"
      onClick={() => {
        if (movingId === tree.id) {
          setMovingId(null);
        } else {
          setMovingId(tree.id);
        }
      }}
    />
  ) : isMoving && movingId ? (
    <ATHOSCollapse spacing={6} wrapperClassName="items-center" position="left" open={viewingToMove} collpasedComponent={<p>Confirmar</p>}>
      <LuSquareDashed
        onClick={() => {
          onMove?.(movingId, tree.id);
          setMovingId(null);
          setViewingToMove(false);
        }}
        className="cursor-pointer"
        onMouseOver={() => setViewingToMove(true)}
        onMouseOut={() => setViewingToMove(false)}
      />
    </ATHOSCollapse>
  ) : (
    <ATHOSCollapse
      open={isOpen}
      onToggle={(isOpen) => {
        if (isOpen) {
          setFuncOpenId(tree.id);
        } else {
          setFuncOpenId(null);
        }
      }}
      spacing={6}
      position="right"
      wrapperClassName="text-sm"
      collapsedClassName="flex items-center"
      collpasedComponent={
        <div
          style={{
            borderLeftColor: chroma(color).alpha(0.3).hex(),
          }}
          className={`cursor-pointer border-l-1 px-1 flex gap-1 transition-opacity duration-200`}
        >
          {onAdd && (
            <FaPlus className="opacity-60 hover:opacity-100 transition-opacity duration-200" onClick={() => onAdd(tree.name, tree.id)} />
          )}

          {onMove && (
            <IoMdMove
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
              onClick={() => {
                if (movingId === tree.id) {
                  setMovingId(null);
                } else {
                  setMovingId(tree.id);
                }
              }}
            />
          )}
          {onDelete && (
            <FaTrash className="opacity-60 hover:opacity-100 transition-opacity duration-200" onClick={() => onDelete(tree.id)} />
          )}
        </div>
      }
    >
      <IoMdMore
        className={`cursor-pointer rounded-full text-xl transition-colors duration-200 ${
          isOpen ? (levelIndicator === "brighten" ? "bg-white/5" : "bg-black/5") : ""
        }`}
      />
    </ATHOSCollapse>
  );
};

export default Funcs;
