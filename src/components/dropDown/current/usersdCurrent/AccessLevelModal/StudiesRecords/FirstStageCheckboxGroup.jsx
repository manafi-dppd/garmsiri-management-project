import React from "react";
import "../CheckBox.css";

const FirstStageCheckboxGroup = ({ checkedState, setCheckedState, checkParentStatus }) => {
  const childCheckboxes = [
    "geology",
    "soilScience",
    "meteorology",
    "environment",
    "sociology",
    "agriculture",
    "irrigationDrainage",
    "economy",
  ];

  const handleParentCheck = () => {
    const newState = !checkedState.firstStage;

    // Set all first stage checkboxes based on the new state
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, firstStage: newState };

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
      const allUnchecked = childCheckboxes.every((checkbox) => !newCheckedState[checkbox]);

      newCheckedState.firstStage = !allUnchecked;

      return newCheckedState;
    });

    // Check parent status after updating
    checkParentStatus();
  };

  return (
    <>
      <div className="form-check d-flex justify-content-start align-items-center ms-4 mt-2 mx-2">
        
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="firstStage"
          checked={checkedState.firstStage}
          onChange={handleParentCheck}
        />
        <label
          className="form-check-label me-2"
          htmlFor="firstStage"
          style={{ textDecoration: "underline" }}
        >
          مرحله اول
        </label>
      </div>

      {/* زیرمجموعه‌ها */}
      {checkedState.firstStage && (
        <div
          className="ms-4 mx-4 custom-checkbox"
          style={{ fontSize: "0.8rem" }}
        >
          {[
            { key: "geology", label: "زمین شناسی و ژئوتکنیک" },
            { key: "soilScience", label: "خاکشناسی" },
            { key: "meteorology", label: "هواشناسی و هیدرولوژی" },
            { key: "environment", label: "محیط زیست" },
            { key: "sociology", label: "جامعه شناسی" },
            { key: "agriculture", label: "کشاورزی و دامپروری" },
            { key: "irrigationDrainage", label: "آبیاری و زهکشی" },
            { key: "economy", label: "اقتصاد طرح" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mx-2"
            >
              
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

export default FirstStageCheckboxGroup;
