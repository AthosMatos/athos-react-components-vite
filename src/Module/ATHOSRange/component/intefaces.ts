import type { CSSProperties } from "styled-components";
import type { PopUpPosition } from "../../hooks/private/usePopUp";

export interface ATHOSRangeProps {
  justValues?: boolean;
  thin?: boolean;
  label?: string;
  disabled?: boolean;
  error?: string;

  type?: "date" | "value";

  values?: { min: string; max: string };

  position?: PopUpPosition;
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  optionLabelClassName?: string;
  selectedLabelClassName?: string;
  selectedLabelStyle?: CSSProperties;
  labelsStyle?: React.CSSProperties;
  spacing?: number;
  matchLabelWidth?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
  inline?: boolean;
  containerClassName?: string;

  onChange?: (values: { min: string; max: string }) => void;
}
