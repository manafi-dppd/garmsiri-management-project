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
        Object.keys(newState).forEach(
          (key) => (newState[key] = key === "browserManagement" ? false : true)
        );
        break;
      case "مدیران مرتبط آب نیرو":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "contracts" ||
              key === "firstPumpStationGroup" ||
              key === "secondPumpStationGroup" ||
              key === "irrigationNetworks" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromDam" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "maneuveringTheDamValves" ||
              key === "maneuverValvesOfChannelAndTanks" ||
              key === "numberOfWaterLevelOfDeliveryPoints" ||
              key === "flowmeterNumberOfGravityDeliveryPoints" ||
              key === "numberOfFlowMetersOfPumpingStations" ||
              key === "farmMeterNumber" ||
              key === "deliveryMinutes" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "instantaneousPumping" ||
              key === "dailyPumping" ||
              key === "services" ||
              key === "pumpStationService" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "canalDredging" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "repair" ||
              key === "damChannel" ||
              key === "pumpingStationRepair" ||
              key === "irrigationNetworkRepair" ||
              key === "security" ||
              key === "GuardShiftSchedule" ||
              key === "visitReport" ||
              key === "letter" ||
              key === "arrived" ||
              key === "issued" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "operational" ||
              key === "authorities" ||
              key === "warehouse" ||
              key === "commodityRequest" ||
              key === "entryExit" ||
              key === "circulars" ||
              key === "standards" ||
              key === "browserManagement"
                ? false
                : true)
        );
        break;
      case "مدیران مرتبط وزارت نیرو":
        newState.operationalRecords = true;
        newState.waterAccounting = true;
        newState.damBalance = true;
        newState.channelBalance = true;
        newState.irrigationCalendarRecords = true;
        newState.irrigationProgram = true;
        newState.waterDelivery = true;
        newState.rain = true;
        newState.waterAccountingDashboard = true;
        newState.waterDeliveryMinutes = true;
        newState.repairs = true;
        newState.repairsDashboard = true;
        newState.serviceRecords = true;
        newState.serviceDashboard = true;
        Object.keys(disabledState).forEach(
          (key) =>
            (disabledState[key] =
              key !== "operationalRecords" &&
              key !== "waterAccounting" &&
              key !== "damBalance" &&
              key !== "channelBalance" &&
              key !== "irrigationCalendarRecords" &&
              key !== "irrigationProgram" &&
              key !== "waterDelivery" &&
              key !== "rain" &&
              key !== "waterAccountingDashboard" &&
              key !== "waterDeliveryMinutes" &&
              key !== "repairs" &&
              key !== "repairsDashboard" &&
              key !== "serviceRecords" &&
              key !== "serviceDashboard")
        );
        break;
      case "ناظر برق و پمپاژ":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "contracts" ||
              key === "firstPumpStationGroup" ||
              key === "secondPumpStationGroup" ||
              key === "requests" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "flowmeterNumberOfGravityDeliveryPoints" ||
              key === "numberOfFlowMetersOfPumpingStations" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "instantaneousPumping" ||
              key === "dailyPumping" ||
              key === "services" ||
              key === "pumpStationService" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "repair" ||
              key === "pumpingStationRepair" ||
              key === "letter" ||
              key === "arrived" ||
              key === "issued" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "operational" ||
              key === "authorities" ||
              key === "circulars" ||
              key === "standards" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "waterDelivery" ||
              key === "waterAccountingDashboard" ||
              key === "repairs" ||
              key === "repairOperation" ||
              key === "manpowerAndMachinery" ||
              key === "consumables" ||
              key === "repairCosts" ||
              key === "repairsDashboard" ||
              key === "serviceRecords" ||
              key === "serviceAndMaintenanceOperations" ||
              key === "serviceManpowerMachinery" ||
              key === "serviceConsumables" ||
              key === "serviceCosts" ||
              key === "serviceDashboard" ||
              key === "warehouseRocords" ||
              key === "inventory" ||
              key === "performanceRecords" ||
              key === "pumpPerformance" ||
              key === "pumpSpecifications" ||
              key === "pumpPlan" ||
              key === "pumpConsumables" ||
              key === "studiesRecords" ||
              key === "secondStage" ||
              key === "pumpingSecondStage"
                ? true
                : false)
        );
        break;
        case "نماینده اجرا":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromChannel" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "waterDelivery" ||
              key === "waterAccountingDashboard" ||
              key === "repairs" ||
              key === "repairOperation" ||
              key === "manpowerAndMachinery" ||
              key === "consumables" ||
              key === "repairCosts" ||
              key === "repairsDashboard"
                ? true
                : false)
        );
        break;
        case "اپراتور سد":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromDam" ||
              key === "delivery" ||
              key === "maneuveringTheDamValves" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "services" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "repair" ||
              key === "damChannel" ||
              key === "letter" ||
              key === "arrived" ||
              key === "issued" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "warehouse" ||
              key === "commodityRequest" ||
              key === "entryExit" ||
              key === "circulars" ||
              key === "standards" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "damBalance" ||
              key === "waterAccountingDashboard" ||
              key === "repairs" ||
              key === "repairOperation" ||
              key === "manpowerAndMachinery" ||
              key === "consumables" ||
              key === "repairCosts" ||
              key === "repairsDashboard" ||
              key === "serviceRecords" ||
              key === "serviceAndMaintenanceOperations" ||
              key === "serviceManpowerMachinery" ||
              key === "serviceConsumables" ||
              key === "serviceCosts" ||
              key === "serviceDashboard" ||
              key === "warehouseRocords" ||
              key === "inventory" ||
              key === "performanceRecords" ||
              key === "damPerformance" ||
              key === "damSpecifications" ||
              key === "damPlan" ||
              key === "damConsumables" ||
              key === "studiesRecords" ||
              key === "secondStage" ||
              key === "damSecondStage"
                ? true
                : false)
        );
        break;
        case "اپراتور سامانه":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromChannel" ||
              key === "delivery" ||
              key === "maneuverValvesOfChannelAndTanks" ||
              key === "numberOfWaterLevelOfDeliveryPoints" ||
              key === "flowmeterNumberOfGravityDeliveryPoints" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "services" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "circulars" ||
              key === "standards" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "channelBalance" ||
              key === "waterAccountingDashboard" ||
              key === "repairs" ||
              key === "repairOperation" ||
              key === "manpowerAndMachinery" ||
              key === "consumables" ||
              key === "repairCosts" ||
              key === "repairsDashboard" ||
              key === "serviceRecords" ||
              key === "serviceAndMaintenanceOperations" ||
              key === "serviceManpowerMachinery" ||
              key === "serviceConsumables" ||
              key === "serviceCosts" ||
              key === "serviceDashboard" ||
              key === "warehouseRocords" ||
              key === "inventory"
                ? true
                : false)
        );
        break;
        case "سرپرست مجموعه اول پمپاژ":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "contracts" ||
              key === "firstPumpStationGroup" ||
              key === "requests" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "numberOfFlowMetersOfPumpingStations" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "instantaneousPumping" ||
              key === "dailyPumping" ||
              key === "services" ||
              key === "pumpStationService" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "repair" ||
              key === "pumpingStationRepair" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "operational" ||
              key === "authorities" ||
              key === "circulars" ||
              key === "standards" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationProgram" ||
              key === "waterDelivery" ||
              key === "waterAccountingDashboard"
                ? true
                : false)
        );
        break;
        case "سرپرست مجموعه دوم پمپاژ":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "contracts" ||
              key === "secondPumpStationGroup" ||
              key === "requests" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "numberOfFlowMetersOfPumpingStations" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "instantaneousPumping" ||
              key === "dailyPumping" ||
              key === "services" ||
              key === "pumpStationService" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "repair" ||
              key === "pumpingStationRepair" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "operational" ||
              key === "authorities" ||
              key === "circulars" ||
              key === "standards" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationProgram" ||
              key === "waterDelivery" ||
              key === "waterAccountingDashboard"
                ? true
                : false)
        );
        break;
        case "اپراتور شبکه":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "services" ||
              key === "cleaningAndDredgingFacilities" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "repair" ||
              key === "irrigationNetworkRepair" ||
              key === "visit" ||
              key === "operational" ||
              key === "circulars"
                ? true
                : false)
        );
        break;
        case "اپراتور مجموعه اول پمپاژ":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "numberOfFlowMetersOfPumpingStations" ||
              key === "report" ||
              key === "case" ||
              key === "instantaneousPumping" ||
              key === "dailyPumping" ||
              key === "services" ||
              key === "pumpStationService" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "circulars" ||
              key === "standards"
                ? true
                : false)
        );
        break;
        case "اپراتور مجموعه دوم پمپاژ":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "numberOfFlowMetersOfPumpingStations" ||
              key === "report" ||
              key === "case" ||
              key === "instantaneousPumping" ||
              key === "dailyPumping" ||
              key === "services" ||
              key === "pumpStationService" ||
              key === "serviceAndPartialRepairOfEquipment" ||
              key === "circulars" ||
              key === "standards"
                ? true
                : false)
        );
        break;
        case "مسئول اداری":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "contracts" ||
              key === "firstPumpStationGroup" ||
              key === "secondPumpStationGroup" ||
              key === "irrigationNetworks" ||
              key === "report" ||
              key === "periodic" ||
              key === "case" ||
              key === "security" ||
              key === "GuardShiftSchedule" ||
              key === "visitReport" ||
              key === "letter" ||
              key === "arrived" ||
              key === "issued" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "authorities" ||
              key === "warehouse" ||
              key === "commodityRequest" ||
              key === "entryExit" ||
              key === "circulars" ||
              key === "operationalRecords" ||
              key === "legal" ||
              key === "inventoryAndRealEstateDocuments" ||
              key === "opposite" ||
              key === "petitionDefenseOpinion" ||
              key === "damagesAndFines" ||
              key === "securityOps" ||
              key === "correspondence" ||
              key === "reports" ||
              key === "inspections"
                ? true
                : false)
        );
        break;
        case "مسئول حراست":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromDam" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "maneuveringTheDamValves" ||
              key === "maneuverValvesOfChannelAndTanks" ||
              key === "numberOfWaterLevelOfDeliveryPoints" ||
              key === "report" ||
              key === "case" ||
              key === "security" ||
              key === "GuardShiftSchedule" ||
              key === "visitReport" ||
              key === "letter" ||
              key === "arrived" ||
              key === "issued" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "operational" ||
              key === "authorities" ||
              key === "circulars" ||
              key === "operationalRecords" ||
              key === "securityOps" ||
              key === "performanceRecords" ||
              key === "channelPerformance" ||
              key === "channelPlan" ||
              key === "networkPerformance" ||
              key === "networkPlan"
                ? true
                : false)
        );
        break;
        case "نگهبان سامانه":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromChannel" ||
              key === "delivery" ||
              key === "numberOfWaterLevelOfDeliveryPoints" ||
              key === "report" ||
              key === "case" ||
              key === "security" ||
              key === "GuardShiftSchedule" ||
              key === "visitReport" ||
              key === "circulars" ||
              key === "performanceRecords" ||
              key === "channelPerformance" ||
              key === "channelPlan"
                ? true
                : false)
        );
        break;
        case "نگهبان شبکه":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "maneuverValvesOfChannelAndTanks" ||
              key === "report" ||
              key === "case" ||
              key === "security" ||
              key === "GuardShiftSchedule" ||
              key === "visitReport" ||
              key === "circulars" ||
              key === "operationalRecords" ||
              key === "securityOps" ||
              key === "performanceRecords" ||
              key === "networkPerformance" ||
              key === "networkPlan"
                ? true
                : false)
        );
        break;
        case "نماینده حقوق":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "contracts" ||
              key === "firstPumpStationGroup" ||
              key === "secondPumpStationGroup" ||
              key === "irrigationNetworks" ||
              key === "report" ||
              key === "case" ||
              key === "security" ||
              key === "visitReport" ||
              key === "letter" ||
              key === "arrived" ||
              key === "issued" ||
              key === "meeting" ||
              key === "internal" ||
              key === "foreigner" ||
              key === "visit" ||
              key === "circulars" ||
              key === "operationalRecords" ||
              key === "legal" ||
              key === "inventoryAndRealEstateDocuments" ||
              key === "opposite" ||
              key === "petitionDefenseOpinion" ||
              key === "damagesAndFines"
                ? true
                : false)
        );
        break;
        case "انباردار":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "warehouse" ||
              key === "commodityRequest" ||
              key === "entryExit" ||
              key === "operationalRecords" ||
              key === "warehouseRocords" ||
              key === "inventory" ||
              key === "inOut"
                ? true
                : false)
        );
        break;
        case "نماینده آب منطقه‌ای":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "deliveryMinutes" ||
              key === "repair" ||
              key === "irrigationNetworkRepair" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationCalendarRecords" ||
              key === "irrigationProgram" ||
              key === "waterDeliveryMinutes"
                ? true
                : false)
        );
        break;
        case "نماینده آببران ذهاب جنوبی":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationCalendarRecords" ||
              key === "irrigationProgram"
                ? true
                : false)
        );
        break;
        case "نماینده آببران حومه قراویز":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationCalendarRecords" ||
              key === "irrigationProgram"
                ? true
                : false)
        );
        break;
        case "نماینده آببران بشیوه":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationCalendarRecords" ||
              key === "irrigationProgram"
                ? true
                : false)
        );
        break;
        case "نماینده آببران قلعه شاهین":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationCalendarRecords" ||
              key === "irrigationProgram"
                ? true
                : false)
        );
        break;
        case "نماینده آببران جگرلوی جنوبی":
        Object.keys(newState).forEach(
          (key) =>
            (newState[key] =
              key === "currentAffairs" ||
              key === "requests" ||
              key === "irrigationCalendar" ||
              key === "requestFromChannel" ||
              key === "requestFromPump" ||
              key === "delivery" ||
              key === "farmMeterNumber" ||
              key === "operationalRecords" ||
              key === "waterAccounting" ||
              key === "irrigationCalendarRecords" ||
              key === "irrigationProgram"
                ? true
                : false)
        );
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
