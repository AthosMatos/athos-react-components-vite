import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilteringState, PageSizesType } from "./interfaces";
import { applyAllFilters } from "./utils";

const initialState: FilteringState = {
  filteredData: [],
  filteredColumns: [],
  searchFilter: "",
  page: 1,
  pageSize: 5,
  firstOpen: true,
  columnOrder: [],
  orderSorted: { column: null, state: -1 },
  defaultDataOrder: [],
  preFilteredData: [],
  baseData: [],
  rowFilters: {},
  currencyFilters: {},
  dateFilters: {},
};

const Slice = createSlice({
  name: "ADTFilteredProps",
  initialState,
  reducers: {
    filterByDate: (
      state,
      action: PayloadAction<{
        column: string;
        values: { min: string; max: string };
      }>
    ) => {
      state.page = 1;
      state.dateFilters[action.payload.column] = action.payload.values;
      const filtered = applyAllFilters(state);
      state.preFilteredData = filtered;
      state.filteredData = filtered.slice(0, state.pageSize);
    },

    filterByRowCurrency: (
      state,
      action: PayloadAction<{
        column: string;
        values: { min: string; max: string };
      }>
    ) => {
      state.page = 1;
      state.currencyFilters[action.payload.column] = action.payload.values;
      const filtered = applyAllFilters(state);
      state.preFilteredData = filtered;
      state.filteredData = filtered.slice(0, state.pageSize);
    },

    filterByRowValue: (
      state,
      action: PayloadAction<{ column: string; values: any[] }>
    ) => {
      state.page = 1;
      const { column, values } = action.payload;
      if (values.length === 0) {
        delete state.rowFilters[column];
      } else {
        state.rowFilters[column] = values;
      }
      const filtered = applyAllFilters(state);
      state.preFilteredData = filtered;
      state.filteredData = filtered.slice(0, state.pageSize);
    },

    filterBySearch: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.searchFilter = action.payload;
      const filtered = applyAllFilters(state);
      state.preFilteredData = filtered;
      state.filteredData = filtered.slice(0, state.pageSize);
    },

    resetAllFilters: (state) => {
      state.page = 1;
      state.preFilteredData = state.baseData;
      state.filteredData = state.baseData.slice(0, state.pageSize);
      state.rowFilters = {};
      state.currencyFilters = {};
      state.dateFilters = {};
      state.searchFilter = "";
    },

    movePage: (
      state,
      action: PayloadAction<{
        to: "next" | "prev" | number;
        totalPages: number;
        page: number;
        canGoForward: boolean;
        canGoBack: boolean;
      }>
    ) => {
      // if (state.movingPage) return;

      const { to, totalPages, page, canGoBack, canGoForward } = action.payload;
      if (to === page) return;

      if (typeof to === "number" && to > 0 && to <= totalPages) {
        state.page = to;
        const start = (to - 1) * state.pageSize;
        const end = start + state.pageSize;
        const filter = state.preFilteredData.slice(start, end);
        state.filteredData = filter;

        return;
      }
      if ((to === "next" && !canGoForward) || (to === "prev" && !canGoBack)) {
        return;
      }
      let start = 0;
      if (to === "next") {
        start = state.page * state.pageSize;
        state.page += 1;
      } else {
        start = (state.page - 2) * state.pageSize;
        state.page -= 1;
      }
      const end = start + state.pageSize;
      const filter = state.preFilteredData.slice(start, end);
      state.filteredData = filter;
    },
    changePageSize: (state, action: PayloadAction<PageSizesType>) => {
      state.pageSize = action.payload;
    },
    setFilteredData: (state, action: PayloadAction<any[]>) => {
      const start = (state.page - 1) * state.pageSize;
      const end = start + state.pageSize;
      state.filteredData = action.payload.slice(start, end);
    },
    setPreFilteredData: (state, action: PayloadAction<any[]>) => {
      state.preFilteredData = action.payload;
    },
    setBaseData: (state, action: PayloadAction<any[]>) => {
      state.baseData = action.payload;
    },
    setFilteredColumns: (state, action: PayloadAction<any[]>) => {
      state.filteredColumns = action.payload;
    },
    setColumnOrder: (state, action: PayloadAction<any[]>) => {
      state.columnOrder = action.payload;
    },
    setFirstOpen: (state, action: PayloadAction<boolean>) => {
      state.firstOpen = action.payload;
    },

    filterColumns: (state, action: PayloadAction<string>) => {
      if (state.filteredColumns.includes(action.payload)) {
        state.filteredColumns = state.filteredColumns.filter(
          (column) => column !== action.payload
        );
      } else {
        //based on the order of the columns
        const newCols = [...state.filteredColumns, action.payload];
        //reorder the columns
        state.filteredColumns = state.columnOrder.filter((col) =>
          newCols.includes(col)
        );
      }
    },
    resetColumns: (state) => {
      state.filteredColumns = state.columnOrder;
    },
    sortDataByColumn: (state, action: PayloadAction<string>) => {
      const filter = () => {
        const start = (state.page - 1) * state.pageSize;
        const end = start + state.pageSize;
        const sorted = [...state.preFilteredData].sort((a, b) => {
          const A = a[column];
          const B = b[column];
          if (A < B) return -1;
          if (A > B) return 1;
          return 0;
        });
        return { sorted, start, end };
      };

      //order states, -1 = not sorted, 0 = ascending, 1 = descending
      const col = action.payload;
      let column = col;
      if (col.includes("-isExtraCol-")) {
        column = col.split("-isExtraCol-")[0];
      }
      if (state.orderSorted.column === col) {
        if (state.orderSorted.state === 0) {
          const { end, sorted, start } = filter();
          state.filteredData = sorted.reverse().slice(start, end);
          state.orderSorted.state = 1;
        } else if (state.orderSorted.state === 1) {
          //reset the order
          state.orderSorted.column = null;
          state.orderSorted.state = -1;
          state.filteredData = state.defaultDataOrder;
          state.defaultDataOrder = [];
        }
        return;
      }
      state.defaultDataOrder = state.filteredData;
      const { end, sorted, start } = filter();
      state.filteredData = sorted.slice(start, end);
      state.orderSorted.column = col;
      state.orderSorted.state = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  filterBySearch,
  setFilteredData,
  movePage,
  resetColumns,
  filterColumns,
  setFilteredColumns,
  changePageSize,
  setFirstOpen,
  setPreFilteredData,
  setBaseData,
  sortDataByColumn,
  filterByRowValue,
  filterByRowCurrency,
  filterByDate,
  resetAllFilters,
  setColumnOrder,
} = Slice.actions;

const ADTFilteringReducer = Slice.reducer;

export default ADTFilteringReducer;
