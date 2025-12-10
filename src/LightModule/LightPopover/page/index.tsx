import LightPopover from "../component";

const LightPopoverPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">LightPopover Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">
        A lightweight popover component using native popover API with multiple positioning options.
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Bottom Position (Default)</h3>
          <LightPopover
            id="popover-bottom"
            position="bottom"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
            contentClassName="bg-white shadow-lg rounded-lg p-4 border"
            content={
              <div className="text-black">
                <p className="font-semibold">Popover Content</p>
                <p className="text-sm text-gray-500">This appears below the button</p>
              </div>
            }
          >
            Click me (Bottom)
          </LightPopover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Top Position</h3>
          <LightPopover
            id="popover-top"
            position="top"
            className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
            contentClassName="bg-white shadow-lg rounded-lg p-4 border"
            content={
              <div className="text-black">
                <p className="font-semibold">Top Popover</p>
                <p className="text-sm text-gray-500">This appears above the button</p>
              </div>
            }
          >
            Click me (Top)
          </LightPopover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Right Position</h3>
          <LightPopover
            id="popover-right"
            position="right"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg cursor-pointer"
            contentClassName="bg-white shadow-lg rounded-lg p-4 border"
            content={
              <div className="text-black">
                <p className="font-semibold">Right Popover</p>
                <p className="text-sm text-gray-500">This appears to the right</p>
              </div>
            }
          >
            Click me (Right)
          </LightPopover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Left Position</h3>
          <div className="ml-48">
            <LightPopover
              id="popover-left"
              position="left"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer"
              contentClassName="bg-white shadow-lg rounded-lg p-4 border"
              content={
                <div className="text-black">
                  <p className="font-semibold">Left Popover</p>
                  <p className="text-sm text-gray-500">This appears to the left</p>
                </div>
              }
            >
              Click me (Left)
            </LightPopover>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">With Menu Items</h3>
          <LightPopover
            id="popover-menu"
            position="bottom-left"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer"
            contentClassName="bg-white shadow-lg rounded-lg py-2 border min-w-[150px]"
            content={
              <div className="flex flex-col">
                <button className="px-4 py-2 text-left text-black hover:bg-gray-100">Edit</button>
                <button className="px-4 py-2 text-left text-black hover:bg-gray-100">Duplicate</button>
                <button className="px-4 py-2 text-left text-red-500 hover:bg-gray-100">Delete</button>
              </div>
            }
          >
            Actions Menu
          </LightPopover>
        </div>
      </div>
    </div>
  );
};

export default LightPopoverPage;
