import { useState } from "react";
import LightList from "../component";

const LightListPage = () => {
  const [selected, setSelected] = useState<string>("Option 1");

  const options = [
    {
      id: "1",
      label: "Option 1",
      value: "Option 1",
      onClick: () => setSelected("Option 1"),
      className: "px-3 py-2 hover:bg-gray-100 cursor-pointer rounded",
    },
    {
      id: "2",
      label: "Option 2",
      value: "Option 2",
      onClick: () => setSelected("Option 2"),
      className: "px-3 py-2 hover:bg-gray-100 cursor-pointer rounded",
    },
    {
      id: "3",
      label: "Option 3",
      value: "Option 3",
      onClick: () => setSelected("Option 3"),
      className: "px-3 py-2 hover:bg-gray-100 cursor-pointer rounded",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">LightList Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A lightweight list/dropdown component using native popover API.</p>

      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-3">Basic List</h3>
          <LightList id="basic-list" selected={selected} values={options} label="Select an option" />
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p>
            Selected: <strong>{selected}</strong>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Disabled List</h3>
          <LightList id="disabled-list" selected={selected} values={options} label="Disabled" disabled />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Custom Styled</h3>
          <LightList
            id="styled-list"
            selected={selected}
            values={options}
            label="Custom Styling"
            selectedClassName="border-2 border-blue-500"
            listClassName="bg-blue-50"
            listValueClassName="hover:bg-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default LightListPage;
