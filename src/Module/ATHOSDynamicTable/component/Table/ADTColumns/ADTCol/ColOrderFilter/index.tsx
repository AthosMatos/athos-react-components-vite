import { FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { usePropsContext } from "../../../../contexts/propsContext";
import { ADTState } from "../../../../redux/store";

const ColOrderFilter = ({ column }: { column: string }) => {
  const { orderSorted } = useSelector((state: ADTState) => ({
    orderSorted: state.ADTFilteringReducer.orderSorted,
  }));

  const highlightColor = usePropsContext().tableStyle?.highlightColor;

  const isAsc = orderSorted.state === 0 && orderSorted.column === column;
  const isSorting = orderSorted.state !== -1 && orderSorted.column === column;
  return (
    isSorting && (
      <FaCaretDown
        size={12}
        className={`text-zinc-400 transition-transform duration-300 ease-in-out
   ${!isAsc ? "transform rotate-180" : ""}
     `}
        color={highlightColor}
      />
    )
  );
};

export default ColOrderFilter;
