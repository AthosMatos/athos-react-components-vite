import { usePropsContext } from "../../contexts/propsContext";

interface ItemWrapperProps {
    label?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    open: boolean;
    onClick?: () => void;
}

export const ListWrapperClassname = `flex gap-1 flex-col shadow-lg flex-1 rounded-xl border w-max p-1
border-zinc-300 dark:border-zinc-600
text-sm
h-fit backdrop-blur-sm`;

export const ListBgWrapperClassname = `bg-zinc-200/70  dark:bg-zinc-900/80 ${ListWrapperClassname}`;

export const ListButtonClassname = `flex transition-all 
bg-white/65 dark:bg-zinc-800/80 
cursor-pointer items-center gap-2 rounded-lg p-2
border border-transparent
hover:border-zinc-300 hover:bg-white dark:hover:border-zinc-600
active:scale-95
text-zinc-800 dark:text-zinc-200`;

/* border border-zinc-300 dark:border-zinc-600  */
const defaultWrapperClassName = (
    open: boolean,
    className?: string,
    disabled?: boolean
) => `
  transition-all ${
      disabled
          ? "opacity-50 cursor-not-allowed"
          : "active:scale-95 cursor-pointer"
  } 
  rounded-md h-10 text-sm gap-2
  flex items-center justify-center ${open ? className : ""}
`;

export const ButtonWrapper = ({
    open,
    onClick,
    label,
    icon,
    disabled
}: ItemWrapperProps) => {
    const colors =
        usePropsContext<any>().tableStyle?.header?.functionsColors?.icons.open;

    return (
        <div
            onMouseDown={(e) => {
                e.preventDefault();
                if (onClick) onClick();
            }}
            className={`px-3 ${defaultWrapperClassName(
                open,
                colors?.className,
                disabled
            )}`}
        >
            {icon}
            {label}
        </div>
    );
};

interface IconWrapperProps {
    children: React.ReactNode;
    onClick?: () => void;
    open: boolean;
    wref?: any;
}

export const IconWrapper = ({
    children,
    onClick,
    open,
    wref
}: IconWrapperProps) => {
    const colors =
        usePropsContext<any>().tableStyle?.header?.functionsColors?.icons.open;
    return (
        <div
            ref={wref}
            onMouseDown={(e) => {
                e.preventDefault();
                if (onClick) onClick();
            }}
            className={`w-10 ${defaultWrapperClassName(
                open,
                colors?.className
            )}`}
        >
            {children}
        </div>
    );
};
