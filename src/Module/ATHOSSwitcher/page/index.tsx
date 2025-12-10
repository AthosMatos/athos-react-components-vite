import { useState } from "react";
import { ATHOSSwitcher } from "../component";

const ATHOSSwitcherPage = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">ATHOSSwitcher Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A toggle switcher component for selecting between multiple options.</p>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Switcher</h3>
          <ATHOSSwitcher
            selectedId={selectedOption}
            switchs={[
              {
                id: "option1",
                label: "Option 1",
                onSelected: () => setSelectedOption("option1"),
              },
              {
                id: "option2",
                label: "Option 2",
                onSelected: () => setSelectedOption("option2"),
              },
              {
                id: "option3",
                label: "Option 3",
                onSelected: () => setSelectedOption("option3"),
              },
            ]}
            className={{
              container: "bg-gray-200 dark:bg-gray-700",
              switches: {
                default: "bg-white text-black dark:bg-gray-800 dark:text-white",
                active: "bg-blue-500 text-white",
              },
            }}
          />
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p>
            Selected: <strong>{selectedOption}</strong>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Two Options Switcher</h3>
          <ATHOSSwitcher
            switchs={[
              {
                id: "light",
                label: "Light",
                onSelected: () => {},
              },
              {
                id: "dark",
                label: "Dark",
                onSelected: () => {},
              },
            ]}
            className={{
              container: "bg-gray-200 dark:bg-gray-700",
              switches: {
                default: "bg-white text-black dark:bg-gray-800 dark:text-white",
                active: "bg-green-500 text-white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ATHOSSwitcherPage;
