import { Active, DndContext, DragEndEvent, MeasuringStrategy, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import Crumbs from "./components/Crumbs";
import Overlay from "./components/Overlay";
import { ATHOSTreeviewPropsProvider } from "./context/props";
import { ATHOSTreeviewPropsI } from "./interfaces/props";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const ArrayMove = (array: any[], from: number, to: number) => {
  const newArray = [...array];
  const startIndex = to < 0 ? newArray.length + to : to;
  const item = newArray.splice(from, 1)[0];
  newArray.splice(startIndex, 0, item);
  return newArray;
};

export function ATHOSTreeview(props: ATHOSTreeviewPropsI) {
  const hasData = props.data.length > 0;
  const sensors = useSensors(useSensor(PointerSensor));
  const [active, setActive] = useState<Active | null>(null);
  const onDragStart = ({ active }: { active: Active }) => {
    setActive(active);
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = props.data.findIndex(({ id }) => id === active.id);
      const overIndex = props.data.findIndex(({ id }) => id === over.id);

      props.update?.(ArrayMove(props.data, activeIndex, overIndex));
    }
    setActive(null);
  };
  const onDragCancel = () => {
    setActive(null);
  };

  return (
    hasData && (
      <ATHOSTreeviewPropsProvider props={props}>
        <DndContext
          measuring={measuringConfig}
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragCancel={onDragCancel}
        >
          <SortableContext items={props.data}>
            <div className={`flex flex-col gap-1 text-black w-full ${props.styles?.generalClassName || ""}`}>
              <Crumbs data={props.data} />
            </div>
          </SortableContext>
          <Overlay activeItem={active} />
        </DndContext>
      </ATHOSTreeviewPropsProvider>
    )
  );
}
