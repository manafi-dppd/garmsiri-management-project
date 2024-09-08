// useAccessLevelEffect.js

import { useEffect } from "react";

const useAccessLevelEffect = (
  selectedPosition,
  setCheckedState,
  setDisabledState
) => {
  useEffect(() => {
    // تعریف آرایه با مقادیر پیش‌فرض false
    const initialState = {
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
      // کاربران
      users: false,
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
    };

    // کپی از وضعیت اولیه
    const newState = { ...initialState };
    const disabledState = { ...initialState }; // وضعیت غیرفعال بودن

    switch (selectedPosition) {
      case "ادمین وبسایت":
        Object.keys(newState).forEach((key) => (newState[key] = true));
        Object.keys(disabledState).forEach(
          (key) => (disabledState[key] = false)
        );
        break;
      case "مدیر بهره‌برداری":
        // فقط دو چک‌باکس فعال بمانند
        newState.currentAffairs = true;
        newState.contracts = true;
        newState.firstPumpStationGroup = true;
        newState.requestFromDam = true;
        Object.keys(disabledState).forEach(
          (key) =>
            (disabledState[key] =
              key !== "firstPumpStationGroup" &&
              key !== "requestFromDam" &&
              key !== "currentAffairs" &&
              key !== "contracts")
        );
        break;
      case "مدیران مرتبط آب نیرو":
        Object.keys(newState).forEach(
          (key) => (newState[key] = key === "currentAffairs" ? false : true)
        );
        break;
      case "مدیران مرتبط وزارت نیرو":
        Object.keys(newState).forEach((key) => (newState[key] = false));
        newState.waterAccounting = true;
        newState.maintenance = true;
        break;
      default:
        break;
    }

    // به‌روزرسانی وضعیت با مقادیر جدید
    setCheckedState(newState);
    setDisabledState(disabledState);
    console.log("Checkbox States:", newState); // نمایش مقادیر در کنسول
  }, [selectedPosition, setCheckedState]);
};

export default useAccessLevelEffect;
