import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch } from "../../../../redux/Filtering/provider";
import { ADTState } from "../../../../redux/store";
import { IconWrapper } from "../../styledWrappers";

interface SInputProps {
  onChange: (event: any) => void;
  wRef?: any;
}

const SInput = ({ onChange, wRef }: SInputProps) => {
  const searchFilter = useSelector((state: ADTState) => state.ADTFilteringReducer.searchFilter);
  return (
    <motion.input
      value={searchFilter}
      ref={wRef}
      placeholder="Search"
      onChange={onChange}
      className={`rounded-lg transition-colors outline-none h-9 max-w-[300px] 
        bg-transparent 
         dark:focus:bg-zinc-800
         border
        border-zinc-200 dark:border-zinc-600 focus:border-zinc-400`}
      initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 }}
      animate={{
        width: "clamp(100px,66%,300px)",
        opacity: 1,
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
      exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 }}
      transition={{
        duration: 0.53,
        ease: "easeOut",
      }}
    />
  );
};

export const ADTSearch = memo(() => {
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openSearch) {
      inputRef.current?.focus();
    }
  }, [openSearch]);

  return (
    <>
      <AnimatePresence>
        {openSearch && <SInput wRef={inputRef} onChange={(event) => dispatch(filterBySearch(event.target.value))} />}
      </AnimatePresence>
      <IconWrapper open={openSearch} onClick={toggleSearch}>
        <FaSearch className="text-base" />
      </IconWrapper>
    </>
  );
});

ADTSearch.displayName = "ADTSearch";
