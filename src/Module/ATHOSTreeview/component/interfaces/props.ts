import { TreeType } from "./tree";

export interface ATHOSTreeviewPropsI {
  styles?: {
    generalClassName?: string;
    selected?: {
      bgColor?: string;
      bgcolorIndex?: (index: number) => string;
      color?: string;
      colorIndex?: (index: number) => string;
    };
  };
  isLoading?: boolean;
  data: TreeType[];
  selected?: string[];
  onAdd?: (name: string, parentId?: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
  onMove?: (id: string, parentId: string) => void;
  fillWidth?: boolean;
  levelIndicator?: "darken" | "brighten";
}
