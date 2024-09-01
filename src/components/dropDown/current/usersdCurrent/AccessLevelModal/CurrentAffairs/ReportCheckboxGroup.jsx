import React, { useState } from "react";
import "../CheckBox.css";

const ReportCheckboxGroup = ({
  checkedState,
  setCheckedState,
  checkParentStatus,
}) => {
  const childCheckboxes = ["periodic", "case", "pumpingMoment", "dailyPumping"];

  const handleParentCheck = () => {
    const newState = !checkedState.report;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, report: newState };

      // Update all child checkboxes based on parent checkbox state
      childCheckboxes.forEach((checkbox) => {
        newCheckedState[checkbox] = newState;
      });

      return newCheckedState;
    });

    // Check parent status after updating
    checkParentStatus();
  };

  const handleChildCheck = (child) => {
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, [child]: !prevState[child] };

      // Check if all children are unchecked and update parent checkbox
      const allUnchecked = childCheckboxes.every(
        (checkbox) => !newCheckedState[checkbox]
      );

      newCheckedState.report = !allUnchecked;

      return newCheckedState;
    });
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-start align-items-center ms-4 mx-2">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="report"
          checked={checkedState.report}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label"
          htmlFor="report"
          style={{ textDecoration: "underline" }}
        >
          گزارش
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.report && (
        <div
          className="ms-4 mx-3 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "periodic", label: "دوره‌ای" },
            { key: "case", label: "موردی" },
            { key: "pumpingMoment", label: "لحظه‌ای پمپاژ" },
            { key: "dailyPumping", label: "روزانه پمپاژ" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mx-2"
            >
              
              <input
                className="form-check-input mx-1"
                type="checkbox"
                id={item.key}
                checked={checkedState[item.key]}
                onChange={() => handleChildCheck(item.key)}
              />
              <label className="form-check-label" htmlFor={item.key}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReportCheckboxGroup;
