import { useATHOSSelectContext } from "../../context";
import { ATHOSSelectPropsList } from "../../intefaces";
import Option from "../Option";

const Options = (props: ATHOSSelectPropsList) => {
  const { optionClassName, labelsStyle } = props;
  const { select, labels, selectedItems: selected, isOpened, setLastSelected, lastSelected } = useATHOSSelectContext();

  return (
    <>
      {labels?.map((option) => (
        <Option
          isOpened={isOpened}
          key={option.value}
          selectedClassName={props.selectedLabelClassName}
          selectedStyle={props.selectedLabelStyle}
          style={labelsStyle}
          className={optionClassName}
          option={option}
          onClick={() => {
            select(option.value);
            setLastSelected(option.value);
          }}
          isLastSelected={lastSelected === option.value}
          isSelected={selected.includes(option.value)}
        />
      ))}
    </>
  );
};

export default Options;
