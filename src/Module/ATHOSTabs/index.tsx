import { configureStore } from "@reduxjs/toolkit";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import ATBody from "./components/Body";
import { ATTab, ATTabOverlay } from "./components/Tab";
import { transition } from "./consts";
import { ATHOSTabsProps } from "./interfaces";
import BodyDirReducer from "./redux/BodyDir";
import ATHOSTabsPropsReducer, { setProps } from "./redux/Props";
import ActiveTabDimReducer from "./redux/TabDim";

const AT = (props: ATHOSTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProps(props));
  }, [dispatch, props]);
  return (
    <motion.div
      className="flex flex-col"
      transition={transition}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      style={{
        gap: props.gap,
      }}
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-wrap">
          {props.tabs.map((tab, index) => (
            <ATTab
              key={index}
              label={tab.title.value}
              active={() => setActiveTab(index)}
              isActive={activeTab === index}
              className={tab.title.className}
              style={tab.title.style}
            />
          ))}
          {props.tabs.length > 0 && <ATTabOverlay />}
        </div>
        {props.addTab && (
          <ATTab
            label={props.addTab.icon}
            active={() => props.addTab?.onClick?.()}
            isActive={false}
            className={{ default: props.addTab.className }}
            isExtra
          />
        )}
      </div>
      {props.tabs.length > 0 && (
        <ATBody gap={props.gap} activeTab={activeTab} />
      )}
    </motion.div>
  );
};

export const ATHOSTabs = (props: ATHOSTabsProps) => {
  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          ActiveTabDimReducer,
          ATHOSTabsPropsReducer,
          BodyDirReducer,
        },
      }),
    []
  );
  return (
    <Provider store={store}>
      <AT {...props} />
    </Provider>
  );
};
