import React, { useState } from "react";
import "../CheckBox.css"

const ServiceRecordsCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
      "serviceOperation",
      "serviceManpowerMachinery",
      "serviceConsumables",
      "serviceCosts",
      "serviceDashboard",
    ];

    const handleParentCheck = () => {
      const newState = !checkedState.serviceRecords;
  
      // Set all first stage checkboxes based on the new state
      setCheckedState((prevState) => {
        const newCheckedState = { ...prevState, serviceRecords: newState };
  
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
  
        newCheckedState.serviceRecords = !allUnchecked;
  
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
          id="serviceRecords"
          checked={checkedState.serviceRecords}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="serviceRecords" style={{ textDecoration: "underline" }}>
          سرویس و نگهداری
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.serviceRecords && (
        <div className="ms-4 mx-4 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {[
            { key: "serviceOperation", label: "عملیات" },
            { key: "serviceManpowerMachinery", label: "نیروی انسانی و ماشین‌آلات" },
            { key: "serviceConsumables", label: "لوازم مصرفی" },
            { key: "serviceCosts", label: "هزینه‌ها" },
            { key: "serviceDashboard", label: "داشبورد" },
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

export default ServiceRecordsCheckboxGroup;
