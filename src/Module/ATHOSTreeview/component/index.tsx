import { CgSpinner } from "react-icons/cg";
import Trees from "./components/Trees";
import { ATHOSTreeviewPropsProvider } from "./context/props";
import { Providers } from "./context/providers";
import { ATHOSTreeviewPropsI } from "./interfaces/props";

export function ATHOSTreeview(props: ATHOSTreeviewPropsI) {
  const hasData = props.data.length > 0;

  return (
    hasData && (
      <ATHOSTreeviewPropsProvider props={props}>
        {Providers.reduce(
          (children, Provider) => (
            <Provider>{children}</Provider>
          ),
          <div className={`relative flex flex-col gap-1 text-black ${props.styles?.generalClassName || "w-full"}`}>
            <Trees data={props.data} />
            {props.isLoading && (
              <div
                style={{
                  color: props.styles?.selected?.color || "#000",
                }}
                className="w-full h-full absolute flex items-center justify-center "
              >
                <CgSpinner className="animate-spin text-5xl" />
              </div>
            )}
          </div>
        )}
      </ATHOSTreeviewPropsProvider>
    )
  );
}
