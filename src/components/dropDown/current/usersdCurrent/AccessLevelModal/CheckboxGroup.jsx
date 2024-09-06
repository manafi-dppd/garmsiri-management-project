// CheckboxGroup.js
import React from "react";
import "./CheckBox.css";

const CheckboxGroup = ({
  checkedState,
  setCheckedState,
  checkParentStatus,
  parentKey,
  parentLabel,
  childCheckboxes,
}) => {
  const handleParentCheck = () => {
    const newState = !checkedState[parentKey];

    // به روز رسانی وضعیت والد و فرزندها
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, [parentKey]: newState };

      // به‌روزرسانی تمام چک‌باکس‌های فرزند بر اساس وضعیت جدید والد
      childCheckboxes.forEach((checkbox) => {
        newCheckedState[checkbox.key] = newState;
      });

      return newCheckedState;
    });

    // بررسی وضعیت والد بعد از بروزرسانی
    checkParentStatus();
  };

  const handleChildCheck = (childKey) => {
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, [childKey]: !prevState[childKey] };

      // اگر همه چک‌باکس‌های فرزند غیرفعال بودند، والد نیز غیرفعال می‌شود
      const allUnchecked = childCheckboxes.every(
        (checkbox) => !newCheckedState[checkbox.key]
      );

      newCheckedState[parentKey] = !allUnchecked;

      return newCheckedState;
    });

    // بررسی وضعیت والد بعد از بروزرسانی
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-start align-items-center ms-4 mx-2">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id={parentKey}
          checked={checkedState[parentKey]}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label"
          htmlFor={parentKey}
          style={{ textDecoration: "underline" }}
        >
          {parentLabel}
        </label>
      </div>

      {/* نمایش زیرمجموعه‌ها */}
      {checkedState[parentKey] && (
        <div className="ms-4 mx-3 custom-checkbox" style={{ fontSize: "0.8rem" }}>
          {childCheckboxes.map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mx-2"
            >
              <input
                className="form-check-input mx-1"
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

export default CheckboxGroup;
