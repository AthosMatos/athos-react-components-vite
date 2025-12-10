import { atom } from "jotai";
import type { ATHOSSwitcherProps } from "../interfaces";

/**
 * Atom for storing the switcher props configuration
 */
export const switcherPropsAtom = atom<ATHOSSwitcherProps>({
  switchs: [],
});

/**
 * Atom for storing the currently selected switch index
 */
export const selectedIndexAtom = atom<number>(0);

/**
 * Derived atom to get the selected switch id
 */
export const selectedIdAtom = atom((get) => {
  const props = get(switcherPropsAtom);
  const selectedIndex = get(selectedIndexAtom);
  return props.switchs[selectedIndex]?.id;
});

/**
 * Derived atom to check if the component is controlled (has selectedId prop)
 */
export const isControlledAtom = atom((get) => {
  const props = get(switcherPropsAtom);
  return !!props.selectedId;
});

/**
 * Derived atom to get the onChange callback
 */
export const onChangeAtom = atom((get) => {
  const props = get(switcherPropsAtom);
  return props.onChange;
});
