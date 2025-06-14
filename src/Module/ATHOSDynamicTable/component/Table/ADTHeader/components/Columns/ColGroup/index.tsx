import { AnimatePresence } from "motion/react";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { filterColumns, resetColumns } from "../../../../../redux/Filtering/provider";
import { ADTState } from "../../../../../redux/store";
import ListButtons from "./ListButtons";

interface ColGroupProps {
  cols: string[];

  activeCols: number;
}
const ColGroup = ({ cols, activeCols }: ColGroupProps) => {
  const highlightColor = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.highlightColor);
  const filteredColumns = useSelector((state: ADTState) => state.ADTFilteringReducer.filteredColumns);
  const dispatch = useDispatch();

  const filterOutCol = (col: string) => {
    dispatch(filterColumns(col));
  };

  const resetFilter = () => {
    dispatch(resetColumns());
  };
  return (
    <div className="min-w-xs p-3 gap-5 flex flex-col">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1 text-zinc-500">
          <h1 className="bg-zinc-200 px-1 rounded-sm">{activeCols}</h1>
          <p className="">Colunas</p>
        </div>
        <button
          className="cursor-pointer transition-colors opacity-70 hover:opacity-100"
          style={{ color: highlightColor }}
          onClick={resetFilter}
        >
          Limpar Filtros
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {cols.map((col) => (
            <ListButtons
              key={col}
              className={`${
                filteredColumns.includes(col) ? `` : "opacity-35 "
              } text-zinc-900 items-center flex justify-between cursor-pointer`}
              onClick={() => filterOutCol(col)}
            >
              {col}
              {filteredColumns.includes(col) && <FaCheck size={12} />}
            </ListButtons>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ColGroup;
