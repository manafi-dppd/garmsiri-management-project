import React, { useState } from "react";
import "../CheckBox.css"

const AccountingCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
      "damBalance",
      "channelBalance",
      "recordsIrrigationCalendar",
      "irrigationProgram",
      "waterDelivery",
      "rain",
      "dashboard",
      "deliveryMinutes",
    ];

    const handleParentCheck = () => {
      const newState = !checkedState.accounting;
  
      // Set all first stage checkboxes based on the new state
      setCheckedState((prevState) => {
        const newCheckedState = { ...prevState, accounting: newState };
  
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
  
        newCheckedState.accounting = !allUnchecked;
  
        return newCheckedState;
      });
      checkParentStatus();
    };

  return (
    <>
      <div className="form-check d-flex justify-content-end align-items-center ms-4 mt-2 mx-2">
        <label className="form-check-label me-2" htmlFor="accounting" style={{ textDecoration: "underline" }}>
          حسابداری آب
        </label>
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="accounting"
          checked={checkedState.accounting}
          onChange={handleParentCheck}
        />
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.accounting && (
        <div className="ms-4 mx-4 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {[
            { key: "damBalance", label: "بیلان سد" },
            { key: "channelBalance", label: "بیلان سامانه" },
            { key: "recordsIrrigationCalendar", label: "تقویم آبیاری" },
            { key: "irrigationProgram", label: "برنامه آبیاری" },
            { key: "waterDelivery", label: "تحویل آب" },
            { key: "rain", label: "بارندگی" },
            { key: "dashboard", label: "داشبورد" },
            { key: "deliveryMinutes", label: "صورتجلسات تحویل آب" },
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

export default AccountingCheckboxGroup;
