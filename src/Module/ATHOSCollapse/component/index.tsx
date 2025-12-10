import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const CollapseTransition = {
  duration: 0.35,
  ease: "circInOut",
};

interface ATHOSCollapseProps {
  children: React.ReactNode;
  collpasedComponent: React.ReactNode;
  onToggle?: (isOpen?: boolean) => void;
  position?: "top" | "bottom" | "left" | "right";
  spacing?: number;
  initialOpen?: boolean;
  collapsedClassName?: string;
  wrapperClassName?: string;
  buttonClassName?: string;
  toggleOnWrapperClick?: boolean;
  fade?: boolean;
  hideOnClickOutside?: boolean;
  open?: boolean;
  extraButton?: React.ReactNode;
  buttonContainerClassName?: string;
  autoOpen?: boolean;
  disableClick?: boolean;
}

const variants = {
  topandbottom: {
    initial: {
      height: 0,
    },
    animate: {
      height: "auto",
    },
    exit: {
      height: 0,
    },
  },
  topandbottomWithFade: {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
    },
  },
  leftandright: {
    initial: {
      width: 0,
    },
    animate: {
      width: "auto",
    },
    exit: {
      width: 0,
    },
  },
  leftandrightWithFade: {
    initial: {
      width: 0,
      opacity: 0,
    },
    animate: {
      width: "auto",
      opacity: 1,
    },
    exit: {
      width: 0,
      opacity: 0,
    },
  },
};

export const ATHOSCollapse = ({
  children,
  collpasedComponent,
  spacing,
  position = "bottom",
  onToggle,
  initialOpen,
  collapsedClassName,
  wrapperClassName,
  buttonClassName,
  toggleOnWrapperClick,
  fade,
  hideOnClickOutside,
  extraButton,
  open: forceOpen,
  buttonContainerClassName,
  autoOpen = true,
  disableClick,
}: ATHOSCollapseProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen || false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const collapsedRef = useRef<HTMLDivElement>(null);

  const pos =
    position === "top" ? "flex-col-reverse" : position === "bottom" ? "flex-col" : position === "left" ? "flex-row-reverse" : "flex-row";

  const onClick = () => {
    if (disableClick) return;
    if (!autoOpen) return;
    if (toggleOnWrapperClick) return;
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);
    }
  };
  const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableClick) return;
    if (!autoOpen) return;

    // Handle click outside - only close if clicking directly on wrapper, not children
    if (hideOnClickOutside && e.target === e.currentTarget) {
      setIsOpen(false);
      if (onToggle) {
        onToggle(undefined);
      }
      return;
    }

    if (toggleOnWrapperClick) {
      setIsOpen(!isOpen);
      if (onToggle) {
        onToggle(!isOpen);
      }
    }
  };
  const close = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  useEffect(() => {
    if (forceOpen !== undefined) {
      setIsOpen(forceOpen);
    }
  }, [forceOpen]);

  return (
    <motion.div
      /* style={{
        width: "fit-content",
      }} */
      ref={wrapperRef}
      animate={{
        gap: isOpen ? `${spacing}px` : 0,
      }}
      onClick={onWrapperClick}
      className={`flex ${pos} ${wrapperClassName}`}
    >
      <div ref={childRef} className={buttonContainerClassName}>
        <div className={buttonClassName} onClick={onClick}>
          {children}
        </div>
        {extraButton}
      </div>

      <motion.div
        ref={collapsedRef}
        initial="initial"
        animate={isOpen ? "animate" : "initial"}
        variants={
          position === "top" || position === "bottom"
            ? fade
              ? variants.topandbottomWithFade
              : variants.topandbottom
            : fade
            ? variants.leftandrightWithFade
            : variants.leftandright
        }
        style={position === "top" || position === "bottom" ? { minWidth: "fit-content" } : { minHeight: "fit-content" }}
        className={`flex overflow-hidden`}
        transition={CollapseTransition}
      >
        <div className={`min-w-max min-h-max ${collapsedClassName}`}>{collpasedComponent}</div>
      </motion.div>

      {/* 
      MOST PERFORMANT WAY BUT SOME PROBLEMS WITH ALIGNMENT
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={position === "top" || position === "bottom" ? variants.topandbottom : variants.leftandright}
            className="flex overflow-hidden"
            transition={{
              duration: 0.35,
              ease: "circInOut",
            }}
          >
            <div className={`min-w-max min-h-max ${collapsedClassName}`}>{collpasedComponent}</div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </motion.div>
  );
};
