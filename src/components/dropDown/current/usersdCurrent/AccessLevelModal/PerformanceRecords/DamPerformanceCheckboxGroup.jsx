import React from "react";
import "../CheckBox.css";

const DamPerformanceCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = ["damSpecifications", "damMap", "damConsumables"];

  const handleParentCheck = () => {
    const newState = !checkedState.damPerformance;

    // Set all child checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, damPerformance: newState };

      childCheckboxes.forEach((checkbox) => {
        newCheckedState[checkbox] = newState;
      });

      return newCheckedState;
    });
    checkParentStatus();
  };

  const handleChildCheck = (child) => {
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, [child]: !prevState[child] };

      // Check if all children are unchecked and update parent checkbox
      const allUnchecked = childCheckboxes.every(
        (checkbox) => !newCheckedState[checkbox]
      );

      newCheckedState.damPerformance = !allUnchecked;

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
          id="damPerformance"
          checked={checkedState.damPerformance}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="damPerformance"
          style={{ textDecoration: "underline" }}
        >
          سد
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.damPerformance && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "damSpecifications", label: "مشخصات" },
            { key: "damMap", label: "نقشه ازبیلت" },
            { key: "damConsumables", label: "لوازم مصرفی" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mx-2"
            >
              
              <input
                className="form-check-input mx-2"
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

export default DamPerformanceCheckboxGroup;
