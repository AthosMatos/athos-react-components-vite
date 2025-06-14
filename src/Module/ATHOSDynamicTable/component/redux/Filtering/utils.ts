import { cleanCurrencyValue } from "../../../../utils/currency-utils";
import { FilteringState } from "./interfaces";

const isWithinDateRange = (value: any, filter: { min: string; max: string }) => {
  const val = new Date(value).getTime();
  const start = new Date(filter.min).getTime();
  const end = new Date(filter.max).getTime();

  if (isNaN(start) && isNaN(end)) return true;
  if (isNaN(start)) return val <= end;
  if (isNaN(end)) return val >= start;
  return val >= start && val <= end;
};

const isWithinCurrencyRange = (value: any, filter: { min: number; max: number }) => {
  const val = cleanCurrencyValue(value);
  if (isNaN(filter.min) && isNaN(filter.max)) return true;
  if (isNaN(val)) return true;
  if (isNaN(filter.min)) return val <= filter.max;
  if (isNaN(filter.max)) return val >= filter.min;
  return val >= filter.min && val <= filter.max;
};

const matchesRowFilters = (row: any, rowFilters: FilteringState["rowFilters"]) =>
  Object.entries(rowFilters).every(([col, values]) => values.includes(row[col]));

const matchesSearch = (row: any, search: string) =>
  Object.values(row).some((val: any) => val?.toString().toLowerCase().includes(search.toLowerCase()));

export const applyAllFilters = (state: FilteringState): any[] => {
  return (
    state.baseData?.filter(
      (row) =>
        Object.entries(state.dateFilters).every(([col, filter]) => isWithinDateRange(row[col], filter)) &&
        Object.entries(state.currencyFilters).every(([col, filter]) =>
          isWithinCurrencyRange(row[col], { max: Number(filter.max), min: Number(filter.min) })
        ) &&
        matchesRowFilters(row, state.rowFilters) &&
        matchesSearch(row, state.searchFilter)
    ) || []
  );
};
