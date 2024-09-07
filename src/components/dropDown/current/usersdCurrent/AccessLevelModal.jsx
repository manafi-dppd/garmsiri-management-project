import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AccessLevelSection from "./AccessLevelModal/AccessLevelSection";

const AccessLevelModal = ({ show, onClose, onAccessLevelSubmit }) => {
  const [checkedState, setCheckedState] = useState({
    currentAffairs: false,
    operationalRecords: false,
    contracts: false,
    requests: false,
    report: false,
    Services: false,
    repair: false,
    security: false,
    letter: false,
    meeting: false,
    visit: false,
    warehouse: false,
    correspondence: false,
    circulars: false,
    standards: false,
    waterAccounting: false,
    maintenance: false,
    warehouseRocords: false,
    legal: false,
    reports: false,
    inspections: false,
    securityOps: false,
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (checkboxName, isChecked) => {
    setSelectedCheckboxes((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, checkboxName];
      } else {
        return prevSelected.filter((item) => item !== checkboxName);
      }
    });
  };

  // تابع برای جمع‌آوری وضعیت تمام چک‌باکس‌ها
  //   const gatherAllCheckBoxes = () => {
  //     const allCheckBoxes = Object.entries(checkedState).map(([key, value]) => ({
  //       name: key,
  //       checked: value,
  //     }));
  //     console.log("All Checkboxes:", allCheckBoxes);
  //   };

  //     // تابع برای بروزرسانی وضعیت چک‌باکس‌ها
  // const handleCheckboxChange = (name, value) => {
  //   setCheckedState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSave = () => {
    const values = Object.entries(checkedState)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    console.log("Current Checkbox States:", checkedState);
    onClose();
    onAccessLevelSubmit(checkedState);
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">سطح دسترسی</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{ position: "absolute", left: "10px" }}
            ></button>
          </div>
          <div className="modal-body text-end d-flex flex-wrap">
            <div className="row w-100">
              <div className="col-12 col-md-6 col-lg-3 border-start border-bottom mb-3">
                <AccessLevelSection
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                  sectionKey="currentAffairs"
                  sectionLabel="امور جاری"
                  parentCheckboxes={[
                    {
                      key: "contracts",
                      label: "قراردادهای بهره‌برداری",
                      childCheckboxes: [
                        {
                          key: "firstSet",
                          label: "مجموعه اول ایستگاه‌های پمپاژ",
                        },
                        {
                          key: "secondSet",
                          label: "مجموعه دوم ایستگاه‌های پمپاژ",
                        },
                        { key: "irrigationNetwork", label: "شبکه‌های آبیاری" },
                      ],
                    },
                    {
                      key: "requests",
                      label: "درخواست آب",
                      childCheckboxes: [
                        { key: "irrigationCalendar", label: "تقویم آبیاری" },
                        { key: "damRequest", label: "درخواست از سد" },
                        { key: "channelRequest", label: "درخواست از سامانه" },
                        {
                          key: "pumpRequest",
                          label: "درخواست از ایستگاه پمپاژ",
                        },
                      ],
                    },
                    {
                      key: "delivery",
                      label: "تحویل آب",
                      childCheckboxes: [
                        { key: "damValve", label: "مانور دریچه‌های سد" },
                        {
                          key: "channelValve",
                          label: "مانور دریچه‌ها و شیرآلات سامانه و مخازن",
                        },
                        { key: "waterLevel", label: "رقوم سطح آب نقاط تحویل" },
                        {
                          key: "gravityFlowmeter",
                          label: "رقوم فلومتر نقاط تحویل ثقلی",
                        },
                        {
                          key: "pumpingFlowmeter",
                          label: "رقوم فلومتر ایستگاه‌های پمپاژ",
                        },
                        { key: "meterNumber", label: "رقوم کنتور مزارع" },
                        { key: "deliveryMinutes", label: "صورتجلسه تحویل" },
                      ],
                    },
                    {
                      key: "report",
                      label: "گزارش",
                      childCheckboxes: [
                        { key: "periodic", label: "دوره‌ای" },
                        { key: "case", label: "موردی" },
                        { key: "pumpingMoment", label: "لحظه‌ای پمپاژ" },
                        { key: "dailyPumping", label: "روزانه پمپاژ" },
                      ],
                    },
                    {
                      key: "Services",
                      label: "سرویس و نگهداری",
                      childCheckboxes: [
                        { key: "pumpStation", label: "ایستگاه پمپاژ" },
                        {
                          key: "cleaningFacilities",
                          label: "تمیزکاری و لایروبی تاسیسات",
                        },
                        { key: "canalDredging", label: "لایروبی سامانه" },
                        {
                          key: "serviceEquipment",
                          label: "سرویس و تعمیر جزیی تجهیزات",
                        },
                      ],
                    },
                    {
                      key: "repair",
                      label: "تعمیر",
                      childCheckboxes: [
                        { key: "damChannel", label: "سد و سامانه" },
                        { key: "pumpingStation", label: "ایستگاه پمپاژ" },
                        {
                          key: "repairIrrigationNetwork",
                          label: "شبکه‌های آبیاری",
                        },
                      ],
                    },
                    {
                      key: "security",
                      label: "حراست",
                      childCheckboxes: [
                        { key: "shiftSchedule", label: "برنامه شیفت نگهبانان" },
                        { key: "visitReport", label: "گزارش بازدید" },
                      ],
                    },
                    {
                      key: "letter",
                      label: "نامه نگاری",
                      childCheckboxes: [
                        { key: "arrived", label: "وارده" },
                        { key: "issued", label: "صادره" },
                      ],
                    },
                    {
                      key: "meeting",
                      label: "جلسه",
                      childCheckboxes: [
                        { key: "internal", label: "داخلی" },
                        { key: "foreigner", label: "خارجی" },
                      ],
                    },
                    {
                      key: "visit",
                      label: "بازدید",
                      childCheckboxes: [
                        { key: "operational", label: "عملیاتی" },
                        { key: "authorities", label: "مقامات و مسئولین" },
                      ],
                    },
                    {
                      key: "warehouse",
                      label: "انبار",
                      childCheckboxes: [
                        { key: "request", label: "درخواست کالا" },
                        { key: "entryExit", label: "ورود/خروج" },
                      ],
                    },
                    { key: "circulars", label: "بخشنامه‌ها" },
                    { key: "standards", label: "استانداردها و دستورالعمل‌ها" },
                    { key: "users", label: "کاربران" },
                    // سایر چک‌باکس‌ها...
                  ]}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 border-start border-bottom mb-3">
                <AccessLevelSection
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                  sectionKey="operationalRecords"
                  sectionLabel="سوابق بهره‌برداری"
                  parentCheckboxes={[
                    {
                      key: "accounting",
                      label: "حسابداری آب",
                      childCheckboxes: [
                        { key: "damBalance", label: "بیلان سد" },
                        { key: "channelBalance", label: "بیلان سامانه" },
                        {
                          key: "recordsIrrigationCalendar",
                          label: "تقویم آبیاری",
                        },
                        { key: "irrigationProgram", label: "برنامه آبیاری" },
                        { key: "waterDelivery", label: "تحویل آب" },
                        { key: "rain", label: "بارندگی" },
                        { key: "dashboard", label: "داشبورد" },
                        { key: "deliveryMinutes", label: "صورتجلسات تحویل آب" },
                      ],
                    },
                    {
                      key: "repairs",
                      label: "تعمیرات",
                      childCheckboxes: [
                        { key: "operation", label: "عملیات" },
                        {
                          key: "manpowerMachinery",
                          label: "نیروی انسانی و ماشین‌آلات",
                        },
                        { key: "consumables", label: "لوازم مصرفی" },
                        { key: "repairCosts", label: "هزینه‌ها" },
                        { key: "repairsDashboard", label: "داشبورد" },
                      ],
                    },
                    {
                      key: "serviceRecords",
                      label: "سرویس و نگهداری",
                      childCheckboxes: [
                        { key: "serviceOperation", label: "عملیات" },
                        {
                          key: "serviceManpowerMachinery",
                          label: "نیروی انسانی و ماشین‌آلات",
                        },
                        { key: "serviceConsumables", label: "لوازم مصرفی" },
                        { key: "serviceCosts", label: "هزینه‌ها" },
                        { key: "serviceDashboard", label: "داشبورد" },
                      ],
                    },
                    {
                      key: "warehouseRocords",
                      label: "انبار",
                      childCheckboxes: [
                        { key: "inventory", label: "موجودی" },
                        { key: "inOut", label: "ورود/خروج" },
                      ],
                    },
                    {
                      key: "legal",
                      label: "امور حقوقی",
                      childCheckboxes: [
                        { key: "realEstate", label: "فهرست و اسناد املاک" },
                        { key: "opposite", label: "معارض" },
                        { key: "bill", label: "دادخواست/دفاعیه/رای" },
                        { key: "damages", label: "خسارت و جریمه" },
                      ],
                    },
                    { key: "securityOps", label: "حراست" },
                    { key: "correspondence", label: "مکاتبات" },
                    { key: "reports", label: "گزارشات" },
                    { key: "inspections", label: "بازدیدها" },
                  ]}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 border-start border-bottom mb-3">
                <AccessLevelSection
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                  sectionKey="performanceRecords"
                  sectionLabel="سوابق اجرا"
                  parentCheckboxes={[
                    {
                      key: "damPerformance",
                      label: "سد",
                      childCheckboxes: [
                        { key: "damSpecifications", label: "مشخصات" },
                        { key: "damMap", label: "نقشه ازبیلت" },
                        { key: "damConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                    {
                      key: "channelPerformance",
                      label: "سامانه",
                      childCheckboxes: [
                        { key: "channelSpecifications", label: "مشخصات" },
                        { key: "channelMap", label: "نقشه ازبیلت" },
                        { key: "channelConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                    {
                      key: "pumpPerformance",
                      label: "ایستگاه پمپاژ",
                      childCheckboxes: [
                        { key: "pumpSpecifications", label: "مشخصات" },
                        { key: "pumpMap", label: "نقشه ازبیلت" },
                        { key: "pumpConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                    {
                      key: "networkPerformance",
                      label: "شبکه",
                      childCheckboxes: [
                        { key: "networkSpecifications", label: "مشخصات" },
                        { key: "networkMap", label: "نقشه ازبیلت" },
                        { key: "networkConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                  ]}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 border-bottom">
                <AccessLevelSection
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                  sectionKey="studiesRecords"
                  sectionLabel="سوابق مطالعات"
                  parentCheckboxes={[
                    {
                      key: "firstStage",
                      label: "مرحله اول",
                      childCheckboxes: [
                        { key: "geology", label: "زمین شناسی و ژئوتکنیک" },
                        { key: "soilScience", label: "خاکشناسی" },
                        { key: "meteorology", label: "هواشناسی و هیدرولوژی" },
                        { key: "environment", label: "محیط زیست" },
                        { key: "sociology", label: "جامعه شناسی" },
                        { key: "agriculture", label: "کشاورزی و دامپروری" },
                        { key: "irrigationDrainage", label: "آبیاری و زهکشی" },
                        { key: "economy", label: "اقتصاد طرح" },
                      ],
                    },
                    {
                      key: "secondStage",
                      label: "مرحله دوم",
                      childCheckboxes: [
                        { key: "dam", label: "سد" },
                        { key: "channel", label: "سامانه" },
                        { key: "pumping", label: "ایستگاه‌های پمپاژ" },
                        { key: "irrigationNetworks", label: "شبکه‌های آبیاری" },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              انصراف
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessLevelModal;
