import { useState } from "react";
import { ATHOSButton } from "../../ATHOSButton/component";
import { ATHOSToast } from "../component";

const ATHOSToastPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">ATHOSToast Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A toast notification component for displaying temporary messages.</p>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Toast</h3>
          <ATHOSButton onClick={() => setShowToast(true)}>Show Toast (Top Right)</ATHOSButton>
          <ATHOSToast
            renderCondition={showToast}
            position="top-right"
            renderAndFade
            fadeTime={3000}
            updateState={showToast}
            className="bg-green-500 text-white"
          >
            This is a success toast message!
          </ATHOSToast>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Bottom Left Toast</h3>
          <ATHOSButton onClick={() => setShowToast2(true)}>Show Toast (Bottom Left)</ATHOSButton>
          <ATHOSToast
            renderCondition={showToast2}
            position="bottom-left"
            renderAndFade
            fadeTime={3000}
            updateState={showToast2}
            className="bg-blue-500 text-white"
          >
            This is an info toast message!
          </ATHOSToast>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Toast Positions</h3>
          <ul className="list-disc list-inside text-sm">
            <li>top-right</li>
            <li>top-left</li>
            <li>bottom-right</li>
            <li>bottom-left</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ATHOSToastPage;
