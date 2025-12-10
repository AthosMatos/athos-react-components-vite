import { LangsI, useLang } from "../../langContext/redux";
import { ATHOSSwitcher } from "../../module-index";
import { isBiggerThan } from "../../Module/hooks/useWindowSize";

import BrasilFlag from "./assets/Flag_of_Brazil.svg.png";
import USUKFlag from "./assets/US-UK-blend.png";

const Flag = ({ src }: { src: string }) => <img className="h-6 w-6 object-cover rounded-full" src={src} />;

const LangSwitcher = () => {
  const { setLang, lang } = useLang();

  return (
    <ATHOSSwitcher
      selectedId={lang}
      className={{
        container: "dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 border",
        switches: {
          default: "text-black dark:text-zinc-200",
          active: "bg-snow dark:bg-zinc-600 dark:text-zinc-200 rounded-lg border dark:border-zinc-500 border-zinc-300",
        },
      }}
      onChange={(id: any) => setLang(id)}
      switchs={[
        {
          icon: <Flag src={BrasilFlag} />,
          label: isBiggerThan("md") && "Português",
          id: "pt-BR" as LangsI,
        },
        {
          icon: <Flag src={USUKFlag} />,
          label: isBiggerThan("md") && "English",
          id: "en-US" as LangsI,
        },
      ]}
    />
  );
};

export default LangSwitcher;
