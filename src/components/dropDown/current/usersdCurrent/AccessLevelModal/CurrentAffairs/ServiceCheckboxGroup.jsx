import React, { useState } from "react";
import "../CheckBox.css"

const ServiceCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
      "pumpStation",
      "cleaningFacilities",
      "canalDredging",
      "serviceEquipment",
    ];

  const handleParentCheck = () => {
    const newState = !checkedState.Services;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, Services: newState };

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

      newCheckedState.Services = !allUnchecked;

      return newCheckedState;
    });
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-end align-items-center ms-4 mt-2 mx-2">
        <label className="form-check-label me-2" htmlFor="Services" style={{ textDecoration: "underline" }}>
          سرویس و نگهداری
        </label>
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="Services"
          checked={checkedState.Services}
          onChange={handleParentCheck}
        />
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.Services && (
        <div className="ms-4 mx-3 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {[
            { key: "pumpStation", label: "ایستگاه پمپاژ" },
            { key: "cleaningFacilities", label: "تمیزکاری و لایروبی تاسیسات" },
            { key: "canalDredging", label: "لایروبی سامانه" },
            { key: "serviceEquipment", label: "سرویس و تعمیر جزیی تجهیزات" },
          ].map((item) => (
            <div key={item.key} className="form-check d-flex justify-content-end align-items-center ms-4 mt-2 mx-4">
              <label className="form-check-label me-2" htmlFor={item.key}>
                {item.label}
              </label>
              <input
                className="form-check-input mx-0"
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

export default ServiceCheckboxGroup;
