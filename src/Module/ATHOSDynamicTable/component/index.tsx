import { Provider } from "react-redux";
import { ATHOSResizableDiv } from "../../ATHOSResizableDiv";

import { DynamicTableProps } from "./interfaces";
import { ADTTableWrapper } from "./styled";

import { configureStore } from "@reduxjs/toolkit";
import { useContext, useEffect, useMemo, useState } from "react";
import useSelectors_ADTSelectedRowsToast from "./components/ADTSelectedRowsToast/useSelectors";
import { ATHOSDynamicTableContext } from "./context";
import { PropsContextProvider } from "./contexts/propsContext";
import ADTCustomStatesReducer from "./redux/CustomStates/provider";
import ADTFilteringReducer from "./redux/Filtering/provider";
import ADTSelectReducer from "./redux/Select/provider";
import { ADTStatesController } from "./StatesController";
import Table from "./Table";
import ADTHeader from "./Table/ADTHeader";
import ADTNav from "./Table/ADTNav";

/**
 *
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */

const Comp = ({
  props,
  stly,
}: {
  stly?: boolean;
  props: DynamicTableProps<any>;
}) => {
  const { selectedRows } = useSelectors_ADTSelectedRowsToast();
  const { tableName, data } = props;
  const tableContext = useContext(ATHOSDynamicTableContext);

  useEffect(() => {
    //console.log("selectedRows", selectedRows);
    if (!tableContext) return;
    tableContext.setSelectedData({
      ...tableContext.selectedData,
      [tableName]: selectedRows?.map((row: any) => data[row]),
    });
  }, [data, selectedRows, tableContext, tableName]);

  return (
    <ADTTableWrapper
      resizable={!!props.resizeable}
      style={stly ? props.style : undefined}
      className={`${props.wrapperClassName} flex flex-col rounded-md w-full border border-zinc-300 m-0`}
    >
      <ADTHeader />
      <Table />
      <ADTNav />
    </ADTTableWrapper>
  );
};

function ATHOSDynamicTableProv<T>(props: DynamicTableProps<T>) {
  const tableId = `${props.tableName}-athos-dynamic-table`;

  const { columns, dataWithIds, xtraCols } = ADTStatesController({
    props,
  });

  return (
    <PropsContextProvider
      value={{
        ...props,
        data: dataWithIds,
        persistPrimaryColumn: props.persistPrimaryColumn ?? true,
        extraColumns: xtraCols,
        columns: columns,
      }}
    >
      {/*  <ADTSelectedRowsToast /> */}
      {props.resizeable ? (
        <ATHOSResizableDiv
          OuterContainerStyle={{
            maxWidth: "95vw",
          }}
          localSaveName={tableId}
          withToogle
        >
          <Comp props={props} />
        </ATHOSResizableDiv>
      ) : (
        <Comp props={props} stly />
      )}
    </PropsContextProvider>
  );
}

export function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          ADTCustomStatesReducer,
          ADTSelectReducer,
          ADTFilteringReducer,
        },
      }),
    []
  );

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    //loading={!hasMounted || props.loading}
    <Provider store={store}>
      <ATHOSDynamicTableProv
        {...props}
        loading={!hasMounted || props.loading}
      />
    </Provider>
  );
}
