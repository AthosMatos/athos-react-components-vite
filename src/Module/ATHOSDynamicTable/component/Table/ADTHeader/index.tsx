import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTFilter from "./components/ADTFilter";
import ADTInfo from "./components/ADTInfo";
import ADTColumnsFilter from "./components/Columns";
import { ADTSearch } from "./components/Search";
import ADTSelectedFuncs from "./components/SelectedFuncs";

const ADTHeader = () => {
  const loading = useSelector((state: ADTState) => state.ADTPropsReducer.loading);
  const dataLen = useSelector((state: ADTState) => state.ADTPropsReducer.data)?.length;
  const className = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.header?.color?.className);
  const color = useSelector((state: ADTState) => state.ADTPropsReducer.tableStyle?.header?.color?.value);
  return (
    <div className="flex mb-2 justify-between">
      <ADTInfo />
      {dataLen > 0 && !loading && (
        <div
          style={{
            color: color,
          }}
          className={`flex flex-wrap ${className || "text-zinc-300"} select-none flex-1 justify-end items-center`}
        >
          <ADTSelectedFuncs />
          <ADTColumnsFilter />
          <ADTFilter />
          <ADTSearch />
        </div>
      )}
    </div>
  );
};

export default memo(ADTHeader);
