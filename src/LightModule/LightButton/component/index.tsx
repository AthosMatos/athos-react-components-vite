/* 

 <button className="px-4 py-2 bg-mBrown text-white rounded-lg hover:bg-mBrown/80 transition-all">
          Salvar Alterações
        </button>
        <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all">
          Excluir Produto
        </button>
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all">
          Visualizar Produto
        </button>
        <button className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-all">
          Criar Novo
        </button>

*/

export type ButtonType = "primary" | "secondary" | "danger" | "warning" | "info" | "default" | "primary2";
interface LightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttontype?: ButtonType;
}

const LightButton = ({ children, className, ...props }: LightButtonProps) => {
  let buttonClass = "";

  switch (props.buttontype) {
    case "primary":
      buttonClass = "bg-[#4563E6] ";
      break;
    case "primary2":
      buttonClass = "bg-[#B158C5] ";
      break;
    case "secondary":
      buttonClass = "bg-gray-500 ";
      break;
    case "danger":
      buttonClass = "bg-[#D76767] ";
      break;
    case "warning":
      buttonClass = "bg-yellow-500 ";
      break;
    case "info":
      buttonClass = "bg-teal-500";
      break;
    default:
      buttonClass = "hover:bg-gray-200";
  }

  return (
    <button className={`px-5 py-[6px] cursor-pointer font-semibold rounded-[9px] transition-all ${buttonClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default LightButton;
