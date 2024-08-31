import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import FirstStageCheckboxGroup from "./StudiesRecords/FirstStageCheckboxGroup";
import SecondStageCheckboxGroup from "./StudiesRecords/SecondStageCheckboxGroup";

const StudiesRecords = ({ checkedState, setCheckedState }) => {
  const handleParentCheck = () => {
    const newState = !checkedState.studiesRecords;

    // Set all checkboxes based on the new state
    setCheckedState((prevState) => ({
      ...prevState,
      studiesRecords: newState,
      firstStage: newState,
      secondStage: newState,
      geology: newState,
      soilScience: newState,
      meteorology: newState,
      environment: newState,
      sociology: newState,
      agriculture: newState,
      irrigationDrainage: newState,
      economy: newState,
      dam: newState,
      channel: newState,
      pumping: newState,
      irrigationNetworks: newState,
    }));
  };

  const checkParentStatus = () => {
    // بررسی وضعیت هر دو چک‌باکس مرحله اول و دوم
    setCheckedState((prevState) => ({
      ...prevState,
      studiesRecords: prevState.firstStage || prevState.secondStage,
    }));
  };

  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-end align-items-center">
        <label className="form-check-label me-2" htmlFor="studiesRecords">
          سوابق مطالعات
        </label>
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="studiesRecords"
          checked={checkedState.studiesRecords}
          onChange={handleParentCheck}
        />
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "سوابق مطالعات" */}
      {checkedState.studiesRecords && (
        <>
          <FirstStageCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <SecondStageCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
        </>
      )}
    </div>
  );
};

export default StudiesRecords;
