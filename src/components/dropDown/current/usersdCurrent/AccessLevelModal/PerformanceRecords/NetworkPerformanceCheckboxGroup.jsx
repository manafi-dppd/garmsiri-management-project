import React from "react";
import "../CheckBox.css";

const NetworkPerformanceCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
    "networkSpecifications",
    "networkMap",
    "networkConsumables",
  ];

  const handleParentCheck = () => {
    const newState = !checkedState.networkPerformance;

    // Set all child checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, networkPerformance: newState };

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

      newCheckedState.networkPerformance = !allUnchecked;

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
          id="networkPerformance"
          checked={checkedState.networkPerformance}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="networkPerformance"
          style={{ textDecoration: "underline" }}
        >
          شبکه
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.networkPerformance && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "networkSpecifications", label: "مشخصات" },
            { key: "networkMap", label: "نقشه‌های ازبیلت" },
            { key: "networkConsumables", label: "لوازم مصرفی" },
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

export default NetworkPerformanceCheckboxGroup;
