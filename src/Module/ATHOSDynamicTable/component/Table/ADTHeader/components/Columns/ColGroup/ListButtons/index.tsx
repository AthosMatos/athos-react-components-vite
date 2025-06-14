import { motion } from "motion/react";

const ListButtons = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className: string }) => {
  return (
    <motion.div layout="position" onClick={onClick} className={`${className} !transition-colors`}>
      {children}
    </motion.div>
  );
};

export default ListButtons;
