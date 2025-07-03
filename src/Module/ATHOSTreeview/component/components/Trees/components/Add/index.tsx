import { useMemo, useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import { ATHOSCollapse } from "../../../../../../ATHOSCollapse/component";
import { ATHOSTreeviewProps } from "../../../../context/props";
import { useColors } from "../../hooks/useColors";

const Add = ({ index, parentId }: { index: number; parentId?: string }) => {
  const [newValue, setNewValue] = useState<string>();
  const [isAdding, setIsAdding] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { onAdd, selected } = ATHOSTreeviewProps();
  const { color } = useColors({ index });
  const isSelected = useMemo(() => {
    return selected?.some((selectedId) => selectedId === parentId);
  }, [selected, parentId]);

  return (
    <div className="flex items-center gap-2">
      <input
        style={{ marginLeft: `${index * 10}px`, color: isSelected ? color : "inherit" }}
        type="text"
        value={newValue}
        placeholder="Adicionar"
        onChange={(e) => {
          setNewValue(e.target.value);
          if (e.target.value) {
            setIsAdding(true);
          }
        }}
        className="cursor-pointer py-1 px-2 outline-none focus:outline-none rounded-md text-zinc-400"
        onFocus={() => {
          if (newValue) {
            setIsAdding(true);
          }
        }}
        onBlur={() => {
          if (!newValue) {
            setIsAdding(false);
            setIsConfirming(false);
          }
        }}
      />

      <ATHOSCollapse
        wrapperClassName="items-center flex"
        spacing={6}
        position="left"
        open={isConfirming}
        onToggle={(isOpen) => setIsConfirming(!!isOpen)}
        collpasedComponent={
          <p
            onClick={() => {
              if (!newValue) return;

              onAdd!(newValue, parentId);
              setNewValue("");
              setIsAdding(false);
              setIsConfirming(false);
            }}
            className={`text-green-600 select-none cursor-pointer`}
          >
            Confirmar
          </p>
        }
      >
        <div
          className={`p-1 ${isConfirming ? "bg-black" : "bg-green-500"} rounded-full flex items-center gap-1 w-fit ${
            isAdding ? "" : "hidden pointer-events-none"
          }`}
        >
          {isConfirming ? (
            <FaX
              className="cursor-pointer text-white text-xs"
              onClick={() => {
                if (!newValue) return;
                setNewValue("");
                setIsAdding(false);
                setIsConfirming(false);
              }}
            />
          ) : (
            <FaCheck className="cursor-pointer text-white text-xs" />
          )}
        </div>
      </ATHOSCollapse>
    </div>
  );
};

export default Add;
