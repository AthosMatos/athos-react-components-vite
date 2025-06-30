import { createContext, useContext } from "react";
import { ATHOSTreeviewPropsI } from "../../interfaces/props";

const ATHOSTreeviewContext = createContext({} as ATHOSTreeviewPropsI);

const ATHOSTreeviewPropsProvider = ({ children, props }: { children: React.ReactNode; props: ATHOSTreeviewPropsI }) => {
  return <ATHOSTreeviewContext.Provider value={props}>{children}</ATHOSTreeviewContext.Provider>;
};

const ATHOSTreeviewProps = () => {
  const context = useContext(ATHOSTreeviewContext);
  if (!context) {
    throw new Error("useATHOSTreeview must be used within a ATHOSTreeviewProvider");
  }
  return context;
};

export { ATHOSTreeviewProps, ATHOSTreeviewPropsProvider };
