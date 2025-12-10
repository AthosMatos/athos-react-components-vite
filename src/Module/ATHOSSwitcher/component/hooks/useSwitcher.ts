import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { isControlledAtom, onChangeAtom, selectedIndexAtom, switcherPropsAtom } from "../atoms";
import type { ATHOSSwitcherProps } from "../interfaces";

/**
 * Hook to initialize and manage switcher props
 */
export const useSwitcherProps = () => {
  const [props, setProps] = useAtom(switcherPropsAtom);
  return { props, setProps };
};

/**
 * Hook to manage the selected switch index
 */
export const useSelectedIndex = () => {
  const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom);
  return { selectedIndex, setSelectedIndex };
};

/**
 * Hook to get whether the switcher is controlled
 */
export const useIsControlled = () => {
  return useAtomValue(isControlledAtom);
};

/**
 * Hook to get the onChange callback
 */
export const useOnChange = () => {
  return useAtomValue(onChangeAtom);
};

/**
 * Hook to handle switch selection logic
 */
export const useSwitchSelect = (index: number, id?: string) => {
  const setSelectedIndex = useSetAtom(selectedIndexAtom);
  const isControlled = useIsControlled();
  const onChange = useOnChange();
  const { selectedIndex } = useSelectedIndex();

  const isSelected = selectedIndex === index;

  const handleSelect = useCallback(() => {
    if (!isSelected) {
      // Call onChange callback if provided
      if (onChange && id) {
        onChange(id);
      }

      // Only update internal state if not controlled
      if (!isControlled) {
        setSelectedIndex(index);
      }
    }
  }, [isSelected, onChange, id, isControlled, setSelectedIndex, index]);

  return { isSelected, handleSelect };
};

/**
 * Hook to initialize the switcher with props
 */
export const useInitializeSwitcher = (props: ATHOSSwitcherProps) => {
  const { setProps } = useSwitcherProps();
  const { setSelectedIndex } = useSelectedIndex();

  const initialize = useCallback(() => {
    setProps(props);

    if (props.selectedId) {
      const selectedSwitchIndex = props.switchs.findIndex((sw) => sw.id === props.selectedId);
      if (selectedSwitchIndex !== -1) {
        setSelectedIndex(selectedSwitchIndex);
      } else {
        console.error("ATHOSSwitcher: selectedId not found in switchs");
      }
    }
  }, [props, setProps, setSelectedIndex]);

  return { initialize };
};
