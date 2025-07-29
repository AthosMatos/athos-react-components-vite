import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ATHOSDropDown } from "../../../../../../ATHOSDropDown/component";
import { LabelI } from "../../../../../../ATHOSDropDown/old/interfaces";
import { usePropsContext } from "../../../../contexts/propsContext";
import { ADTState } from "../../../../redux/store";
import {
  ButtonWrapper,
  ListBgWrapperClassname,
  ListButtonClassname,
} from "../../styledWrappers";

const ADTSelectedFuncs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { tableSelectedFuncs, data } = usePropsContext<any>();

  const { selectedRows } = useSelector((state: ADTState) => ({
    selectedRows: state.ADTSelectReducer.selectedRows,
  }));
  const name = tableSelectedFuncs?.title;
  const funcs = tableSelectedFuncs?.funcs;
  const selectedData = data.filter((row) =>
    selectedRows.includes(row.uniqueId)
  );

  return (
    funcs &&
    funcs.length > 0 && (
      <ATHOSDropDown
        disabled={selectedData.length === 0}
        position="bottom-right"
        matchChildrenWidth
        onToggle={(isOpen) => setIsOpen(isOpen)}
        labels={funcs?.map((func) => {
          return {
            label: func.label,
            onClick: () => func.onClick(selectedData),
          } as LabelI;
        })}
        className={ListBgWrapperClassname}
        listButtonsClassName={ListButtonClassname}
      >
        <ButtonWrapper
          open={isOpen}
          label={name || "Funcionalidades em Lote"}
          icon={<FaLayerGroup size={16} />}
        />
      </ATHOSDropDown>
    )
  );
};

export default ADTSelectedFuncs;

interface ADTDefaultSelectedFuncsPropsBase {
  children?: React.ReactNode;
}

interface ADTDefaultSelectedFuncsPropsLabels
  extends ADTDefaultSelectedFuncsPropsBase {
  labels: LabelI[];
}
interface ADTDefaultSelectedFuncsPropsCols
  extends ADTDefaultSelectedFuncsPropsBase {
  cols: LabelI[][];
}
type ADTDefaultSelectedFuncsProps =
  | ADTDefaultSelectedFuncsPropsLabels
  | ADTDefaultSelectedFuncsPropsCols;

export const ADTDefaultSelectedFuncs = (
  props: ADTDefaultSelectedFuncsProps
) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownProps =
    "labels" in props ? { labels: props.labels } : { cols: props.cols };

  return (
    <ATHOSDropDown
      position="left-top"
      onToggle={(isOpen) => setIsOpen(isOpen)}
      {...dropdownProps}
      className={ListBgWrapperClassname}
      listButtonsClassName={ListButtonClassname}
    >
      <ButtonWrapper open={isOpen} icon={props.children} />
    </ATHOSDropDown>
  );
};
