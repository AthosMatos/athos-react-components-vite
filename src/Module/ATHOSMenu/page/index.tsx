import { useState } from "react";
import { FaCog, FaFolder, FaHome, FaUser } from "react-icons/fa";
import { ATHOSMenu } from "../component";

const ATHOSMenuPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const menuOptions = [
    {
      label: "Home",
      icon: <FaHome />,
      onClick: () => setSelected("Home"),
    },
    {
      label: "Profile",
      icon: <FaUser />,
      onClick: () => setSelected("Profile"),
    },
    {
      label: "Files",
      icon: <FaFolder />,
      subOpts: [
        {
          label: "Documents",
          onClick: () => setSelected("Documents"),
        },
        {
          label: "Images",
          onClick: () => setSelected("Images"),
        },
      ],
    },
    {
      label: "Settings",
      icon: <FaCog />,
      onClick: () => setSelected("Settings"),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">ATHOSMenu Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A customizable menu component with support for nested options and icons.</p>

      <div className="w-64">
        <ATHOSMenu options={menuOptions} />
      </div>

      {selected && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p>
            Selected: <strong>{selected}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ATHOSMenuPage;
