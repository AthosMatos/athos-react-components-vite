import { CrumbType } from "./crumbs";

export interface ATHOSTreeviewPropsI {
  styles?: {
    generalClassName?: string;
    selectedClassName?: ((index: number) => string) | string;
  };
  isLoading?: boolean;
  data: CrumbType[];
  selected?: string[];
  onAdd?: (name: string, parentId?: string) => void;
  onDelete?: (id: string) => void;
  fillWidth?: boolean;
  onSelect?: (id: string) => void;
  update?: (data: CrumbType[]) => void;
}
