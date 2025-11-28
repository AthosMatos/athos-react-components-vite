export interface ATHOSInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
  removePredefaultStyles?: boolean;
}

const LightInput = ({
  label,
  wrapperClassName,
  removePredefaultStyles,
  ...props
}: ATHOSInputProps) => {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {label && (
        <label className="text-sm font-medium text-gray-400">{label}</label>
      )}
      <input
        {...props}
        className={`${
          removePredefaultStyles
            ? ""
            : "px-2 py-[6px] border bg-white text-black border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-mBrown transition-all"
        } ${props.className}`}
      />
    </div>
  );
};

export default LightInput;
