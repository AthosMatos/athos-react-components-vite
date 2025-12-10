import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ATHOSModalProps } from "./interfaces";

export const ATHOSModal = (props: ATHOSModalProps) => {
  const { children, show, hide, backdrop = "rgba(255, 255, 255, 0.5)", blur = "sm" } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle backdrop click - only close if clicking directly on backdrop, not content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger if the click target is the backdrop itself (not a child)
    if (e.target === e.currentTarget && hide) {
      hide();
    }
  };

  const blurStyle =
    blur === "none"
      ? undefined
      : `blur(${
          blur === "sm"
            ? "4px"
            : blur === "md"
            ? "12px"
            : blur === "lg"
            ? "16px"
            : blur === "xl"
            ? "24px"
            : blur === "2xl"
            ? "40px"
            : "64px"
        })`;

  // Don't render on server
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          style={{
            backgroundColor: backdrop,
            backdropFilter: blurStyle,
            WebkitBackdropFilter: blurStyle,
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <div className={`w-fit h-fit ${props.className}`} ref={contentRef}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
