import { ReactNode } from "react";
const SelectedItem = ({ children }: { children: ReactNode }) => {
  const defaultClassName = `flex cursor-pointer select-none`;

  return <div className={`${defaultClassName}`}>{children}</div>;
};

export default SelectedItem;
