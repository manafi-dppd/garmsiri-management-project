import React, { useState } from "react";
import "../CheckBox.css"

const VisitCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
      "operational",
      "authorities",
    ];

  const handleParentCheck = () => {
    const newState = !checkedState.visit;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, visit: newState };

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

      newCheckedState.visit = !allUnchecked;

      return newCheckedState;
    });
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-end align-items-center ms-4 mt-2 mx-2">
        <label className="form-check-label me-2" htmlFor="visit" style={{ textDecoration: "underline" }}>
          بازدید
        </label>
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="visit"
          checked={checkedState.visit}
          onChange={handleParentCheck}
        />
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.visit && (
        <div className="ms-4 mx-4 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {[
            { key: "operational", label: "عملیاتی" },
            { key: "authorities", label: "مقامات و مسئولین" },
          ].map((item) => (
            <div key={item.key} className="form-check d-flex justify-content-end align-items-center ms-4 mt-2 mx-2">
              <label className="form-check-label me-2" htmlFor={item.key}>
                {item.label}
              </label>
              <input
                className="form-check-input mx-2"
                type="checkbox"
                id={item.key}
                checked={checkedState[item.key]}
                onChange={() => handleChildCheck(item.key)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VisitCheckboxGroup;
