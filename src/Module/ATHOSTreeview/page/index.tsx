import { useState } from "react";
import { FaTreeCity } from "react-icons/fa6";
import { ATHOSTreeview } from "../component";
import { TreeType } from "../component/interfaces/tree";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ATHOSTreeviewPage = () => {
  const [selected, setSelected] = useState<string[]>(["sub1.1.1"]);
  const [data, setData] = useState<TreeType[]>([
    {
      id: "tree1",
      name: "Tree 1",
      icon: <FaTreeCity />,

      sub: [
        {
          id: "sub1.1",
          name: "Sub 1.1",

          sub: [
            {
              id: "sub1.1.1",
              name: "Sub 1.1.1",
            },
            {
              id: "sub1.1.2",
              name: "Sub 1.1.2",
            },
          ],
        },
        {
          id: "sub1.2",
          name: "Sub 1.2",
          onClick: () => {
            alert("Sub 1.2 clicked");
          },
        },
      ],
    },
    {
      id: "tree2",
      name: "Tree 2",
      icon: <FaTreeCity />,

      sub: [
        {
          id: "sub2.1",
          name: "Sub 2.1",
        },
        {
          id: "sub2.2",
          name: "Sub 2.2",
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const multiSelectHandler = (id: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  const singularSelectHandler = async (id: string) => {
    setLoading(true);
    await sleep(1000);
    setSelected([id]);
    setLoading(false);
  };

  const handleAdd = (name: string, parentId?: string) => {};

  return (
    <div className="text-black">
      {/* <SortableTree indicator collapsible /> */}
      <ATHOSTreeview
        isLoading={loading}
        styles={{
          generalClassName: "border border-zinc-300 rounded-xl p-2 w-[500px]",
          selected: {
            bgColor: "#E1D8D8",
            color: "#845B5D",
          },
        }}
        fillWidth
        selected={selected}
        onAdd={(name, parentId) => {
          //alert(`Add: ${name} under ${parentId}`);
          handleAdd(name, parentId);
        }}
        onDelete={(id) => {
          alert(`Delete: ${id}`);
        }}
        onMove={(id, parentId) => {
          alert(`Move: ${id} to ${parentId}`);
        }}
        onSelect={(id) => {
          singularSelectHandler(id);
        }}
        data={data}
      />
    </div>
  );
};

export default ATHOSTreeviewPage;
