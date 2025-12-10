import { configureStore } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { usePopUp } from "../../hooks/private/usePopUp";
import HeightAnimDiv from "./components/HeightAnimDiv";
import type { ATHOSMenuProps, OptionProps } from "./interfaces";
import AMPropsReducer, { fillProps } from "./redux/Props";
import AMSelectedReducer, { type OptSTypes, selectData, selectOption, selectSubOption, selectSubSubOption } from "./redux/Selected";
import type { AMState } from "./redux/store";
import Menu from "./sections/Menu";
import Selected from "./sections/Selected";

const AM = (props: ATHOSMenuProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fillProps(props));
  }, [dispatch, props]);

  const [init, setInit] = useState(false);

  if (props.navigate) {
    const options = props.options;
    const reduxoptions = useSelector((state: AMState) => state.AMPropsReducer.options);
    const location = props.navigate.useLocation();

    const SetSelected = (opt: OptionProps, id: string, type: OptSTypes) => {
      setInit(true);
      dispatch(selectData(opt));
      opt.onInit && opt.onInit();
      switch (type) {
        case "opt":
          dispatch(selectOption(id));
          break;
        case "subopt":
          dispatch(selectSubOption(id));
          break;
        case "subsubopt":
          dispatch(selectSubSubOption(id));
          break;
      }
    };

    useEffect(() => {
      if (!options.length || init || !location.pathname) return;
      const path = location.pathname as string;
      //console.log("path", path);
      let stop = false;
      options.forEach((opt, index) => {
        if (opt.path && path.endsWith(opt.path) && !stop) {
          //stop here
          SetSelected(opt, index.toString(), "opt");
          stop = true;
          return;
        }
      });
      if (stop) return;

      options.forEach((opt, index) => {
        if (!opt.subOpts || stop) return;
        return opt.subOpts.forEach((subopt, subindex) => {
          if (subopt.path && path.endsWith(subopt.path) && !stop) {
            SetSelected(opt, index.toString(), "opt");
            SetSelected(subopt, `${index}-${subindex}`, "subopt");
            stop = true;
            return;
          }
        });
      });

      if (stop) return;

      options.forEach((opt, index) => {
        if (!opt.subOpts || stop) return;
        opt.subOpts.forEach((subopt, subindex) => {
          if (!subopt.subSubOpts || stop) return;
          subopt.subSubOpts.forEach((subsubopt, subsubindex) => {
            if (subsubopt.path && path.endsWith(subsubopt.path) && !stop) {
              SetSelected(opt, index.toString(), "opt");
              SetSelected(subopt, `${index}-${subindex}`, "subopt");
              SetSelected(subsubopt, `${index}-${subindex}-${subsubindex}`, "subsubopt");
              stop = true;
              return;
            }
          });
        });
      });
    }, [location, options, init, SetSelected]);

    useEffect(() => {
      if (options != reduxoptions) {
        setInit(false);
      }
    }, [options, reduxoptions]);
  }

  const { childRef, contentRef, isOpened, setIsOpened } = usePopUp({
    //onToggle: () => setOpen(!open),
    // matchChildrenWidth: true,
    position: props.menuDirection,
  });

  return (
    <div className="select-none leading-tight w-full">
      <div className="relative">
        <Selected aRef={childRef} click={() => setIsOpened(!isOpened)} />
        <HeightAnimDiv
          style={{
            [props.menuDirection?.startsWith("top") ? "bottom" : "top"]: childRef.current
              ? `${childRef.current.offsetHeight + (props.spacing || 0)}px`
              : "0px",
          }}
          Bref={contentRef}
          className="w-full absolute z-[999]"
          show={isOpened}
        >
          <Menu />
        </HeightAnimDiv>
      </div>
    </div>
  );
};
export const ATHOSMenu = (props: ATHOSMenuProps) => {
  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          AMPropsReducer,
          AMSelectedReducer,
        },
      }),
    []
  );
  return (
    <Provider store={store}>
      <AM {...props} />
    </Provider>
  );
};
