import { useSelector } from "react-redux";
import { usePropsContext } from "../../contexts/propsContext";
import { ADTState } from "../../redux/store";

const useSelectors_ADTSelectedRowsToast = () => {
  const selectedRows = useSelector(
    (state: ADTState) => state.ADTSelectReducer.selectedRows
  );
  const selectedRowsToastOpen = useSelector(
    (state: ADTState) => state.ADTSelectReducer.selectedRowsToastOpen
  );
  const checkState = useSelector(
    (state: ADTState) => state.ADTSelectReducer.checkState
  );

  const { data, tableName, selectedRowsToast } = usePropsContext<any>();

  return {
    selectedRows,
    selectedRowsToastOpen,
    checkState,
    selectedRowsToast,
    data,
    tableName,
  };
};

export default useSelectors_ADTSelectedRowsToast;
