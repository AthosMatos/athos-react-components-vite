import type { ReactNode } from "react";
import { ATHOSInputStyles } from "../../ATHOSInput/component/interfaces";
import { PopUpPosition } from "../../hooks/private/usePopUp";

export interface SelectedItemI {
  label: string;
  component?: ReactNode;
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
}

type MultiSelectType =
  | boolean
  | {
      amountBeforeShortening: number;
    };

interface ATHOSSelectBaseProps {
  loading?: boolean;
  justValues?: boolean;
  thin?: boolean;
  label?: string;
  disabled?: boolean;
  error?: string;
  selected?: (string | number)[] | string | number | null;
  position?: PopUpPosition;
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  listWrapperClassName?: string;
  containerClassName?: string;
  optionClassName?: string;
  selectedLabelClassName?: string;
  selectedLabelStyle?: React.CSSProperties;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
  matchLabelWidth?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
  inline?: boolean;
  listContainerClassName?: string;
  listContainerStyle?: React.CSSProperties;
  multiSelect?: MultiSelectType;
  multiSelectLabelClassName?: string;
  onChange?: ((selected: (string | number)[]) => Promise<any>) | ((selected: (string | number)[]) => void);
  search?:
    | {
        placeholder?: string;
        colors?: ATHOSInputStyles;
        className?: string;
      }
    | boolean;
}
export interface ATHOSSelectPropsList extends ATHOSSelectBaseProps {
  labels: SelectedItemI[];
}

export interface ATHOSSelectPropsCols extends ATHOSSelectBaseProps {
  cols: SelectedItemI[][];
  colClassName?: string;
  colStyle?: React.CSSProperties;
}
export type ATHOSSelectedProps = ATHOSSelectPropsList | ATHOSSelectPropsCols;
