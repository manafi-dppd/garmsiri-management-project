import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import AccountingCheckboxGroup from "./OperationalRecords/AccountingCheckboxGroup";
import RepairsCheckboxGroup from "./OperationalRecords/RepairsCheckboxGroup";
import ServiceRecordsCheckboxGroup from "./OperationalRecords/ServiceRecordsCheckboxGroup";
import WarehouseRecordsCheckboxGroup from "./OperationalRecords/WarehouseRecordsCheckboxGroup";
import LegalCheckboxGroup from "./OperationalRecords/LegalCheckboxGroup";

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
          <AccountingCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <RepairsCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <ServiceRecordsCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <WarehouseRecordsCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <LegalCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
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
