import React from "react";
import "../CheckBox.css";

const PumpPerformanceCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
    "pumpSpecifications",
    "pumpMap",
    "pumpConsumables",
  ];

  const handleParentCheck = () => {
    const newState = !checkedState.pumpPerformance;

    // Set all child checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, pumpPerformance: newState };

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

      newCheckedState.pumpPerformance = !allUnchecked;

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
          id="pumpPerformance"
          checked={checkedState.pumpPerformance}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="pumpPerformance"
          style={{ textDecoration: "underline" }}
        >
          ایستگاه پمپاژ
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.pumpPerformance && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "pumpSpecifications", label: "مشخصات" },
            { key: "pumpMap", label: "نقشه ازبیلت" },
            { key: "pumpConsumables", label: "لوازم مصرفی" },
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

export default PumpPerformanceCheckboxGroup;
