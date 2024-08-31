import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import ContractCheckboxGroup from "./CurrentAffairs/ContractCheckboxGroup";
import RequestCheckboxGroup from "./CurrentAffairs/RequestCheckboxGroup";
import DeliveryCheckboxGroup from "./CurrentAffairs/DeliveryCheckboxGroup";
import ReportCheckboxGroup from "./CurrentAffairs/ReportCheckboxGroup";
import ServiceCheckboxGroup from "./CurrentAffairs/ServiceCheckboxGroup";
import RepairCheckboxGroup from "./CurrentAffairs/RepairCheckboxGroup";
import SecurityCheckboxGroup from "./CurrentAffairs/SecurityCheckboxGroup";
import LetterCheckboxGroup from "./CurrentAffairs/LetterCheckboxGroup";
import MeetingCheckboxGroup from "./CurrentAffairs/MeetingCheckboxGroup";
import VisitCheckboxGroup from "./CurrentAffairs/VisitCheckboxGroup";
import WarehouseCheckboxGroup from "./CurrentAffairs/WarehouseCheckboxGroup";

const CurrentAffairs = ({ checkedState, setCheckedState }) => {
  const handleParentCheck = () => {
    const newState = !checkedState.currentAffairs;
    setCheckedState((prevState) => ({
      ...prevState,
      currentAffairs: newState,
      contracts: newState,
      firstSet: newState,
      secondSet: newState,
      irrigationNetwork: newState,
      requests: newState,
      irrigationCalendar: newState,
      damRequest: newState,
      channelRequest: newState,
      pumpRequest: newState,
      delivery: newState,
      damValve: newState,
      channelValve: newState,
      waterLevel: newState,
      gravityFlowmeter: newState,
      pumpingFlowmeter: newState,
      meterNumber: newState,
      deliveryMinutes: newState,
      report: newState,
      periodic: newState,
      case: newState,
      pumpingMoment: newState,
      dailyPumping: newState,
      Services: newState,
      pumpStation: newState,
      cleaningFacilities: newState,
      canalDredging: newState,
      serviceEquipment: newState,
      repair: newState,
      damChannel: newState,
      pumpingStation: newState,
      repairIrrigationNetwork: newState,
      security: newState,
      shiftSchedule: newState,
      visitReport: newState,
      letter: newState,
      arrived: newState,
      issued: newState,
      meeting: newState,
      internal: newState,
      foreigner: newState,
      visit: newState,
      operational: newState,
      authorities: newState,
      warehouse: newState,
      request: newState,
      entryExit: newState,
      circulars: newState,
      standards: newState,
      users: newState,
    }));
  };

  const checkParentStatus = () => {
    setCheckedState((prevState) => ({
      ...prevState,
      currentAffairs:
        prevState.contracts ||
        prevState.requests ||
        prevState.delivery ||
        prevState.report ||
        prevState.Services ||
        prevState.repair ||
        prevState.security ||
        prevState.letter ||
        prevState.meeting ||
        prevState.visit ||
        prevState.warehouse ||
        prevState.circulars ||
        prevState.standards ||
        prevState.users,
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
      const allUnchecked = ["circulars", "standards", "users"].every(
        (key) => !newCheckedState[key]
      );

      newCheckedState.currentAffairs = !allUnchecked;

      return newCheckedState;
    });

    // بررسی وضعیت پدر بعد از به‌روزرسانی

    checkParentStatus();
  };

  return (
    <div className="p-3">
      <div className="form-check d-flex justify-content-end align-items-center">
        <label className="form-check-label me-2" htmlFor="currentAffairs">
          امور جاری
        </label>
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="currentAffairs"
          checked={checkedState.currentAffairs}
          onChange={handleParentCheck}
        />
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "امور جاری" */}
      {checkedState.currentAffairs && (
        <>
          <ContractCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <RequestCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <DeliveryCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <ReportCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <ServiceCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <RepairCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <SecurityCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <LetterCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <MeetingCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <VisitCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          <WarehouseCheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
          />
          {[
            { key: "circulars", label: "بخشنامه‌ها" },
            { key: "standards", label: "استانداردها و دستورالعمل‌ها" },
            { key: "users", label: "کاربران" },
          ].map((item) => (
            <div
              key={item.key}
              className="form-check d-flex justify-content-end align-items-center ms-4 mt-2 mx-2"
            >
              <label
                className="form-check-label me-2"
                htmlFor={item.key}
                style={{ textDecoration: "underline" }}
              >
                {item.label}
              </label>
              <input
                className="form-check-input mx-2"
                type="checkbox"
                id={item.key}
                checked={checkedState[item.key]}
                onChange={() => handleChildCheck(item.key)}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CurrentAffairs;
