import { ATHOSTabs } from "../component";

const ATHOSTabsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">ATHOSTabs Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A tab navigation component for organizing content into separate views.</p>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Tabs</h3>
          <ATHOSTabs
            className={{
              tab: {
                default: "text-neutral-400 dark:text-neutral-500",
                active: "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200",
              },
              body: "text-black dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-800",
            }}
            tabs={[
              {
                title: { value: "Tab 1" },
                content: {
                  value: (
                    <div className="p-4">
                      <h4 className="font-bold">Content for Tab 1</h4>
                      <p>This is the content displayed when Tab 1 is active.</p>
                    </div>
                  ),
                },
              },
              {
                title: { value: "Tab 2" },
                content: {
                  value: (
                    <div className="p-4">
                      <h4 className="font-bold">Content for Tab 2</h4>
                      <p>This is the content displayed when Tab 2 is active.</p>
                    </div>
                  ),
                },
              },
              {
                title: { value: "Tab 3" },
                content: {
                  value: (
                    <div className="p-4">
                      <h4 className="font-bold">Content for Tab 3</h4>
                      <p>This is the content displayed when Tab 3 is active.</p>
                    </div>
                  ),
                },
              },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Tabs with Add Button</h3>
          <ATHOSTabs
            className={{
              tab: {
                default: "text-neutral-400 dark:text-neutral-500",
                active: "bg-blue-500 text-white",
              },
              body: "bg-gray-100 dark:bg-gray-800",
            }}
            tabs={[
              {
                title: { value: "First" },
                content: {
                  value: <div className="p-4">First tab content</div>,
                },
              },
              {
                title: { value: "Second" },
                content: {
                  value: <div className="p-4">Second tab content</div>,
                },
              },
            ]}
            addTab={{
              icon: "+",
              onClick: () => alert("Add new tab clicked!"),
              className: "text-gray-500 hover:text-gray-700",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ATHOSTabsPage;
