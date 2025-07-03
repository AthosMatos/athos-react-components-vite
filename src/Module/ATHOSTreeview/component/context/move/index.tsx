import { createContext, useContext, useState } from "react";

interface ATHOSTreeviewMoveContextType {
  movingId: string | null;
  setMovingId: (id: string | null) => void;
}

const ATHOSTreeviewMoveContext = createContext<ATHOSTreeviewMoveContextType | undefined>(undefined);

const ATHOSTreeviewMoveProvider = ({ children }: { children: React.ReactNode }) => {
  const [movingId, setMovingId] = useState<string | null>(null);

  return <ATHOSTreeviewMoveContext.Provider value={{ movingId, setMovingId }}>{children}</ATHOSTreeviewMoveContext.Provider>;
};

const ATHOSTreeviewMove = () => {
  const context = useContext(ATHOSTreeviewMoveContext);
  if (!context) {
    throw new Error("useATHOSTreeview must be used within a ATHOSTreeviewProvider");
  }
  return context;
};

export { ATHOSTreeviewMove, ATHOSTreeviewMoveProvider };
