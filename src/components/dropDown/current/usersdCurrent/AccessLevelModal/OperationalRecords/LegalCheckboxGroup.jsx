import React, { useState } from "react";
import "../CheckBox.css"

const LegalCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
      "realEstate",
      "opposite",
      "bill",
      "damages",
    ];

    const handleParentCheck = () => {
      const newState = !checkedState.legal;
  
      // Set all first stage checkboxes based on the new state
      setCheckedState((prevState) => {
        const newCheckedState = { ...prevState, legal: newState };
  
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
  
        newCheckedState.legal = !allUnchecked;
  
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
          id="legal"
          checked={checkedState.legal}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="legal" style={{ textDecoration: "underline" }}>
          امور حقوقی
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.legal && (
        <div className="ms-4 mx-4 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {[
            { key: "realEstate", label: "فهرست و اسناد املاک" },
            { key: "opposite", label: "معارض" },
            { key: "bill", label: "دادخواست/دفاعیه/رای" },
            { key: "damages", label: "خسارت و جریمه" },
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

export default LegalCheckboxGroup;
