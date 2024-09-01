import React, { useState } from "react";
import "../CheckBox.css"

const RepairsCheckboxGroup = ({ checkedState, setCheckedState , checkParentStatus }) => {
  const childCheckboxes = [
      "operation",
      "manpowerMachinery",
      "consumables",
      "repairCosts",
      "repairsDashboard",
    ];

    const handleParentCheck = () => {
      const newState = !checkedState.repairs;
  
      // Set all first stage checkboxes based on the new state
      setCheckedState((prevState) => {
        const newCheckedState = { ...prevState, repairs: newState };
  
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
  
        newCheckedState.repairs = !allUnchecked;
  
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
          id="repairs"
          checked={checkedState.repairs}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="repairs" style={{ textDecoration: "underline" }}>
          تعمیرات
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.repairs && (
        <div className="ms-4 mx-4 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {[
            { key: "operation", label: "عملیات" },
            { key: "manpowerMachinery", label: "نیروی انسانی و ماشین‌آلات" },
            { key: "consumables", label: "لوازم مصرفی" },
            { key: "repairCosts", label: "هزینه‌ها" },
            { key: "repairsDashboard", label: "داشبورد" },
          ].map((item) => (
            <div key={item.key} className="form-check d-flex justify-content-start align-items-center ms-4 mx-2">
              
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

export default RepairsCheckboxGroup;
