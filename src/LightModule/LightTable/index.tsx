import { ReactNode } from "react";

type Columns<T> = {
  [key in keyof T]?: {
    label: ReactNode;
    cellComponent: (cell: T[key], row: T, columnKey: keyof T) => ReactNode;
  };
};

type CustomColumns<T> = {
  [key: string]: {
    label: ReactNode;
    cellComponent: (row: T) => ReactNode;
  };
};
type LightTableProps<T> = {
  data: T[];
  keyColumns?: Columns<T>;
  customColumns?: CustomColumns<T>;
  order?: (keyof T)[] | string[];
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  columnClassName?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  rowShowCondition?: (row: T) => boolean;
};

const TableRow = <T,>({
  row,
  rowIndex,
  onRowClick,
  keyColumns,
  customColumns,
  rowClassName,
  cellClassName,
}: {
  row: T;
  rowIndex: number;
  onRowClick?: (row: T) => void;
  keyColumns?: Columns<T>;
  customColumns?: CustomColumns<T>;
  rowClassName?: string;
  cellClassName?: string;
}) => {
  return (
    <tr className={rowClassName} key={rowIndex} onClick={() => onRowClick?.(row)}>
      {keyColumns &&
        Object.keys(keyColumns).map((columnKey) => (
          <td className={cellClassName} key={columnKey}>
            {keyColumns[columnKey as keyof T]?.cellComponent
              ? keyColumns[columnKey as keyof T]?.cellComponent(row[columnKey as keyof T], row, columnKey as keyof T)
              : String(row[columnKey as keyof T])}
          </td>
        ))}
      {customColumns &&
        Object.keys(customColumns).map((columnKey) => (
          <td className={cellClassName} key={columnKey}>
            {customColumns[columnKey]?.cellComponent(row)}
          </td>
        ))}
    </tr>
  );
};

const LightTable = <T,>(props: LightTableProps<T>) => {
  const {
    data,
    customColumns,
    keyColumns,
    columnClassName,
    order,
    rowClassName,
    className,
    bodyClassName,
    cellClassName,
    headerClassName,
    onRowClick,
    rowShowCondition,
  } = props;

  return (
    <table className={className}>
      <thead className={headerClassName}>
        <tr>
          {keyColumns &&
            Object.keys(keyColumns).map((columnKey) => (
              <th className={columnClassName} key={columnKey}>
                {keyColumns[columnKey as keyof T]?.label}
              </th>
            ))}
          {customColumns &&
            Object.keys(customColumns).map((columnKey) => (
              <th className={columnClassName} key={columnKey}>
                {customColumns[columnKey]?.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className={bodyClassName}>
        {data?.map((row, rowIndex) =>
          rowShowCondition ? (
            rowShowCondition(row) ? (
              <TableRow
                row={row}
                rowIndex={rowIndex}
                onRowClick={onRowClick}
                keyColumns={keyColumns}
                customColumns={customColumns}
                rowClassName={rowClassName}
                cellClassName={cellClassName}
              />
            ) : null
          ) : (
            <TableRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              onRowClick={onRowClick}
              keyColumns={keyColumns}
              customColumns={customColumns}
              rowClassName={rowClassName}
              cellClassName={cellClassName}
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default LightTable;
