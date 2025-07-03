import { createContext, useContext, useState } from "react";

interface ATHOSTreeviewFuncsContextType {
  funcOpenId: string | null;
  setFuncOpenId: (id: string | null) => void;
}

const ATHOSTreeviewFuncsContext = createContext<ATHOSTreeviewFuncsContextType | undefined>(undefined);

const ATHOSTreeviewFuncsProvider = ({ children }: { children: React.ReactNode }) => {
  const [funcOpenId, setFuncOpenId] = useState<string | null>(null);
  return <ATHOSTreeviewFuncsContext.Provider value={{ funcOpenId, setFuncOpenId }}>{children}</ATHOSTreeviewFuncsContext.Provider>;
};

const ATHOSTreeviewFuncs = () => {
  const context = useContext(ATHOSTreeviewFuncsContext);
  if (!context) {
    throw new Error("useATHOSTreeview must be used within a ATHOSTreeviewProvider");
  }
  return context;
};

export { ATHOSTreeviewFuncs, ATHOSTreeviewFuncsProvider };
