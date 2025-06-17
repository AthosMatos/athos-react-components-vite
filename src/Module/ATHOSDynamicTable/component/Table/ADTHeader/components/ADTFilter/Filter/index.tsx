import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ATHOSRange } from "../../../../../../../ATHOSRange/component";
import { ATHOSSelect } from "../../../../../../../ATHOSSelect/component";
import { cleanCurrencyValue } from "../../../../../../../utils/currency-utils";
import { FilterConfig } from "../../../../../interfaces";
import {
  filterByDate,
  filterByRowCurrency,
  filterByRowValue,
  resetAllFilters,
} from "../../../../../redux/Filtering/provider";
import { ADTState } from "../../../../../redux/store";

const FilterColsDate = ({ col }: { col: string }) => {
  const dateValues = useSelector(
    (state: ADTState) => state.ADTFilteringReducer.dateFilters[col]
  );
  const dispatch = useDispatch();
  return (
    <ATHOSRange
      values={dateValues}
      type="date"
      wrapperClassName="p-1"
      labelClassName="!text-sm"
      containerClassName="text-sm"
      inline
      thin
      label={col}
      key={col}
      onChange={({ min, max }) => {
        //conver from pt-br date (dd/mm/yyyy) to yyyy-mm-dd
        const start = min.split("/").reverse().join("-");
        const end = max.split("/").reverse().join("-");
        dispatch(
          filterByDate({
            column: col,
            values: { min: start, max: end },
          })
        );
      }}
    />
  );
};

const FilterColsCurrency = ({ col }: { col: string }) => {
  const valueRange = useSelector(
    (state: ADTState) => state.ADTFilteringReducer.currencyFilters[col]
  );
  const dispatch = useDispatch();
  return (
    <ATHOSRange
      values={valueRange}
      type="value"
      wrapperClassName="p-1"
      labelClassName="!text-sm"
      containerClassName="text-sm"
      inline
      thin
      label={col}
      key={col}
      onChange={({ min, max }) => {
        dispatch(
          filterByRowCurrency({
            column: col,
            values: {
              max: cleanCurrencyValue(max).toString(),
              min: cleanCurrencyValue(min).toString(),
            },
          })
        );
      }}
    />
  );
};

const FilterCols = ({
  col,
  config,
  data,
}: {
  col: string;
  config: boolean | FilterConfig | undefined;
  data: any[];
}) => {
  const selected = useSelector(
    (state: ADTState) => state.ADTFilteringReducer.rowFilters[col]
  );
  const colors = useSelector(
    (state: ADTState) =>
      state.ADTPropsReducer.tableStyle?.header?.functionsColors?.body
  );

  const dispatch = useDispatch();
  if (typeof config === "object") {
    if (config.isDateRange) {
      return <FilterColsDate col={col} />;
    } else if (config.isValueRange) {
      return <FilterColsCurrency col={col} />;
    }
  }
  const labels = useMemo(() => {
    // only add values that are not already in the labels
    const uniqueValues = new Set(data.map((item) => item[col]));
    return Array.from(uniqueValues).map((value) => ({
      label: value,
      value: value,
    }));
  }, [data, col]);
  const label = useMemo(() => {
    if (typeof config === "object" && config.label) {
      return config.label;
    }
    return col;
  }, [col, config]);

  return (
    <ATHOSSelect
      selected={selected}
      labelClassName="!text-sm"
      className="w-full"
      listWrapperClassName="gap-1 p-1"
      containerClassName="gap-1"
      listContainerClassName="text-sm max-h-60 overflow-y-auto"
      search={{
        placeholder: "Pesquisar...",
        className: "!text-sm",
      }}
      multiSelect={{ amountBeforeShortening: 2 }}
      optionClassName={`p-1 ${colors?.listItem?.className}`}
      selectedLabelClassName="text-zinc-900"
      key={col}
      inline
      thin
      label={label}
      labels={labels}
      onChange={(selected) => {
        dispatch(filterByRowValue({ column: col, values: selected }));
      }}
    />
  );
};

const Filter = () => {
  const highlightColor = useSelector(
    (state: ADTState) => state.ADTPropsReducer.tableStyle?.highlightColor
  );
  const colsToFilter = useSelector(
    (state: ADTState) => state.ADTPropsReducer.colsToFilter
  );
  const lines = useSelector(
    (state: ADTState) => state.ADTFilteringReducer.preFilteredData.length
  );
  const data = useSelector((state: ADTState) => state.ADTPropsReducer.data);
  const dispatch = useDispatch();
  const colors = useSelector(
    (state: ADTState) =>
      state.ADTPropsReducer.tableStyle?.header?.functionsColors?.body
  );

  const resetFilter = () => {
    dispatch(resetAllFilters());
  };

  return (
    <div className="min-w-xs p-3 gap-5 flex flex-col">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1 text-zinc-500">
          <h1 className={`px-1 rounded-sm ${colors?.itemsAmount?.className}`}>
            {lines}
          </h1>
          <p className={`${colors?.itemsAmountLabel?.className}`}>Linhas</p>
        </div>
        <button
          className={`cursor-pointer transition-colors opacity-70 hover:opacity-100 ${colors?.clearFilters?.className}`}
          style={{
            color:
              colors?.clearFilters?.style?.color || highlightColor || "inherit",
          }}
          onClick={resetFilter}
        >
          Limpar Filtros
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {colsToFilter &&
          Object.entries(colsToFilter).map(([col, config]) => (
            <FilterCols data={data} key={col} col={col} config={config} />
          ))}
      </div>
    </div>
  );
};

export default Filter;
