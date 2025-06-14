import { useATHOSSelectContext } from "../../context";
import { ATHOSSelectPropsCols } from "../../intefaces";
import Option from "../Option";

const Cols = (props: ATHOSSelectPropsCols) => {
  const { colClassName, optionClassName, labelsStyle } = props;
  const { cols, select, selectedItems: selected, isOpened, lastSelected } = useATHOSSelectContext();
  return (
    <>
      {cols?.map((colGroup, index) => (
        <div key={index} className={`flex ${colClassName}`} style={props.colStyle}>
          {colGroup.map((option) => (
            <Option
              isLastSelected={lastSelected === option.value}
              isOpened={isOpened}
              key={option.value}
              selectedClassName={props.selectedLabelClassName}
              selectedStyle={props.selectedLabelStyle}
              style={labelsStyle}
              className={optionClassName}
              option={option}
              onClick={() => select(option.value)}
              isSelected={selected.includes(option.value)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Cols;
