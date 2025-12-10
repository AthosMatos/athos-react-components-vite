import { Provider, createStore } from "jotai";
import { animate } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { selectedIndexAtom, switcherPropsAtom } from "./atoms";
import { useInitializeSwitcher, useSelectedIndex } from "./hooks";
import type { ATHOSSwitcherProps } from "./interfaces";
import { Floating, Switch } from "./Switch";

const SwitcherContent = (props: ATHOSSwitcherProps) => {
  const { switchs, style, className } = props;
  const { initialize } = useInitializeSwitcher(props);
  const { selectedIndex } = useSelectedIndex();

  const switchDims = useRef<{ width: number; height: number }[]>([]);
  const floatingRef = useRef<HTMLDivElement>(null);

  // Initialize props and selected index on mount and when props change
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Handle resize to update floating indicator position
  const onResize = useCallback(() => {
    const floating = floatingRef.current;
    if (!floating) return;

    let currentSwitchElement: HTMLElement | null = null;

    // Measure all switches and find the current one
    switchs.forEach((sw, i) => {
      const switchElement = document.getElementById(`${sw.id}-${i}`);
      if (!switchElement) return;

      const dims = switchElement.getBoundingClientRect();
      switchDims.current[i] = { width: dims.width, height: dims.height };

      if (i === selectedIndex) {
        currentSwitchElement = switchElement;
      }
    });

    if (!currentSwitchElement) return;

    const dims = (currentSwitchElement as HTMLElement).getBoundingClientRect();
    const { width, height } = dims;

    // Calculate position
    const padding = "0.2rem";
    const gap = `(0.5rem * ${selectedIndex})`;
    const totalPreviousWidth = switchs.reduce((acc, _, i) => {
      if (i < selectedIndex && switchDims.current[i]) {
        return acc + switchDims.current[i].width;
      }
      return acc;
    }, 0);

    floating.style.setProperty("width", `${width}px`);
    floating.style.setProperty("height", `${height}px`);
    floating.style.setProperty("left", `calc(${padding} + ${gap} + ${totalPreviousWidth}px)`);
  }, [selectedIndex, switchs]);

  // Animate floating indicator when selection changes
  useEffect(() => {
    const selectedSwitch = switchs[selectedIndex];
    if (!selectedSwitch) return;

    const selectedElement = document.getElementById(`${selectedSwitch.id}-${selectedIndex}`);
    const floating = floatingRef.current;

    if (selectedElement && floating) {
      const dims = selectedElement.getBoundingClientRect();
      const { width, height } = dims;

      const padding = "0.2rem";
      const gap = `(0.5rem * ${selectedIndex})`;
      const totalPreviousWidth = switchs.reduce((acc, _, i) => {
        if (i < selectedIndex && switchDims.current[i]) {
          return acc + switchDims.current[i].width;
        }
        return acc;
      }, 0);

      animate(floating, {
        width,
        height,
        left: `calc(${padding} + ${gap} + ${totalPreviousWidth}px)`,
      });
    }

    // Initial resize and setup listeners
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("focus", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("focus", onResize);
    };
  }, [selectedIndex, switchs, onResize]);

  return (
    <div style={style?.container} className={`${className?.container || ""} relative flex gap-2 p-[0.2rem] rounded-xl`}>
      <Floating aRef={floatingRef} dftClassName={className?.switches} dftStyle={style?.switches} />
      {switchs.map((sw, i) => (
        <Switch key={sw.id || i} index={i} dftClassName={className?.switches} dftStyle={style?.switches} {...sw} />
      ))}
    </div>
  );
};

/**
 * ATHOSSwitcher - A switcher component with animated floating indicator
 *
 * Uses Jotai for state management with isolated stores per instance
 */
const ATHOSSwitcher = (props: ATHOSSwitcherProps) => {
  // Create isolated store for each switcher instance
  const store = useMemo(() => {
    const newStore = createStore();
    // Initialize with props
    newStore.set(switcherPropsAtom, props);
    if (props.selectedId) {
      const selectedIndex = props.switchs.findIndex((sw) => sw.id === props.selectedId);
      if (selectedIndex !== -1) {
        newStore.set(selectedIndexAtom, selectedIndex);
      }
    }
    return newStore;
  }, []);

  return (
    <Provider store={store}>
      <SwitcherContent {...props} />
    </Provider>
  );
};

export { ATHOSSwitcher };
