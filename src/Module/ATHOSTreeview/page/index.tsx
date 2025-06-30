import { useState } from "react";
import { FaTreeCity } from "react-icons/fa6";
import { ATHOSTreeview } from "../component";

const ATHOSTreeviewPage = () => {
  const [selected, setSelected] = useState<string[]>(["sub1.1.1"]);
  const [data, setData] = useState([
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

  const multiSelectHandler = (id: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  const singularSelectHandler = (id: string) => {
    setSelected([id]);
  };

  const handleAdd = (name: string, parentId?: string) => {};

  return (
    <div className="text-black">
      <ATHOSTreeview
        styles={{
          generalClassName: "border border-zinc-300 rounded-md p-2",
          // selectedClassName: (index) => `bg-red-${Math.min(index + 1, 9)}00 text-blue-900`,
        }}
        fillWidth
        selected={selected}
        /*  onAdd={(name, parentId) => {
          //alert(`Add: ${name} under ${parentId}`);
          handleAdd(name, parentId);
        }}
        onDelete={(id) => {
          alert(`Delete: ${id}`);
        }} */
        onSelect={(id) => {
          singularSelectHandler(id);
        }}
        data={data}
      />
    </div>
  );
};

export default ATHOSTreeviewPage;
