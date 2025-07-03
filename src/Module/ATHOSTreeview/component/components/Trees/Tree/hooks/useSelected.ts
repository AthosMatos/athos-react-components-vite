import { useCallback, useMemo } from "react";
import { ATHOSTreeviewProps } from "../../../../context/props";
import { TreeType } from "../../../../interfaces/tree";

interface UseSelectedProps {
  id: string;
  tree: TreeType;
}

export const useSelected = ({ tree, id }: UseSelectedProps) => {
  const { selected } = ATHOSTreeviewProps();

  // Check if any subcategory is selected recursively
  const checkIfHasSelectedSubcategory = useCallback(
    (crumb: TreeType, id: string): boolean => {
      if (selected?.some((selectedId) => selectedId === crumb.id)) return true;
      return crumb.sub ? Object.values(crumb.sub).some((sub) => checkIfHasSelectedSubcategory(sub, id)) : false;
    },
    [selected]
  );

  const hasSelectedSubcategory = useMemo(() => {
    return checkIfHasSelectedSubcategory(tree, id);
  }, [tree, checkIfHasSelectedSubcategory, id]);

  const isSelected = useMemo(() => {
    return selected?.some((selectedId) => selectedId === tree.id) || hasSelectedSubcategory;
  }, [selected, tree.id, hasSelectedSubcategory]);

  return {
    isSelected,
    hasSelectedSubcategory,
  };
};
