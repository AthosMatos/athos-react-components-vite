import { ReactNode } from "react";

export type ValueOption = {
  id: string;
  onClick?: (id: string) => void;
  className?: string;
  value: ReactNode;
  label: string;
};
