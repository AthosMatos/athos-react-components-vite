import { motion } from "motion/react";
import { usePropsContext } from "../../contexts/propsContext";

const duration = 1;
const ADTLoadingBar = () => {
  const { loading } = usePropsContext();
  return (
    <motion.div
      transition={{
        duration,
      }}
      exit={{
        opacity: 0,
      }}
      className="w-full relative text-black bg-black items-center h-5 flex justify-center p-[0.05rem] rounded-full"
    >
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: "100%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundColor: "red",
        }}
        className="w-0 h-full rounded-full absolute"
      />
      <p className="z-10 font-light text-sm">
        {typeof loading === "string" ? loading : "Carregando..."}
      </p>
    </motion.div>
  );
};

export default ADTLoadingBar;
