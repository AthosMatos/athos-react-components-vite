import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { fillIds } from "../../../utils/data-utils";
import { DynamicTableProps } from "../interfaces";
import { setTotalItems } from "../redux/CustomStates/provider";
import {
  setBaseData,
  setColumnOrder,
  setFilteredColumns,
  setFilteredData,
  setPreFilteredData,
} from "../redux/Filtering/provider";

export function ADTStatesController<T>({
  props,
}: {
  props: DynamicTableProps<T>;
}) {
  const {
    data,
    columnsToHide,
    columnsToShow,
    customColumns,
    columnOrder,
    extraColumns,
    columnsToStartShow,
  } = props;

  // Cache for data with IDs to avoid regenerating if data hasn't changed
  const dataWithIds = useMemo(() => {
    if (!data?.length) return data;
    return fillIds(data);
  }, [data]);

  const dispatch = useDispatch();

  // Optimized extra columns processing with stable IDs
  const xtraCols = useMemo(() => {
    if (!extraColumns?.length) return undefined;

    return extraColumns.map((exc) => ({
      ...exc,
      id: exc.id ?? v4(),
    }));
  }, [extraColumns]);

  // Optimized column processing
  const columns = useMemo(() => {
    if (!data?.length) return [];

    // Get base columns more efficiently
    let cols: (keyof T)[];

    if (columnsToHide) {
      const firstObjectKeys = Object.keys(data[0] as object) as (keyof T)[];
      cols = firstObjectKeys.filter(
        (column) => !columnsToHide.includes(column)
      );
    } else if (columnsToShow) {
      cols = [...columnsToShow]; // Create a copy to avoid mutations
    } else {
      cols = Object.keys(data[0] as object) as (keyof T)[];
    }

    // Process custom columns efficiently
    if (customColumns?.length) {
      // Process all custom columns in one pass
      const colsToRemove = new Set<keyof T>();
      const colsToAdd: Array<{ index?: number; newLabel: keyof T }> = [];

      customColumns.forEach((customColumn) => {
        customColumn.colsToGet.forEach((col) => colsToRemove.add(col));
        colsToAdd.push({
          index: customColumn.index,
          newLabel: customColumn.newLabel as keyof T,
        });
      });

      // Remove columns that need to be replaced
      cols = cols.filter((col) => !colsToRemove.has(col));

      // Add new columns
      colsToAdd.forEach(({ index, newLabel }) => {
        if (index !== undefined) {
          cols.splice(index, 0, newLabel);
        } else {
          cols.push(newLabel);
        }
      });
    }

    // Add extra columns efficiently
    if (xtraCols?.length) {
      const extraColumnNames = xtraCols.map(
        (col) => `${col.column as any}-isExtraCol-${col.id}` as keyof T
      );
      cols.push(...extraColumnNames);
    }

    // Apply column order efficiently
    if (columnOrder?.length) {
      const orderedCols = [...columnOrder];
      const remainingCols = cols.filter((col) => !columnOrder.includes(col));
      cols = [...orderedCols, ...remainingCols];
    }

    return cols;
  }, [
    data,
    columnsToHide,
    columnsToShow,
    customColumns,
    xtraCols,
    columnOrder,
  ]);

  // Batch Redux updates for better performance
  useEffect(() => {
    if (!columns?.length || !data?.length) return;

    // Batch all Redux updates together
    const updates = () => {
      // Handle filtered columns
      if (columnsToStartShow) {
        const colsToShow = Object.keys(columnsToStartShow).filter((col) =>
          columns.includes(col as keyof T)
        );
        dispatch(setFilteredColumns(colsToShow));
      } else {
        dispatch(setFilteredColumns(columns));
      }

      // Dispatch all other updates
      dispatch(setColumnOrder(columns));
      dispatch(setTotalItems(data.length));
      dispatch(setFilteredData(dataWithIds));
      dispatch(setPreFilteredData(dataWithIds));
      dispatch(setBaseData(dataWithIds));
    };

    // Use setTimeout to batch updates and avoid blocking the UI
    const timeoutId = setTimeout(updates, 0);

    return () => clearTimeout(timeoutId);
  }, [columns, columnsToStartShow, data, dataWithIds, dispatch]);

  return {
    dataWithIds,
    xtraCols,
    columns,
  };
}
