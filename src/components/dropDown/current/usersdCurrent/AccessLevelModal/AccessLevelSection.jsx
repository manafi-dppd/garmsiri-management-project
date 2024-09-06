import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import CheckboxGroup from "./CheckboxGroup";

const AccessLevelSection = ({
  checkedState,
  setCheckedState,
  sectionKey,
  sectionLabel,
  parentCheckboxes = [],
}) => {
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
