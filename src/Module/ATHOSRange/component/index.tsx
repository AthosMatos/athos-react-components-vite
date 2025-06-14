import { FaCalendar, FaDollarSign } from "react-icons/fa";
import { ATHOSCollapse } from "../../ATHOSCollapse/component";
import { ATHOSInput } from "../../ATHOSInput/component";
import { Label } from "./components/Label";
import Selected from "./components/Selected";
import { ATHOSRangeProvider, useATHOSRangeContext } from "./context";
import { ATHOSRangeProps } from "./intefaces";

const AR = (props: ATHOSRangeProps) => {
  const { inline, thin, wrapperClassName, containerClassName, type } = props;
  const {
    isOpen,
    setIsOpen,
    props: { onChange, values },
  } = useATHOSRangeContext();
  const inputPropsDefaults = {
    inputWrapperClassName: "h-7 !bg-transparent",
    inputClassName: "!text-sm ",
  };
  const inputPropsMin =
    type === "date"
      ? {
          ...inputPropsDefaults,
          type: "date",
          icon: <FaCalendar className="text-zinc-400" />,
        }
      : {
          ...inputPropsDefaults,
          type: "number",
          placeholder: "Valor Mínimo",
          icon: <FaDollarSign className="text-zinc-400" />,
        };

  const inputPropsMax =
    type === "date"
      ? {
          ...inputPropsDefaults,
          type: "date",
          icon: <FaCalendar className="text-zinc-400" />,
        }
      : {
          ...inputPropsDefaults,
          type: "number",
          placeholder: "Valor Máximo",
          icon: <FaDollarSign className="text-zinc-400" />,
        };

  console.log("ATHOSRange Rendered", values);

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>, min: boolean) => {
    const value = new Date(e.target.value).toLocaleDateString("pt-BR", { timeZone: "UTC" });

    if (min) {
      if (values) {
        onChange?.({ ...values, min: value === "Invalid Date" ? "" : value });
      } else {
        onChange?.({ min: value === "Invalid Date" ? "" : value, max: "" });
      }
    } else {
      if (values) {
        onChange?.({ ...values, max: value === "Invalid Date" ? "" : value });
      } else {
        onChange?.({ min: "", max: value === "Invalid Date" ? "" : value });
      }
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, min: boolean) => {
    const value = e.target.value;
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    if (min) {
      if (values) {
        onChange?.({ ...values, min: !value ? "" : formatter.format(Number(value)) });
      } else {
        onChange?.({ min: !value ? "" : formatter.format(Number(value)), max: "" });
      }
    } else {
      if (values) {
        onChange?.({ ...values, max: !value ? "" : formatter.format(Number(value)) });
      } else {
        onChange?.({ min: "", max: !value ? "" : formatter.format(Number(value)) });
      }
    }
  };
  return (
    <ATHOSCollapse
      onToggle={(isopen) => {
        setIsOpen(!!isopen);
      }}
      collpasedComponent={
        <div className={`${inline ? "" : "w-full"} flex gap-2 items-center overflow-hidden ${wrapperClassName}`}>
          <ATHOSInput
            {...(inputPropsMin as any)}
            value={type === "date" ? undefined : values?.min || ""}
            onChange={(e) => (type === "date" ? onChangeDate(e, true) : onChangeValue(e, true))}
          />
          <div className="w-3 h-[0.12rem] rounded-full bg-zinc-300" />
          <ATHOSInput
            {...(inputPropsMax as any)}
            value={type === "date" ? undefined : values?.max || ""}
            onChange={(e) => (type === "date" ? onChangeDate(e, false) : onChangeValue(e, false))}
          />
        </div>
      }
    >
      <div className={`w-full flex ${containerClassName}`}>
        {!thin && <Label />}
        <Selected setIsOpened={setIsOpen} isOpened={isOpen} />
      </div>
    </ATHOSCollapse>
  );
};

const ATHOSRange = (props: ATHOSRangeProps) => {
  return (
    <ATHOSRangeProvider {...props}>
      <AR {...props} />
    </ATHOSRangeProvider>
  );
};

export { ATHOSRange };
