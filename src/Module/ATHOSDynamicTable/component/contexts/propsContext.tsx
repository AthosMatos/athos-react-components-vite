import { createContext, useContext } from "react";
import { DynamicTableProps } from "../interfaces";

interface PropsContextProviderProps<T> {
  children: React.ReactNode;
  value: DynamicTableProps<T> & {
    columns: any[];
  };
}

const PropsContext = createContext<
  | (DynamicTableProps<any> & {
      columns: any[];
    })
  | undefined
>(undefined);

export const PropsContextProvider = <T,>({
  children,
  value,
}: PropsContextProviderProps<T>) => {
  return (
    <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
  );
};
export const usePropsContext = <T,>() => {
  const context = useContext(PropsContext);
  if (context === undefined) {
    throw new Error(
      "usePropsContext must be used within a PropsContextProvider"
    );
  }
  return context;
};
