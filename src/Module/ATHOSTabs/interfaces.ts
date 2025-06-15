import { ReactNode } from "react";
interface TabClassNameProps {
  default?: string;
  active?: string;
}

export interface TabColorsProps {
  default?: React.CSSProperties;
  active?: React.CSSProperties;
}
export interface ATHOSTabProps {
  title: {
    value?: ReactNode;
    className?: TabClassNameProps;
    style?: TabColorsProps;
  };
  content: {
    value?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  };
}

export interface ATHOSTabsProps {
  tabs: ATHOSTabProps[];
  gap?: number;
  className?: {
    tab?: TabClassNameProps;
    tabsWrapper?: string;
    body?: string;
  };
  colors?: {
    tab?: TabColorsProps;
    body?: React.CSSProperties;
  };
  addTab?: {
    icon: ReactNode;
    onClick?: () => void;
    className?: string;
  };
}
