import React, { useState } from "react";
import "../CheckBox.css";

const RepairCheckboxGroup = ({
  checkedState,
  setCheckedState,
  checkParentStatus,
}) => {
  const childCheckboxes = [
    "damChannel",
    "pumpingStation",
    "repairIrrigationNetwork",
  ];

  const handleParentCheck = () => {
    const newState = !checkedState.repair;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, repair: newState };

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

      newCheckedState.repair = !allUnchecked;

      return newCheckedState;
    });
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-start align-items-center ms-4 mt-2 mx-2">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="repair"
          checked={checkedState.repair}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="repair"
          style={{ textDecoration: "underline" }}
        >
          تعمیر
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.repair && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.85rem" }}
        >
          {[
            { key: "damChannel", label: "سد و سامانه" },
            { key: "pumpingStation", label: "ایستگاه پمپاژ" },
            { key: "repairIrrigationNetwork", label: "شبکه‌های آبیاری" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mt-2 mx-2"
            >
              
              <input
                className="form-check-input mx-2"
                type="checkbox"
                id={item.key}
                checked={checkedState[item.key]}
                onChange={() => handleChildCheck(item.key)}
              />
              <label className="form-check-label me-2" htmlFor={item.key}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RepairCheckboxGroup;
