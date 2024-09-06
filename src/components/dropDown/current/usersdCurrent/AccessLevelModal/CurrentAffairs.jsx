import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AccessLevelModal.css";
import CheckboxGroup from "./CheckboxGroup"; // کامپوننت عمومی جدید

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
      <div className="form-check d-flex justify-content-start align-items-center">
        <input
          className="form-check-input mx-2"
          type="checkbox"
          id="currentAffairs"
          checked={checkedState.currentAffairs}
          onChange={handleParentCheck}
        />
        <label className="form-check-label me-2" htmlFor="currentAffairs">
          امور جاری
        </label>
      </div>

      {/* نمایش زیرمجموعه‌ها در صورت فعال بودن "امور جاری" */}
      {checkedState.currentAffairs && (
        <>
          {/* استفاده از CheckboxGroup به جای دو کامپوننت قبلی */}
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="contracts"
            parentLabel="قراردادهای بهره‌برداری"
            childCheckboxes={[
              { key: "firstSet", label: "مجموعه اول ایستگاه‌های پمپاژ" },
              { key: "secondSet", label: "مجموعه دوم ایستگاه‌های پمپاژ" },
              { key: "irrigationNetwork", label: "شبکه‌های آبیاری" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="requests"
            parentLabel="درخواست آب"
            childCheckboxes={[
              { key: "irrigationCalendar", label: "تقویم آبیاری" },
              { key: "damRequest", label: "درخواست از سد" },
              { key: "channelRequest", label: "درخواست از سامانه" },
              { key: "pumpRequest", label: "درخواست از ایستگاه پمپاژ" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="delivery"
            parentLabel="تحویل آب"
            childCheckboxes={[
              { key: "damValve", label: "مانور دریچه‌های سد" },
              {
                key: "channelValve",
                label: "مانور دریچه‌ها و شیرآلات سامانه و مخازن",
              },
              { key: "waterLevel", label: "رقوم سطح آب نقاط تحویل" },
              { key: "gravityFlowmeter", label: "رقوم فلومتر نقاط تحویل ثقلی" },
              {
                key: "pumpingFlowmeter",
                label: "رقوم فلومتر ایستگاه‌های پمپاژ",
              },
              { key: "meterNumber", label: "رقوم کنتور مزارع" },
              { key: "deliveryMinutes", label: "صورتجلسه تحویل" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="report"
            parentLabel="گزارش"
            childCheckboxes={[
              { key: "periodic", label: "دوره‌ای" },
              { key: "case", label: "موردی" },
              { key: "pumpingMoment", label: "لحظه‌ای پمپاژ" },
              { key: "dailyPumping", label: "روزانه پمپاژ" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="Services"
            parentLabel="سرویس و نگهداری"
            childCheckboxes={[
              { key: "pumpStation", label: "ایستگاه پمپاژ" },
              {
                key: "cleaningFacilities",
                label: "تمیزکاری و لایروبی تاسیسات",
              },
              { key: "canalDredging", label: "لایروبی سامانه" },
              { key: "serviceEquipment", label: "سرویس و تعمیر جزیی تجهیزات" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="repair"
            parentLabel="تعمیر"
            childCheckboxes={[
              { key: "damChannel", label: "سد و سامانه" },
              { key: "pumpingStation", label: "ایستگاه پمپاژ" },
              { key: "repairIrrigationNetwork", label: "شبکه‌های آبیاری" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="security"
            parentLabel="حراست"
            childCheckboxes={[
              { key: "shiftSchedule", label: "برنامه شیفت نگهبانان" },
              { key: "visitReport", label: "گزارش بازدید" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="letter"
            parentLabel="نامه نگاری"
            childCheckboxes={[
              { key: "arrived", label: "وارده" },
              { key: "issued", label: "صادره" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="meeting"
            parentLabel="جلسه"
            childCheckboxes={[
              { key: "internal", label: "داخلی" },
              { key: "foreigner", label: "خارجی" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="visit"
            parentLabel="بازدید"
            childCheckboxes={[
              { key: "operational", label: "عملیاتی" },
              { key: "authorities", label: "مقامات و مسئولین" },
            ]}
          />
          <CheckboxGroup
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            checkParentStatus={checkParentStatus}
            parentKey="warehouse"
            parentLabel="انبار"
            childCheckboxes={[
              { key: "request", label: "درخواست کالا" },
              { key: "entryExit", label: "ورود/خروج" },
            ]}
          />
          {[
            { key: "circulars", label: "بخشنامه‌ها" },
            { key: "standards", label: "استانداردها و دستورالعمل‌ها" },
            { key: "users", label: "کاربران" },
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
                onChange={() => handleChildCheck(item.key)}
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

export default CurrentAffairs;
