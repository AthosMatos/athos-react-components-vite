import { memo } from "react";
import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";
import ADTFilter from "./components/ADTFilter";
import ADTInfo from "./components/ADTInfo";
import ADTColumnsFilter from "./components/Columns";
import { ADTSearch } from "./components/Search";
import ADTSelectedFuncs from "./components/SelectedFuncs";

const ADTHeader = () => {
  const loading = useSelector(
    (state: ADTState) => state.ADTPropsReducer.loading
  );
  const dataLen = useSelector(
    (state: ADTState) => state.ADTPropsReducer.data
  )?.length;
  const iconsColors = useSelector(
    (state: ADTState) =>
      state.ADTPropsReducer.tableStyle?.header?.functionsColors?.icons
  );
  const extraFuncs = useSelector(
    (state: ADTState) => state.ADTPropsReducer.extraFuncs
  );

  return (
    <div
      className={`flex mb-2 justify-between ${
        iconsColors?.className || "text-zinc-300"
      }`}
    >
      <ADTInfo />
      {dataLen > 0 && !loading && (
        <div
          style={{
            color: iconsColors?.style?.color,
          }}
          className={`flex flex-wrap select-none flex-1 justify-end items-center`}
        >
          <ADTSelectedFuncs />
          <ADTColumnsFilter />
          <ADTFilter />
          <ADTSearch />
          {extraFuncs}
        </div>
      )}
    </div>
  );
};

export default memo(ADTHeader);
