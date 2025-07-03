import { createContext, useContext, useState } from "react";

interface ATHOSTreeviewAddContextType {
  addingToParent: string | null;
  setAddingToParent: (id: string | null) => void;
}

const ATHOSTreeviewAddContext = createContext<ATHOSTreeviewAddContextType | undefined>(undefined);

const ATHOSTreeviewAddProvider = ({ children }: { children: React.ReactNode }) => {
  const [addingToParent, setAddingToParent] = useState<string | null>(null);
  return <ATHOSTreeviewAddContext.Provider value={{ addingToParent, setAddingToParent }}>{children}</ATHOSTreeviewAddContext.Provider>;
};

const ATHOSTreeviewAdd = () => {
  const context = useContext(ATHOSTreeviewAddContext);
  if (!context) {
    throw new Error("useATHOSTreeview must be used within a ATHOSTreeviewProvider");
  }
  return context;
};

export { ATHOSTreeviewAdd, ATHOSTreeviewAddProvider };
