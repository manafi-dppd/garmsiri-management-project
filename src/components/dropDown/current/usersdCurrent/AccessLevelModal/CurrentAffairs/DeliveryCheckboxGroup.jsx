import React, { useState } from "react";
import "../CheckBox.css";

const DeliveryCheckboxGroup = ({
  checkedState,
  setCheckedState,
  checkParentStatus,
}) => {
  const childCheckboxes = [
    "damValve",
    "channelValve",
    "waterLevel",
    "gravityFlowmeter",
    "pumpingFlowmeter",
    "meterNumber",
    "deliveryMinutes",
  ];

  const handleParentCheck = () => {
    const newState = !checkedState.delivery;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, delivery: newState };

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

      newCheckedState.delivery = !allUnchecked;

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
          id="delivery"
          checked={checkedState.delivery}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="delivery"
          style={{ textDecoration: "underline" }}
        >
          تحویل آب
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.delivery && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "damValve", label: "مانور دریچه‌های سد" },
            {
              key: "channelValve",
              label: "مانور دریچه‌ها و شیرآلات سامانه و مخازن",
            },
            { key: "waterLevel", label: "رقوم سطح آب نقاط تحویل" },
            { key: "gravityFlowmeter", label: "رقوم فلومتر نقاط تحویل ثقلی" },
            { key: "pumpingFlowmeter", label: "رقوم فلومتر ایستگاه‌های پمپاژ" },
            { key: "meterNumber", label: "رقوم کنتور مزارع" },
            { key: "deliveryMinutes", label: "صورتجلسه تحویل" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mt-2 mx-4"
            >
              
              <input
                className="form-check-input mx-1"
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

export default DeliveryCheckboxGroup;
