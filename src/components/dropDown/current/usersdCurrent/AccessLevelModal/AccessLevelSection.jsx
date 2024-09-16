import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import CheckboxGroup from "./CheckboxGroup";

const AccessLevelSection = ({
  checkedState,
  setCheckedState,
  sectionKey,
  sectionLabel,
  onCheckboxChange,
  parentCheckboxes = [],
}) => {
  // Render checkboxes for parent items and their children
  const renderCheckboxes = (keys) => {
    return keys.map((key) => (
      <div className="form-check" key={key}>
        <input
          className="form-check-input"
          type="checkbox"
          id={key}
          checked={checkedState[key] || false}
          onChange={(e) => onCheckboxChange(key, e.target.checked)} // تغییر چکباکس با فراخوانی تابع onCheckboxChange
        />
        <label className="form-check-label" htmlFor={key}>
          {key}
        </label>
      </div>
    ));
  };

  // Function to handle parent checkbox change and update child states
  const handleParentCheck = () => {
    const newState = !checkedState[sectionKey];
    // Set all checkboxes based on the new state
    const updatedState = { [sectionKey]: newState };
    parentCheckboxes.forEach(({ key, childCheckboxes }) => {
      updatedState[key] = newState; // Set parent checkbox state

      // Set child checkboxes state if any
      if (childCheckboxes) {
        childCheckboxes.forEach(({ key: childKey }) => {
          updatedState[childKey] = newState;
        });
      }
    });

    setCheckedState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };
  // Expand checkboxes when component loads
  React.useEffect(() => {
    expandCheckboxes(); // زمانی که کامپوننت بارگذاری می‌شود، چک‌باکس‌ها را باز کن
  }, []);
  // Expand child checkboxes if parent is checked
  const expandCheckboxes = () => {
    setCheckedState((prevState) => {
      const newState = { ...prevState };

      parentCheckboxes.forEach(({ key, childCheckboxes }) => {
        // اگر یک چک‌باکس فعال است، والدین آن و زیرمجموعه‌هایش را باز کن
        if (prevState[key]) {
          newState[sectionKey] = true; // اطمینان حاصل شود که بخش اصلی نیز باز است
          newState[key] = true; // اطمینان حاصل شود که والدین باز هستند

          // برای باز کردن زیرمجموعه‌ها
          if (childCheckboxes) {
            childCheckboxes.forEach(({ key: childKey }) => {
              newState[childKey] = true;
            });
          }
        }
      });

      return newState;
    });
  };
  // Check and update the parent checkbox status based on its children
  const checkParentStatus = () => {
    const isChecked = parentCheckboxes.some(
      ({ key, childCheckboxes }) =>
        checkedState[key] ||
        (childCheckboxes &&
          childCheckboxes.some(({ key: childKey }) => checkedState[childKey]))
    );

    setCheckedState((prevState) => ({
      ...prevState,
      [sectionKey]: isChecked,
    }));
  };

  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-start align-items-center">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id={sectionKey}
          checked={checkedState[sectionKey] || false}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor={sectionKey}>
          {sectionLabel}
        </label>
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن چک‌باکس اصلی */}
      {checkedState[sectionKey] && (
        <>
          {parentCheckboxes.map(({ key, label, childCheckboxes }) => (
            <CheckboxGroup
              key={key}
              checkedState={checkedState}
              setCheckedState={setCheckedState}
              checkParentStatus={checkParentStatus}
              parentKey={key}
              parentLabel={label}
              childCheckboxes={childCheckboxes}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AccessLevelSection;
