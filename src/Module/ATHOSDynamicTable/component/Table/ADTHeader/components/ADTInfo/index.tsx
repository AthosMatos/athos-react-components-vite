import { useMemo } from "react";
import { useSelector } from "react-redux";
import { usePropsContext } from "../../../../contexts/propsContext";
import { ADTState } from "../../../../redux/store";

const ADTInfo = () => {
  const pgzx = useSelector(
    (state: ADTState) => state.ADTFilteringReducer.pageSize
  );

  const { tableName, loading, data, tableStyle } = usePropsContext<any>();

  const totalItems = useSelector(
    (state: ADTState) => state.ADTFilteringReducer.preFilteredData.length
  );

  const dataLen = data?.length || 0;

  const pageSize = useMemo(() => {
    // the ceil is the totalitems
    return pgzx > totalItems ? totalItems : pgzx;
  }, [pgzx, totalItems]);

  const headerTitleColor = tableStyle?.header?.title;
  const headerSubTitleColor = tableStyle?.header?.subtitle;
  return (
    <div className="flex flex-col gap-0">
      <h1
        style={headerTitleColor?.style}
        className={`text-xl font-semibold leading-5 ${
          headerTitleColor?.className || "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {tableName}
      </h1>
      {dataLen > 0 && !loading && (
        <p
          style={headerSubTitleColor?.style}
          className={`text-md font-light ${
            headerSubTitleColor?.className || "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {pageSize} items / {totalItems} total
        </p>
      )}
    </div>
  );
};

export default ADTInfo;
