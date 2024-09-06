import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import CheckboxGroup from "./CheckboxGroup";

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
      <div className="form-check d-flex justify-content-start align-items-center">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="performanceRecords"
          checked={checkedState.performanceRecords}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="performanceRecords">
          سوابق اجرا
        </label>
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "سوابق اجرا" */}
      {checkedState.performanceRecords && (
        <>
          {/* استفاده از CheckboxGroup به جای دو کامپوننت قبلی */}
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="damPerformance"
            parentLabel="سد"
            childCheckboxes={[
              { key: "damSpecifications", label: "مشخصات" },
              { key: "damMap", label: "نقشه ازبیلت" },
              { key: "damConsumables", label: "لوازم مصرفی" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="channelPerformance"
            parentLabel="سامانه"
            childCheckboxes={[
              { key: "channelSpecifications", label: "مشخصات" },
            { key: "channelMap", label: "نقشه ازبیلت" },
            { key: "channelConsumables", label: "لوازم مصرفی" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="pumpPerformance"
            parentLabel="ایستگاه پمپاژ"
            childCheckboxes={[
              { key: "pumpSpecifications", label: "مشخصات" },
              { key: "pumpMap", label: "نقشه ازبیلت" },
              { key: "pumpConsumables", label: "لوازم مصرفی" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="networkPerformance"
            parentLabel="شبکه"
            childCheckboxes={[
              { key: "networkSpecifications", label: "مشخصات" },
            { key: "networkMap", label: "نقشه ازبیلت" },
            { key: "networkConsumables", label: "لوازم مصرفی" },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default PerformanceRecords;
