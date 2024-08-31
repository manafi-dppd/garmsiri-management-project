import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import DamPerformanceCheckboxGroup from "./PerformanceRecords/DamPerformanceCheckboxGroup";
import ChannelPerformanceCheckboxGroup from "./PerformanceRecords/ChannelPerformanceCheckboxGroup";
import PumpPerformanceCheckboxGroup from "./PerformanceRecords/PumpPerformanceCheckboxGroup";
import NetworkPerformanceCheckboxGroup from "./PerformanceRecords/NetworkPerformanceCheckboxGroup";

const PerformanceRecords = ({ checkedState, setCheckedState }) => {
  const handleParentCheck = () => {
    const newState = !checkedState.performanceRecords;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => ({
      ...prevState,
      performanceRecords: newState,
      damPerformance: newState,
      channelPerformance: newState,
      pumpPerformance: newState,
      networkPerformance: newState,
      // همچنین تمامی زیرمجموعه‌ها را فعال/غیرفعال کنید
      damSpecifications: newState,
      damMap: newState,
      damConsumables: newState,
      channelSpecifications: newState,
      channelMap: newState,
      channelConsumables: newState,
      pumpSpecifications: newState,
      pumpMap: newState,
      pumpConsumables: newState,
      networkSpecifications: newState,
      networkMap: newState,
      networkConsumables: newState,
    }));
  };

  const checkParentStatus = () => {
    // بررسی وضعیت چک‌باکسها
    setCheckedState((prevState) => ({
      ...prevState,
      performanceRecords:
        prevState.damPerformance ||
        prevState.channelPerformance ||
        prevState.pumpPerformance ||
        prevState.networkPerformance,
    }));
  };

  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-end align-items-center">
        <label className="form-check-label me-2" htmlFor="performanceRecords">
          سوابق اجرا
        </label>
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="performanceRecords"
          checked={checkedState.performanceRecords}
          onChange={handleParentCheck}
        />
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "سوابق اجرا" */}
      {checkedState.performanceRecords && (
        <>
          <DamPerformanceCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <ChannelPerformanceCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <PumpPerformanceCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <NetworkPerformanceCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
        </>
      )}
    </div>
  );
};

export default PerformanceRecords;
