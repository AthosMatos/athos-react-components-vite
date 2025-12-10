import { useState } from "react";
import LightInput from "../component";

const LightInputPage = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">LightInput Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A lightweight input component with optional label and customizable styling.</p>

      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-3">Basic Input</h3>
          <LightInput placeholder="Enter your text..." value={value} onChange={(e) => setValue(e.target.value)} />
          {value && <p className="mt-2 text-sm text-gray-500">You typed: {value}</p>}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">With Label</h3>
          <LightInput label="Email Address" placeholder="example@email.com" type="email" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Password Input</h3>
          <LightInput label="Password" placeholder="Enter your password" type="password" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">With Wrapper Class</h3>
          <LightInput label="Full Name" placeholder="John Doe" wrapperClassName="gap-1" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Disabled Input</h3>
          <LightInput label="Disabled" placeholder="Cannot edit" disabled />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Custom Styled (No Predefault)</h3>
          <LightInput
            label="Custom Input"
            placeholder="Custom styling"
            removePredefaultStyles
            className="border-2 border-blue-500 rounded-full px-4 py-2 focus:outline-none focus:border-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default LightInputPage;
