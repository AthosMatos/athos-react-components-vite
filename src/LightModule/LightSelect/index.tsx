import type { ReactNode } from "react";

export type ValueOption = {
  id: string;
  onClick?: (id: string) => void;
  className?: string;
  label: ReactNode;
};

interface LightSelectProps {
  selected?: ReactNode;
  id: string;
  disabled?: boolean;
  label?: string;
  values?: ValueOption[];
  listClassName?: string;
  listValueClassName?: string;
  selectedClassName?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  hideOnSelect?: boolean;
}

const LightSelect = ({
  selected,
  id,
  disabled,
  label,
  values,
  listClassName,
  selectedClassName,
  wrapperClassName,
  labelClassName,
  listValueClassName,
  hideOnSelect,
}: LightSelectProps) => {
  const handleValueClick = (valueId: string, onClick?: (id: string) => void) => {
    onClick?.(valueId);

    if (hideOnSelect) {
      const popover = document.getElementById(`popover-${id}`) as HTMLElement & { hidePopover?: () => void };
      popover?.hidePopover?.();
    }
  };

  return (
    <>
      <div className={wrapperClassName}>
        {label && <label className={` ${labelClassName || "text-sm font-medium text-gray-400"}`}>{label}</label>}
        <button
          type="button"
          disabled={disabled}
          className={`px-3 disabled:opacity-50 py-[6px] flex justify-start w-full border cursor-pointer bg-white text-black border-gray-200 rounded-lg focus:outline-none  transition-all ${selectedClassName}`}
          popoverTarget={`popover-${id}`}
          style={{ anchorName: `--anchor-${id}` } as React.CSSProperties}
        >
          {disabled ? "Nenhuma opção disponível" : selected}
        </button>
      </div>

      {!disabled && (
        <ul
          className={`dropdown rounded-box bg-white shadow-sm mt-2 p-1 flex flex-col gap-1 ${listClassName}`}
          popover="auto"
          id={`popover-${id}`}
          style={
            {
              positionAnchor: `--anchor-${id}`,
              width: `anchor-size(--anchor-${id} width)`,
            } as React.CSSProperties
          }
        >
          {values?.map((c) => (
            <li key={c.id} onClick={() => handleValueClick(c.id, c.onClick)} className={`${listValueClassName} ${c.className}`}>
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LightSelect;
