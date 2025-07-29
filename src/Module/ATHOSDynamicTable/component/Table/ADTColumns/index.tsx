import { useSelector } from "react-redux";
import { usePropsContext } from "../../contexts/propsContext";
import { ADTState } from "../../redux/store";
import { ADTTR } from "../../styled";
import ADTCol from "./ADTCol";
import ADTColCheckBox from "./ADTColCheckBox";
import ADTColExtraCellCols from "./ADTColExtraCellCols";

const ADTColumns = () => {
  const { selectable } = usePropsContext<any>();
  const { filteredColumns } = useSelector((state: ADTState) => ({
    filteredColumns: state.ADTFilteringReducer.filteredColumns,
  }));

  return (
    <ADTTR>
      {selectable && <ADTColCheckBox />}
      {filteredColumns?.map((column, index) => (
        <ADTCol index={index} key={column} column={column} />
      ))}
      <ADTColExtraCellCols index={filteredColumns?.length === 0 ? 0 : 1} />
    </ADTTR>
  );
};

export default ADTColumns;
