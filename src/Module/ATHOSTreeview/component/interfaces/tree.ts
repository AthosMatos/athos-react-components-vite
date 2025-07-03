export interface TreeType {
  id: string;
  name: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  sub?: TreeType[];
  onClick?: (id: string) => void;
}
