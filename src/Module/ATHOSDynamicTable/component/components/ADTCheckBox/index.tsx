import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { usePropsContext } from "../../contexts/propsContext";
import { CheckState } from "../../redux/Select/interfaces";
import type { ADTState } from "../../redux/store";
import type { ADTCheckBoxProps } from "./interfaces";
import { ADTCheckBoxWrapper, ADTCheckIcon, ADTDoubleCheckIcon } from "./styled";

const ADTCheckBox = ({
  checked,
  check,
  big,
  clicable,
  isRow,
}: ADTCheckBoxProps) => {
  const page = useSelector((state: ADTState) => state.ADTFilteringReducer.page);
  const selectedPages = useSelector(
    (state: ADTState) => state.ADTSelectReducer.selectedPages
  );
  const checkIconColor =
    usePropsContext<any>().tableStyle?.selected?.selectedIconColor;

  const isPageSelected = useMemo(() => {
    return selectedPages.includes(page);
  }, [selectedPages, page]);

  const Check = useMemo(() => {
    if (checked == CheckState.ALL || checked == true) {
      return <ADTCheckIcon big={big} />;
    } else if (!isRow && (typeof checked == "object" || isPageSelected)) {
      return <ADTDoubleCheckIcon big={big} />;
    } else if (checked == CheckState.NONE) {
      return null;
    }
  }, [big, checked, isPageSelected, isRow]);
  const isCheck =
    (checked || isPageSelected) === true || checked === CheckState.ALL;
  return (
    <ADTCheckBoxWrapper
      style={{
        borderColor: isCheck ? checkIconColor : undefined,
        color: isCheck ? checkIconColor : undefined,
        boxShadow: isCheck ? `0px 0px 0.2rem 1px ${checkIconColor}` : undefined,
        fontSize: big ? "0.7rem" : "0.5rem",
      }}
      clicable={clicable}
      big={big}
      checkedState={checked || isPageSelected}
      onClick={check}
    >
      {Check}
    </ADTCheckBoxWrapper>
  );
};

export default memo(ADTCheckBox);
