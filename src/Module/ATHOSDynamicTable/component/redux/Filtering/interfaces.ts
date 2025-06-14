export type PageSizesType = 2 | 5 | 10 | 20 | 50 | 100;

export interface FilteringState {
  filteredData: any[];
  preFilteredData: any[];
  baseData: any[];
  filteredColumns: any[];
  searchFilter: string;
  page: number;
  pageSize: PageSizesType;
  firstOpen: boolean;
  columnOrder: string[];
  orderSorted: {
    state: number;
    column: string | null;
  };
  defaultDataOrder: any[];
  rowFilters: {
    [column: string]: any[];
  };
  currencyFilters: {
    [column: string]: {
      min: string;
      max: string;
    };
  };
  dateFilters: {
    [column: string]: {
      min: string;
      max: string;
    };
  };
}
