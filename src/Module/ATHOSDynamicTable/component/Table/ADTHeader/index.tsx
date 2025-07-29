import { memo } from "react";
import { usePropsContext } from "../../contexts/propsContext";
import ADTFilter from "./components/ADTFilter";
import ADTInfo from "./components/ADTInfo";
import ADTColumnsFilter from "./components/Columns";
import { ADTSearch } from "./components/Search";
import ADTSelectedFuncs from "./components/SelectedFuncs";

const ADTHeader = () => {
  const { loading, data, tableStyle, extraFuncs } = usePropsContext<any>();

  const dataLen = data?.length || 0;
  const iconsColors = tableStyle?.header?.functionsColors?.icons;

  return (
    <div
      className={`flex mb-2 justify-between h-10 ${
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
        </div>
      )}
      <div
        style={{
          color: iconsColors?.style?.color,
        }}
        className={`flex select-none items-center h-10`}
      >
        {extraFuncs}
      </div>
    </div>
  );
};

export default memo(ADTHeader);
