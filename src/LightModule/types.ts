import { ReactNode } from "react";

export type ValueOption = {
  id: string | number;
  onClick?: (id: string | number) => void;
  className?: string;
  value: ReactNode;
  label: string;
};
