import { useEffect, useState } from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { ATHOSDropDown } from "../../ATHOSDropDown/component";

interface Crumb {
  crumb: React.ReactNode;
  dropdown?: {
    label: string;
    value: number;
    path: string;
    onClick?: () => void;
  }[];
}

export interface ATHOSBreadcrumbsProps {
  crumbs: Crumb[];
  subTitle?: string;
  selected?: {
    value: number;
    label: string;
  };
}

export const ATHOSBreadcrumbs = ({ crumbs, subTitle, selected }: ATHOSBreadcrumbsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<{ value: number; label: string } | undefined>(selected);

  useEffect(() => {
    if (selected) {
      setSelectedOpt(selected);
    }
    return () => {
      setSelectedOpt(undefined);
      //setIsOpen(false);
    };
  }, [selected]);
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-zinc-400 font-medium gap-1">
        {crumbs.map((item, index) => {
          return (
            <>
              {item.dropdown ? (
                <ATHOSDropDown
                  key={index}
                  onToggle={(isOpen) => {
                    setIsOpen(isOpen);
                  }}
                  className={`bg-zinc-100 rounded-lg overflow-hidden border border-zinc-300 border-t-0 px-1 py-1 !rounded-tl-none`}
                  spacing={0}
                  buttonClassName={`cursor-pointer transition-[padding] border border-b-0 ${
                    isOpen ? "bg-zinc-100 border-zinc-300 px-2" : "border-transparent"
                  } py-1 ${isOpen ? "!rounded-t-lg" : "!rounded-lg"}`}
                  listButtonsClassName="px-2 py-1 rounded-md outline-1 outline min-w-max transition-all hover:text-zinc-900"
                  labels={item.dropdown.map((opt) => {
                    return {
                      label: opt.label,
                      onClick: () => {
                        setSelectedOpt(opt);
                        if (opt.onClick) {
                          opt.onClick();
                        }
                      },
                      className: `${
                        selectedOpt?.value === opt.value ? "bg-white outline-zinc-300 text-zinc-700" : "outline-transparent"
                      }  `,
                    };
                  })}
                >
                  {item.crumb}
                </ATHOSDropDown>
              ) : (
                item.crumb
              )}

              <div className="flex items-center gap-2">
                <PiCaretRightBold className="text-lg" />
              </div>
            </>
          );
        })}
        <p className="font-bold text-3xl text-zinc-700">{selectedOpt?.label}</p>
      </div>
      <h1 className="text-zinc-400 text-lg">{subTitle}</h1>
    </div>
  );
};
