import { FaHouse } from "react-icons/fa6";
import { ATHOSBreadcrumbs } from "../component";

const subTitle = "Terça - feira, 10 de Outubro de 2023 - 14:30";
const crumbs = [
  {
    crumb: <FaHouse />,
  },

  {
    crumb: "Gerenciamento",
    dropdown: [
      {
        label: "Dashboard do Procurador",
        value: 0,
        path: "/athos/dashboard",
        onClick: () => {
          console.log("Dashboard do Procurador clicked");
        },
      },
      {
        label: "Dashboard RPV",
        value: 1,
        path: "/athos/dashboard/rpv",
        onClick: () => {
          console.log("Dashboard RPV clicked");
        },
      },
    ],
  },
];
const ATHOSBreadcrumbsPage = () => {
  return (
    <div>
      <ATHOSBreadcrumbs crumbs={crumbs} subTitle={subTitle} />
    </div>
  );
};

export default ATHOSBreadcrumbsPage;
