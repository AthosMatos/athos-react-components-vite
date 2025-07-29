import { useEffect } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { ATHOSDropDown } from "../../../../ATHOSDropDown/component";
import { ATHOSToast } from "../../../../ATHOSToast";
import { usePropsContext } from "../../contexts/propsContext";
import { useADTSelect } from "../../redux/Select/hook";
import ADTCheckBox from "../ADTCheckBox";
import {
  ADTATWrapper,
  ADTBRDSimple,
  ADTSRTFSWrapper,
  ADTSRTIconWrapper,
  ADTSRTLabel,
  ADTSRTMainFunc,
} from "./styled";
import useSelectors_ADTSelectedRowsToast from "./useSelectors";

const ADTSelectedRowsToast = () => {
  const {
    selectedRows,
    selectedRowsToastOpen,
    checkState,
    selectedRowsToast,
    data,
    tableName,
  } = useSelectors_ADTSelectedRowsToast();

  const { uncheckAll, openSelectedRowsToast, closeSelectedRowsToast } =
    useADTSelect();

  const onDismiss = () => {
    uncheckAll();
  };
  const containerColor =
    usePropsContext<any>().selectedRowsToast?.containerColor;

  useEffect(() => {
    if (selectedRows.length > 0) {
      openSelectedRowsToast();
    } else {
      closeSelectedRowsToast();
    }
  }, [closeSelectedRowsToast, openSelectedRowsToast, selectedRows]);

  return (
    <ATHOSToast
      position="bottom-right"
      updateState={selectedRows}
      renderCondition={selectedRowsToastOpen}
      removeCondition={selectedRows.length == 0}
      id={tableName}
    >
      <ADTATWrapper
        className={containerColor?.className}
        style={{
          // color: tableStyle?.textColor,

          ...containerColor?.style,
        }}
      >
        <ADTSRTFSWrapper>
          <ADTCheckBox
            clicable={false}
            big
            checked={checkState == 0 ? true : checkState}
          />
          <ADTSRTLabel>{selectedRows.length} Items</ADTSRTLabel>
        </ADTSRTFSWrapper>
        <ADTBRDSimple w={1} h={20} />
        <ADTSRTLabel>{tableName}</ADTSRTLabel>
        <ADTBRDSimple w={1} h={20} />

        {(selectedRowsToast?.mainFunc ||
          selectedRowsToast?.secondaryFunc ||
          selectedRowsToast?.othersFunc) && (
          <ADTSRTFSWrapper>
            {selectedRowsToast?.mainFunc && (
              <ADTSRTMainFunc
                onClick={() => {
                  selectedRowsToast.mainFunc!.onClick(
                    data.filter((row) => selectedRows.includes(row.uniqueId))
                  );
                  onDismiss();
                }}
                //highlightColor={tableStyle?.highlightColor!}
              >
                {selectedRowsToast.mainFunc.icon ??
                  selectedRowsToast.mainFunc.label}
              </ADTSRTMainFunc>
            )}
            {selectedRowsToast?.secondaryFunc && (
              <ADTSRTIconWrapper
                pad={8}
                backColor={"#f3f3f3"}
                onClick={() => {
                  onDismiss();
                  selectedRowsToast.secondaryFunc!.onClick(
                    data.filter((row) => selectedRows.includes(row.uniqueId))
                  );
                }}
              >
                {selectedRowsToast.secondaryFunc.label ??
                  selectedRowsToast.secondaryFunc.icon}
              </ADTSRTIconWrapper>
            )}

            {selectedRowsToast?.othersFunc && (
              <ATHOSDropDown
                labels={selectedRowsToast.othersFunc.map((func) => {
                  return {
                    label: func.label,
                    onClick: () => {
                      func.onClick(
                        data.filter((row) =>
                          selectedRows.includes(row.uniqueId)
                        )
                      );
                      onDismiss();
                    },
                  };
                })}
                position="top-left"
                style={{
                  /* backgroundColor: tableStyle?.accentColor || "#f3f3f3",
                  color: tableStyle?.textColor,
                  borderColor: forceOpacity(tableStyle?.textColor || "#f3f3f3", 0.3), */
                  borderWidth: 1,
                }}
              >
                <ADTSRTIconWrapper pad={8} backColor={"#f3f3f3"}>
                  <IoMenu />
                </ADTSRTIconWrapper>
              </ATHOSDropDown>
            )}
          </ADTSRTFSWrapper>
        )}
        <ADTSRTIconWrapper pad={5} backColor="#EE3131" onClick={onDismiss}>
          <IoClose color="white" />
        </ADTSRTIconWrapper>
      </ADTATWrapper>
    </ATHOSToast>
  );
};

export default ADTSelectedRowsToast;
