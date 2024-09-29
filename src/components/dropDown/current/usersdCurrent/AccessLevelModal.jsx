import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AccessLevelSection from "./AccessLevelModal/AccessLevelSection";
import useAccessLevelEffect from "./useAccessLevelEffect";
import InvitationModal from "./invitationModal";
import Header from "../../../header";

const AccessLevelModal = ({
  show,
  onClose,
  onAccessLevelSubmit,
  selectedPosition,
  updateAccessLevels,
}) => {
  const [checkedState, setCheckedState] = useState({
    // امور جاری
    currentAffairs: false,
    // قراردادهای بهره‌برداری
    contracts: false,
    firstPumpStationGroup: false,
    secondPumpStationGroup: false,
    irrigationNetworks: false,
    // درخواست آب
    requests: false,
    irrigationCalendar: false,
    requestFromDam: false,
    requestFromChannel: false,
    requestFromPump: false,
    // تحویل آب
    delivery: false,
    maneuveringTheDamValves: false,
    maneuverValvesOfChannelAndTanks: false,
    numberOfWaterLevelOfDeliveryPoints: false,
    flowmeterNumberOfGravityDeliveryPoints: false,
    numberOfFlowMetersOfPumpingStations: false,
    farmMeterNumber: false,
    deliveryMinutes: false,
    // گزارش
    report: false,
    periodic: false,
    case: false,
    instantaneousPumping: false,
    dailyPumping: false,
    // سرویس و نگهداری
    services: false,
    pumpStationService: false,
    cleaningAndDredgingFacilities: false,
    canalDredging: false,
    serviceAndPartialRepairOfEquipment: false,
    // تعمیر
    repair: false,
    damChannel: false,
    pumpingStationRepair: false,
    irrigationNetworkRepair: false,
    // حراست
    security: false,
    GuardShiftSchedule: false,
    visitReport: false,
    // نامه نگاری
    letter: false,
    arrived: false,
    issued: false,
    // جلسه
    meeting: false,
    internal: false,
    foreigner: false,
    // بازدید
    visit: false,
    operational: false,
    authorities: false,
    // انبار
    warehouse: false,
    commodityRequest: false,
    entryExit: false,
    // بخشنامه‌ها
    circulars: false,
    // استانداردها و دستورالعمل‌ها
    standards: false,
    // مدیریت مرورگر
    browserManagement: false,
    // سوابق بهره‌برداری
    operationalRecords: false,
    // حسابداری آب
    waterAccounting: false,
    damBalance: false,
    channelBalance: false,
    irrigationCalendarRecords: false,
    irrigationProgram: false,
    waterDelivery: false,
    rain: false,
    waterAccountingDashboard: false,
    waterDeliveryMinutes: false,
    // تعمیرات
    repairs: false,
    repairOperation: false,
    manpowerAndMachinery: false,
    consumables: false,
    repairCosts: false,
    repairsDashboard: false,
    // سرویس و نگهداری
    serviceRecords: false,
    serviceAndMaintenanceOperations: false,
    serviceManpowerMachinery: false,
    serviceConsumables: false,
    serviceCosts: false,
    serviceDashboard: false,
    // انبار
    warehouseRocords: false,
    inventory: false,
    inOut: false,
    // امور حقوقی
    legal: false,
    inventoryAndRealEstateDocuments: false,
    opposite: false,
    petitionDefenseOpinion: false,
    damagesAndFines: false,
    // حراست
    securityOps: false,
    // مکاتبات
    correspondence: false,
    // گزارشات
    reports: false,
    // بازدیدها
    inspections: false,
    // سوابق اجرا
    performanceRecords: false,
    // سد
    damPerformance: false,
    damSpecifications: false,
    damPlan: false,
    damConsumables: false,
    // سامانه
    channelPerformance: false,
    channelSpecifications: false,
    channelPlan: false,
    channelConsumables: false,
    // ایستگاه پمپاژ
    pumpPerformance: false,
    pumpSpecifications: false,
    pumpPlan: false,
    pumpConsumables: false,
    // شبکه
    networkPerformance: false,
    networkSpecifications: false,
    networkPlan: false,
    networkConsumables: false,
    // سوابق مطالعات
    studiesRecords: false,
    // مرحله اول
    firstStage: false,
    geology: false,
    soilScience: false,
    meteorology: false,
    environment: false,
    sociology: false,
    agriculture: false,
    irrigationDrainage: false,
    economy: false,
    // مرحله دوم
    secondStage: false,
    damSecondStage: false,
    channelSecondStage: false,
    pumpingSecondStage: false,
    networksSecondStage: false,
  });
  const [disabledState, setDisabledState] = useState({});

  // استفاده از useAccessLevelEffect برای تنظیم وضعیت چک‌باکس‌ها
  useAccessLevelEffect(selectedPosition, setCheckedState, setDisabledState);

  // بررسی و فراخوانی تابع updateAccessLevels اگر موجود باشد
  useEffect(() => {
    if (typeof updateAccessLevels === "function") {
      updateAccessLevels(checkedState);
    }
  }, [checkedState, updateAccessLevels]);
  // useEffect(() => {
  //   if (checkedState) {
  //     // Set the initial checked state for the checkboxes
  //     setCheckedState(checkedState);
  //   }
  // }, [checkedState]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // تابع برای به‌روزرسانی وضعیت چک‌باکس‌ها
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    onAccessLevelSubmit({
      position: selectedPosition, // pass the selected position
      checkedState: checkedState, // pass the checkbox states
    });
    onClose();
  };

  const handleSave = () => {
    const values = Object.entries(checkedState)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    console.log("Current Checkbox States:", checkedState);
    
    onAccessLevelSubmit(checkedState);

    // Update Header's finalAccessLevel
    // Header.setFinalAccessLevel(checkedState);
    setCheckedState(checkedState);

    // Log the finalAccessLevel
    // console.log("Updated Final Access Level in Header:", checkedState);
    onClose();
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">سطح دسترسی {selectedPosition && ` ${selectedPosition}`}</h5>
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
                  disabledState={disabledState}
                  onCheckboxChange={handleCheckboxChange}
                  setCheckedState={setCheckedState}
                  sectionKey="currentAffairs"
                  sectionLabel="امور جاری"
                  parentCheckboxes={[
                    {
                      key: "contracts",
                      label: "قراردادهای بهره‌برداری",
                      childCheckboxes: [
                        {
                          key: "firstPumpStationGroup",
                          label: "مجموعه اول ایستگاه‌های پمپاژ",
                        },
                        {
                          key: "secondPumpStationGroup",
                          label: "مجموعه دوم ایستگاه‌های پمپاژ",
                        },
                        {
                          key: "irrigationNetworks",
                          label: "شبکه‌های آبیاری",
                        },
                      ],
                    },
                    {
                      key: "requests",
                      label: "درخواست آب",
                      childCheckboxes: [
                        { key: "irrigationCalendar", label: "تقویم آبیاری" },
                        { key: "requestFromDam", label: "درخواست از سد" },
                        { key: "requestFromChannel", label: "درخواست از سامانه" },
                        {
                          key: "requestFromPump",
                          label: "درخواست از ایستگاه پمپاژ",
                        },
                      ],
                    },
                    {
                      key: "delivery",
                      label: "تحویل آب",
                      childCheckboxes: [
                        { key: "maneuveringTheDamValves", label: "مانور دریچه‌های سد" },
                        {
                          key: "maneuverValvesOfChannelAndTanks",
                          label: "مانور دریچه‌ها و شیرآلات سامانه و مخازن",
                        },
                        {
                          key: "numberOfWaterLevelOfDeliveryPoints",
                          label: "رقوم سطح آب نقاط تحویل",
                        },
                        {
                          key: "flowmeterNumberOfGravityDeliveryPoints",
                          label: "رقوم فلومتر نقاط تحویل ثقلی",
                        },
                        {
                          key: "numberOfFlowMetersOfPumpingStations",
                          label: "رقوم فلومتر ایستگاه‌های پمپاژ",
                        },
                        { key: "farmMeterNumber", label: "رقوم کنتور مزارع" },
                        { key: "deliveryMinutes", label: "صورتجلسه تحویل" },
                      ],
                    },
                    {
                      key: "report",
                      label: "گزارش",
                      childCheckboxes: [
                        { key: "periodic", label: "دوره‌ای" },
                        { key: "case", label: "موردی" },
                        { key: "instantaneousPumping", label: "پمپاژ لحظه‌ای" },
                        { key: "dailyPumping", label: "پمپاژ روزانه" },
                      ],
                    },
                    {
                      key: "services",
                      label: "سرویس و نگهداری",
                      childCheckboxes: [
                        { key: "pumpStationService", label: "ایستگاه پمپاژ" },
                        {
                          key: "cleaningAndDredgingFacilities",
                          label: "تمیزکاری و لایروبی تاسیسات",
                        },
                        { key: "canalDredging", label: "لایروبی سامانه" },
                        {
                          key: "serviceAndPartialRepairOfEquipment",
                          label: "سرویس و تعمیر جزیی تجهیزات",
                        },
                      ],
                    },
                    {
                      key: "repair",
                      label: "تعمیر",
                      childCheckboxes: [
                        { key: "damChannel", label: "سد و سامانه" },
                        { key: "pumpingStationRepair", label: "ایستگاه پمپاژ" },
                        {
                          key: "irrigationNetworkRepair",
                          label: "شبکه‌های آبیاری",
                        },
                      ],
                    },
                    {
                      key: "security",
                      label: "حراست",
                      childCheckboxes: [
                        {
                          key: "GuardShiftSchedule",
                          label: "برنامه شیفت نگهبانان",
                        },
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
                        { key: "commodityRequest", label: "درخواست کالا" },
                        { key: "entryExit", label: "ورود/خروج" },
                      ],
                    },
                    { key: "circulars", label: "بخشنامه‌ها" },
                    {
                      key: "standards",
                      label: "استانداردها و دستورالعمل‌ها",
                    },
                    { key: "browserManagement", label: "مدیریت مرورگر" },
                    // سایر چک‌باکس‌ها...
                  ]}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 border-start border-bottom mb-3">
                <AccessLevelSection
                  checkedState={checkedState}
                  disabledState={disabledState}
                  onCheckboxChange={handleCheckboxChange}
                  setCheckedState={setCheckedState}
                  sectionKey="operationalRecords"
                  sectionLabel="سوابق بهره‌برداری"
                  parentCheckboxes={[
                    {
                      key: "waterAccounting",
                      label: "حسابداری آب",
                      childCheckboxes: [
                        { key: "damBalance", label: "بیلان سد" },
                        { key: "channelBalance", label: "بیلان سامانه" },
                        {
                          key: "irrigationCalendarRecords",
                          label: "تقویم آبیاری",
                        },
                        { key: "irrigationProgram", label: "برنامه آبیاری" },
                        { key: "waterDelivery", label: "تحویل آب" },
                        { key: "rain", label: "بارندگی" },
                        { key: "waterAccountingDashboard", label: "داشبورد" },
                        {
                          key: "waterDeliveryMinutes",
                          label: "صورتجلسات تحویل آب",
                        },
                      ],
                    },
                    {
                      key: "repairs",
                      label: "تعمیرات",
                      childCheckboxes: [
                        { key: "repairOperation", label: "عملیات" },
                        {
                          key: "manpowerAndMachinery",
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
                        { key: "serviceAndMaintenanceOperations", label: "عملیات" },
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
                        { key: "inventoryAndRealEstateDocuments", label: "فهرست و اسناد املاک" },
                        { key: "opposite", label: "معارض" },
                        { key: "petitionDefenseOpinion", label: "دادخواست/دفاعیه/رای" },
                        { key: "damagesAndFines", label: "خسارت و جریمه" },
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
                  disabledState={disabledState}
                  onCheckboxChange={handleCheckboxChange}
                  setCheckedState={setCheckedState}
                  sectionKey="performanceRecords"
                  sectionLabel="سوابق اجرا"
                  parentCheckboxes={[
                    {
                      key: "damPerformance",
                      label: "سد",
                      childCheckboxes: [
                        { key: "damSpecifications", label: "مشخصات" },
                        { key: "damPlan", label: "نقشه ازبیلت" },
                        { key: "damConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                    {
                      key: "channelPerformance",
                      label: "سامانه",
                      childCheckboxes: [
                        { key: "channelSpecifications", label: "مشخصات" },
                        { key: "channelPlan", label: "نقشه ازبیلت" },
                        { key: "channelConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                    {
                      key: "pumpPerformance",
                      label: "ایستگاه پمپاژ",
                      childCheckboxes: [
                        { key: "pumpSpecifications", label: "مشخصات" },
                        { key: "pumpPlan", label: "نقشه ازبیلت" },
                        { key: "pumpConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                    {
                      key: "networkPerformance",
                      label: "شبکه",
                      childCheckboxes: [
                        { key: "networkSpecifications", label: "مشخصات" },
                        { key: "networkPlan", label: "نقشه ازبیلت" },
                        { key: "networkConsumables", label: "لوازم مصرفی" },
                      ],
                    },
                  ]}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 border-bottom">
                <AccessLevelSection
                  checkedState={checkedState}
                  disabledState={disabledState}
                  onCheckboxChange={handleCheckboxChange}
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
                        {
                          key: "irrigationDrainage",
                          label: "آبیاری و زهکشی",
                        },
                        { key: "economy", label: "اقتصاد طرح" },
                      ],
                    },
                    {
                      key: "secondStage",
                      label: "مرحله دوم",
                      childCheckboxes: [
                        { key: "damSecondStage", label: "سد" },
                        { key: "channelSecondStage", label: "سامانه" },
                        { key: "pumpingSecondStage", label: "ایستگاه‌های پمپاژ" },
                        {
                          key: "networksSecondStage",
                          label: "شبکه‌های آبیاری",
                        },
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
