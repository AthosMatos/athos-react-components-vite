export interface CrumbType {
  id: string;
  name: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  sub?: CrumbType[];
  onClick?: (id: string) => void;
}
