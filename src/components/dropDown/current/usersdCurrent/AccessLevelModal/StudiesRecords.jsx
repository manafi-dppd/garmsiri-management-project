import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import CheckboxGroup from "./CheckboxGroup";

const StudiesRecords = ({ checkedState, setCheckedState }) => {
  const handleParentCheck = () => {
    const newState = !checkedState.studiesRecords;

    // Set all checkboxes based on the new state
    setCheckedState((prevState) => ({
      ...prevState,
      studiesRecords: newState,
      firstStage: newState,
      secondStage: newState,
      geology: newState,
      soilScience: newState,
      meteorology: newState,
      environment: newState,
      sociology: newState,
      agriculture: newState,
      irrigationDrainage: newState,
      economy: newState,
      dam: newState,
      channel: newState,
      pumping: newState,
      irrigationNetworks: newState,
    }));
  };

  const checkParentStatus = () => {
    // بررسی وضعیت هر دو چک‌باکس مرحله اول و دوم
    setCheckedState((prevState) => ({
      ...prevState,
      studiesRecords: prevState.firstStage || prevState.secondStage,
    }));
  };

  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-start align-items-center">
        
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="studiesRecords"
          checked={checkedState.studiesRecords}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="studiesRecords">
          سوابق مطالعات
        </label>
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "سوابق مطالعات" */}
      {checkedState.studiesRecords && (
        <>
        <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="firstStage"
            parentLabel="مرحله اول"
            childCheckboxes={[
              { key: "geology", label: "زمین شناسی و ژئوتکنیک" },
            { key: "soilScience", label: "خاکشناسی" },
            { key: "meteorology", label: "هواشناسی و هیدرولوژی" },
            { key: "environment", label: "محیط زیست" },
            { key: "sociology", label: "جامعه شناسی" },
            { key: "agriculture", label: "کشاورزی و دامپروری" },
            { key: "irrigationDrainage", label: "آبیاری و زهکشی" },
            { key: "economy", label: "اقتصاد طرح" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="firstStage"
            parentLabel="مرحله اول"
            childCheckboxes={[
              { key: "geology", label: "زمین شناسی و ژئوتکنیک" },
            { key: "soilScience", label: "خاکشناسی" },
            { key: "meteorology", label: "هواشناسی و هیدرولوژی" },
            { key: "environment", label: "محیط زیست" },
            { key: "sociology", label: "جامعه شناسی" },
            { key: "agriculture", label: "کشاورزی و دامپروری" },
            { key: "irrigationDrainage", label: "آبیاری و زهکشی" },
            { key: "economy", label: "اقتصاد طرح" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="secondStage"
            parentLabel="مرحله دوم"
            childCheckboxes={[
              { key: "dam", label: "سد" },
            { key: "channel", label: "سامانه" },
            { key: "pumping", label: "ایستگاه‌های پمپاژ" },
            { key: "irrigationNetworks", label: "شبکه‌های آبیاری" },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default StudiesRecords;
