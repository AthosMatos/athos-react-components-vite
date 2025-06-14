import { motion } from "motion/react";
import Cols from "./components/Cols";
import { Label } from "./components/Label";
import Option from "./components/Options";
import SearchBar from "./components/SearchBar";
import Selected from "./components/Selected";
import { ATHOSSelectProvider, useATHOSSelectContext } from "./context";
import { ATHOSSelectedProps } from "./intefaces";

const AS = (props: ATHOSSelectedProps) => {
  const {
    listContainerStyle,
    disabled,
    listContainerClassName,
    search: withSearch,
    inline,
    thin,
    listWrapperClassName,
    containerClassName,
    loading,
  } = props;

  const { labels, cols, childRef, contentRef, gap, id, isOpened, pos, setIsOpened } = useATHOSSelectContext();

  return (
    <div
      className={`flex flex-col ${inline ? "" : pos} ${containerClassName} ${disabled || loading ? "pointer-events-none opacity-50" : ""}`}
      style={{ gap: `${gap}px` }}
    >
      {!thin && <Label />}
      <Selected childRef={childRef} id={id} setIsOpened={setIsOpened} isOpened={isOpened} />

      <motion.ul
        ref={contentRef}
        className={`dropdown ${inline ? "" : "w-fit"} flex overflow-auto flex-col ${listWrapperClassName}`}
        popover={!inline ? "auto" : undefined}
        id={id}
        style={
          {
            positionAnchor: !inline ? `--anchor-${id}` : undefined,
            ...gap,
          } as any
        }
        initial="closed"
        animate={isOpened ? "open" : "closed"}
        variants={{
          closed: {
            height: 0,
          },
          open: {
            height: "auto",
          },
        }}
      >
        {withSearch && <SearchBar />}
        <ul
          className={`flex flex-col rounded-box ${inline ? "" : "w-full"} ${listContainerClassName}`}
          style={{
            ...listContainerStyle,
          }}
        >
          {labels ? <Option {...(props as any)} /> : cols ? <Cols {...(props as any)} /> : null}
        </ul>
      </motion.ul>
    </div>
  );
};

const ATHOSSelect = (props: ATHOSSelectedProps) => {
  return (
    <ATHOSSelectProvider {...props}>
      <AS {...props} />
    </ATHOSSelectProvider>
  );
};

export { ATHOSSelect };
