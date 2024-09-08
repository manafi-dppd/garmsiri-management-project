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
  const renderCheckboxes = (keys) => {
    return keys.map((key) => (
      <div className="form-check" key={key}>
        <input
          className="form-check-input"
          type="checkbox"
          id={key}
          checked={checkedState[key]}
          onChange={() => onCheckboxChange(key)}
        />
        <label className="form-check-label" htmlFor={key}>
          {key}
        </label>
      </div>
    ));
  };
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

  React.useEffect(() => {
    expandCheckboxes(); // زمانی که کامپوننت بارگذاری می‌شود، چک‌باکس‌ها را باز کن
  }, []);
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

  // Check if all children are unchecked and hide them
  const hideChildrenIfAllUnchecked = () => {
    const areAllChildrenUnchecked = parentCheckboxes.every(
      ({ key, childCheckboxes }) =>
        !checkedState[key] &&
        (!childCheckboxes ||
          childCheckboxes.every(({ key: childKey }) => !checkedState[childKey]))
    );

    if (areAllChildrenUnchecked && checkedState[sectionKey] !== false) {
      setCheckedState((prevState) => ({
        ...prevState,
        [sectionKey]: false,
      }));
    }
  };


  // Call the hideChildrenIfAllUnchecked function on any change
  // React.useEffect(() => {
  //   hideChildrenIfAllUnchecked();
  // }, [checkedState]);




  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-start align-items-center">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id={sectionKey}
          checked={checkedState[sectionKey]}
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
