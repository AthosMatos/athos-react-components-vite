import { useState } from "react";
import { ValueOption } from "../../types";
import LightSelect from "../component";

const LightSelectPage = () => {
  const [basicSelected, setBasicSelected] = useState<string>("Select an option");
  const [countrySelected, setCountrySelected] = useState<string>("Choose a country");

  const basicValues: ValueOption[] = [
    { id: "option1", label: "Option 1", value: "Option 1", onClick: (id) => setBasicSelected(String(id)) },
    { id: "option2", label: "Option 2", value: "Option 2", onClick: (id) => setBasicSelected(String(id)) },
    { id: "option3", label: "Option 3", value: "Option 3", onClick: (id) => setBasicSelected(String(id)) },
    { id: "option4", label: "Option 4", value: "Option 4", onClick: (id) => setBasicSelected(String(id)) },
  ];

  const countryValues: ValueOption[] = [
    { id: "us", label: "United States", value: "🇺🇸 United States", onClick: (id) => setCountrySelected(String(id)) },
    { id: "br", label: "Brazil", value: "🇧🇷 Brazil", onClick: (id) => setCountrySelected(String(id)) },
    { id: "uk", label: "United Kingdom", value: "🇬🇧 United Kingdom", onClick: (id) => setCountrySelected(String(id)) },
    { id: "de", label: "Germany", value: "🇩🇪 Germany", onClick: (id) => setCountrySelected(String(id)) },
    { id: "fr", label: "France", value: "🇫🇷 France", onClick: (id) => setCountrySelected(String(id)) },
    { id: "jp", label: "Japan", value: "🇯🇵 Japan", onClick: (id) => setCountrySelected(String(id)) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">LightSelect Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A lightweight select/dropdown component using native popover API.</p>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Select</h3>
          <LightSelect id="basic-select" values={basicValues} selected={basicSelected} />
          {basicSelected !== "Select an option" && <p className="mt-2 text-sm text-gray-600">Selected: {basicSelected}</p>}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Select with Label</h3>
          <LightSelect id="labeled-select" values={countryValues} selected={countrySelected} label="Country" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Disabled Select</h3>
          <LightSelect id="disabled-select" values={basicValues} selected="This is disabled" disabled />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Custom Styled Select</h3>
          <LightSelect
            id="custom-select"
            values={countryValues}
            selected="Custom styled"
            selectedClassName="border-2 border-purple-500 rounded-xl"
            listClassName="bg-purple-50"
            listValueClassName="hover:bg-purple-100 px-3 py-2 cursor-pointer rounded"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Without Auto Styling</h3>
          <LightSelect
            id="no-auto-select"
            values={basicValues}
            selected="No auto styling"
            selectedAutoClassName={false}
            selectedClassName="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer"
            listClassName="bg-gray-800"
            listValueClassName="text-white hover:bg-gray-700 px-3 py-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default LightSelectPage;
