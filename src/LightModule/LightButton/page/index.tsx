import LightButton from "../component";

const LightButtonPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">LightButton Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A lightweight button component with multiple style variants.</p>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Button Types</h3>
          <div className="flex flex-wrap gap-3">
            <LightButton buttontype="primary">Primary</LightButton>
            <LightButton buttontype="primary2">Primary 2</LightButton>
            <LightButton buttontype="secondary">Secondary</LightButton>
            <LightButton buttontype="danger">Danger</LightButton>
            <LightButton buttontype="warning">Warning</LightButton>
            <LightButton buttontype="info">Info</LightButton>
            <LightButton buttontype="default">Default</LightButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">With Custom Classes</h3>
          <div className="flex flex-wrap gap-3">
            <LightButton buttontype="primary" className="text-white">
              Primary White Text
            </LightButton>
            <LightButton buttontype="danger" className="text-white rounded-full px-8">
              Rounded Danger
            </LightButton>
            <LightButton className="border border-blue-500 text-blue-500">Outlined</LightButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Disabled State</h3>
          <LightButton buttontype="primary" disabled className="opacity-50 cursor-not-allowed text-white">
            Disabled Button
          </LightButton>
        </div>
      </div>
    </div>
  );
};

export default LightButtonPage;
