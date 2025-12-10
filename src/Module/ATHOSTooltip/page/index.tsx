import { ATHOSButton } from "../../ATHOSButton/component";
import { ATHOSTooltip } from "../component";

const ATHOSTooltipPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">ATHOSTooltip Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A tooltip component that displays additional information on hover.</p>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Top Position (Default)</h3>
          <ATHOSTooltip tooltipContent={<span>This is a tooltip on top!</span>} position="top">
            <ATHOSButton className="bg-blue-500 text-white px-4 py-2 rounded">Hover me (Top)</ATHOSButton>
          </ATHOSTooltip>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Bottom Position</h3>
          <ATHOSTooltip tooltipContent={<span>This is a tooltip on bottom!</span>} position="bottom">
            <ATHOSButton className="bg-green-500 text-white px-4 py-2 rounded">Hover me (Bottom)</ATHOSButton>
          </ATHOSTooltip>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Cursor</h3>
          <ATHOSTooltip tooltipContent={<span>I follow your cursor!</span>} followCursor>
            <div className="w-48 h-24 bg-purple-200 dark:bg-purple-800 rounded-lg flex items-center justify-center cursor-pointer">
              Move cursor here
            </div>
          </ATHOSTooltip>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Custom Content</h3>
          <ATHOSTooltip
            tooltipContent={
              <div className="flex flex-col gap-1">
                <strong>Custom Tooltip</strong>
                <p className="text-sm">With multiple lines</p>
                <p className="text-xs text-gray-400">And extra info!</p>
              </div>
            }
            position="top"
          >
            <ATHOSButton className="bg-orange-500 text-white px-4 py-2 rounded">Rich Tooltip</ATHOSButton>
          </ATHOSTooltip>
        </div>
      </div>
    </div>
  );
};

export default ATHOSTooltipPage;
