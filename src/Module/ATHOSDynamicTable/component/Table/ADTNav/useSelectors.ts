import { useSelector } from "react-redux";
import { ADTState } from "../../redux/store";

const useSelectors_ADTNav = () => {
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const pageSize = useSelector((state: ADTState) => state.ADTFilteringReducer.pageSize);

  return {
    page,
    pageSize,
  };
};

export default useSelectors_ADTNav;
