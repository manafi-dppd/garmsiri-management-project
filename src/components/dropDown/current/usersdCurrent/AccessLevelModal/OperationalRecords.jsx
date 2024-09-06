import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import CheckboxGroup from "./CheckboxGroup";

const OperationalRecords = ({ checkedState, setCheckedState }) => {
  const handleParentCheck = () => {
    const newState = !checkedState.operationalRecords;
    setCheckedState((prevState) => ({
      ...prevState,
      operationalRecords: newState,
      accounting: newState,
      damBalance: newState,
      channelBalance: newState,
      recordsIrrigationCalendar: newState,
      irrigationProgram: newState,
      waterDelivery: newState,
      rain: newState,
      dashboard: newState,
      deliveryMinutes: newState,
      repairs: newState,
      operation: newState,
      manpowerMachinery: newState,
      consumables: newState,
      repairCosts: newState,
      repairsDashboard: newState,
      serviceRecords: newState,
      serviceOperation: newState,
      serviceManpowerMachinery: newState,
      serviceConsumables: newState,
      serviceCosts: newState,
      serviceDashboard: newState,
      maintenance: newState,
      warehouseRocords: newState, // افزودن این خط
      inventory: newState, // افزودن این خط
      inOut: newState, // افزودن این خط
      legal: newState,
      realEstate: newState,
      opposite: newState,
      bill: newState,
      damages: newState,
      correspondence: newState,
      reports: newState,
      inspections: newState,
      securityOps: newState,
    }));
  };

  const checkParentStatus = () => {
    setCheckedState((prevState) => ({
      ...prevState,
      operationalRecords:
        prevState.accounting ||
        prevState.repairs ||
        prevState.serviceRecords ||
        prevState.warehouseRocords ||
        prevState.legal ||
        prevState.securityOps ||
        prevState.correspondence ||
        prevState.reports ||
        prevState.inspections,
    }));
  };

  // تابع جدید handleChildCheck برای مدیریت تغییرات چک‌ باکس‌های زیرمجموعه
  const handleChildCheck = (childKey) => {
    setCheckedState((prevState) => {
      const newCheckedState = {
        ...prevState,
        [childKey]: !prevState[childKey],
      };

      // بررسی اینکه اگر همه چک‌ باکس‌های زیرمجموعه غیر فعال شدند، چک‌ باکس پدر نیز غیر فعال شود
      const allUnchecked = [
        "securityOps",
        "correspondence",
        "reports",
        "inspections",
      ].every((key) => !newCheckedState[key]);

      newCheckedState.operationalRecords = !allUnchecked;

      return newCheckedState;
    });

    // بررسی وضعیت پدر بعد از به‌روزرسانی

    checkParentStatus();
  };

  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-start align-items-center">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="operationalRecords"
          checked={checkedState.operationalRecords}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="operationalRecords">
          سوابق بهره‌برداری
        </label>
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "سوابق بهره‌برداری" */}
      {checkedState.operationalRecords && (
        <>
          {/* استفاده از CheckboxGroup به جای دو کامپوننت قبلی */}
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="accounting"
            parentLabel="حسابداری آب"
            childCheckboxes={[
              { key: "damBalance", label: "بیلان سد" },
              { key: "channelBalance", label: "بیلان سامانه" },
              { key: "recordsIrrigationCalendar", label: "تقویم آبیاری" },
              { key: "irrigationProgram", label: "برنامه آبیاری" },
              { key: "waterDelivery", label: "تحویل آب" },
              { key: "rain", label: "بارندگی" },
              { key: "dashboard", label: "داشبورد" },
              { key: "deliveryMinutes", label: "صورتجلسات تحویل آب" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="repairs"
            parentLabel="تعمیرات"
            childCheckboxes={[
              { key: "operation", label: "عملیات" },
              { key: "manpowerMachinery", label: "نیروی انسانی و ماشین‌آلات" },
              { key: "consumables", label: "لوازم مصرفی" },
              { key: "repairCosts", label: "هزینه‌ها" },
              { key: "repairsDashboard", label: "داشبورد" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="serviceRecords"
            parentLabel="سرویس و نگهداری"
            childCheckboxes={[
              { key: "serviceOperation", label: "عملیات" },
              {
                key: "serviceManpowerMachinery",
                label: "نیروی انسانی و ماشین‌آلات",
              },
              { key: "serviceConsumables", label: "لوازم مصرفی" },
              { key: "serviceCosts", label: "هزینه‌ها" },
              { key: "serviceDashboard", label: "داشبورد" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="warehouseRocords"
            parentLabel="انبار"
            childCheckboxes={[
              { key: "inventory", label: "موجودی" },
              { key: "inOut", label: "ورود/خروج" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="legal"
            parentLabel="امور حقوقی"
            childCheckboxes={[
              { key: "realEstate", label: "فهرست و اسناد املاک" },
            { key: "opposite", label: "معارض" },
            { key: "bill", label: "دادخواست/دفاعیه/رای" },
            { key: "damages", label: "خسارت و جریمه" },
            ]}
          />
          {[
            { key: "securityOps", label: "حراست" },
            { key: "correspondence", label: "مکاتبات" },
            { key: "reports", label: "گزارشات" },
            { key: "inspections", label: "بازدیدها" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-start align-items-center ms-4 mt-2 mx-2"
            >
              <input
                className="form-check-input mx-2"
                type="checkbox"
                id={item.key}
                checked={checkedState[item.key]}
                onChange={() => handleChildCheck(item.key)} // استفاده از تابع جدید handleChildCheck
              />
              <label
                className="form-check-label me-2"
                htmlFor={item.key}
                style={{ textDecoration: "underline" }}
              >
                {item.label}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OperationalRecords;
