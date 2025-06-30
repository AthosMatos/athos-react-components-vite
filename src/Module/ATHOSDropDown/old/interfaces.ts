import type { ReactNode } from "react";
import type { PopUpPosition } from "../../hooks/private/usePopUp";

interface ATHOSDDDPPBaseProps {
  position?: PopUpPosition;
  style?: React.CSSProperties;
  className?: string;
  listButtonsClassName?: string;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
  matchChildrenWidth?: boolean;
  onToggle?: (isOpen: boolean) => void;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  disabled?: boolean;
}

export interface LabelI {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
interface ATHOSDropDownBaseProps extends ATHOSDDDPPBaseProps {
  children: React.ReactNode;
}
export interface ATHOSDropDownPropsList extends ATHOSDropDownBaseProps {
  labels: LabelI[];
}

export interface ATHOSDropDownPropsCols extends ATHOSDropDownBaseProps {
  cols: LabelI[][];
  colClassName?: string;
  colStyle?: React.CSSProperties;
}
export type ATHOSDropDownProps = ATHOSDropDownPropsList | ATHOSDropDownPropsCols;
