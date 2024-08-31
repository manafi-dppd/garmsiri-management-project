import React from "react";
import "../CheckBox.css";

const SecondStageCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
    "dam",
    "channel",
    "pumping",
    "irrigationNetworks",
  ];

  const handleParentCheck = () => {
    const newState = !checkedState.secondStage;

    // Set all second stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, secondStage: newState };

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
      const allUnchecked = childCheckboxes.every((checkbox) => !newCheckedState[checkbox]);

      newCheckedState.secondStage = !allUnchecked;

      return newCheckedState;
    });

    // Check parent status after updating
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-start align-items-center ms-4 mt-2 mx-2">
        
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="secondStage"
          checked={checkedState.secondStage}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="secondStage"
          style={{ textDecoration: "underline" }}
        >
          مرحله دوم
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.secondStage && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "dam", label: "سد" },
            { key: "channel", label: "سامانه" },
            { key: "pumping", label: "ایستگاه‌های پمپاژ" },
            { key: "irrigationNetworks", label: "شبکه‌های آبیاری" },
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

export default SecondStageCheckboxGroup;
