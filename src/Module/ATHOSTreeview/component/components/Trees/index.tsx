import { ATHOSTreeviewAdd } from "../../context/add";
import { ATHOSTreeviewProps } from "../../context/props";
import { ATHOSTreeviewPropsI } from "../../interfaces/props";
import Add from "./components/Add";
import TreeItem from "./Tree";

const Trees = ({ data, index = 0, parentId }: { data: ATHOSTreeviewPropsI["data"]; index?: number; parentId?: string }) => {
  const { onAdd, isLoading } = ATHOSTreeviewProps();
  const { addingToParent } = ATHOSTreeviewAdd();
  return (
    <div className={`${isLoading && index === 0 ? "blur-[2px]" : ""}`}>
      {data.map((tree) => (
        <TreeItem tree={tree} id={tree.id} index={index} />
      ))}
      {onAdd && addingToParent === parentId && <Add index={index} parentId={parentId} />}
    </div>
  );
};

export default Trees;
