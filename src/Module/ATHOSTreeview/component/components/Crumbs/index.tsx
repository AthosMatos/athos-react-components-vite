import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCheck, FaX } from "react-icons/fa6";

import { ATHOSCollapse } from "../../../../ATHOSCollapse/component";
import { ATHOSTreeviewProps } from "../../context/props";
import { ATHOSTreeviewPropsI } from "../../interfaces/props";
import Crumb from "../Crumb";

const Crumbs = ({
  data,
  index = 0,
  parentId,
  isHovered,
}: {
  data: ATHOSTreeviewPropsI["data"];
  index?: number;
  parentId?: string;
  isHovered?: boolean;
}) => {
  const [newValue, setNewValue] = useState<string>();
  const [isAdding, setIsAdding] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { isLoading, onAdd } = ATHOSTreeviewProps();
  return isLoading ? (
    <CgSpinner className="animate-spin" />
  ) : (
    <>
      {data.map((category) => (
        <Crumb key={category.id} crumb={category} id={category.id} index={index} />
      ))}
      {onAdd && isHovered && (
        <div className="flex items-center gap-2">
          <input
            style={{ marginLeft: `${index * 10}px` }}
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
            forceOpen={isConfirming}
            onToggle={(isOpen) => setIsConfirming(!!isOpen)}
            collpasedComponent={
              <p
                onClick={() => {
                  if (!newValue) return;

                  onAdd(newValue, parentId);
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
      )}
    </>
  );
};

export default Crumbs;
