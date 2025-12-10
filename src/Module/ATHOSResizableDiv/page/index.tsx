import { ATHOSResizableDiv } from "../component";

const ATHOSResizableDivPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">ATHOSResizableDiv Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A resizable container that allows users to dynamically adjust its dimensions.</p>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Resizable Div</h3>
          <ATHOSResizableDiv localSaveName="demo-resizable" className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg" withToogle>
            <p>Drag the corner to resize this container.</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">The size is saved locally using the key "demo-resizable".</p>
          </ATHOSResizableDiv>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Disabled Resizable</h3>
          <ATHOSResizableDiv disabled className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p>This container has resizing disabled.</p>
          </ATHOSResizableDiv>
        </div>
      </div>
    </div>
  );
};

export default ATHOSResizableDivPage;
