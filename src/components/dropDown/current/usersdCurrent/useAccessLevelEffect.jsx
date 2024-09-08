// useAccessLevelEffect.js

import { useEffect } from "react";

const useAccessLevelEffect = (
  selectedPosition,
  setCheckedState,
  // setDisabledState
) => {
  useEffect(() => {
    // تعریف آرایه با مقادیر پیش‌فرض false
    const initialState = {
      currentAffairs: false,
      operationalRecords: false,
      contracts: false,
      requests: false,
      report: false,
      services: false,
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
      warehouseRecords: false,
      legal: false,
      reports: false,
      inspections: false,
      securityOps: false,
      // فرزندان
      firstPumpStationGroup: false,
      requestFromDam: false,
    };

    // کپی از وضعیت اولیه
    const newState = { ...initialState };
    const disabledState = { ...initialState }; // وضعیت غیرفعال بودن


    switch (selectedPosition) {
      case "ادمین وبسایت":
        Object.keys(newState).forEach(key => newState[key] = true);
        Object.keys(disabledState).forEach(key => disabledState[key] = false);
        break;
      case "مدیر بهره‌برداری":
        // فقط دو چک‌باکس فعال بمانند
        newState.firstPumpStationGroup = true;
        newState.requestFromDam = true;
        Object.keys(disabledState).forEach(key => disabledState[key] = key !== 'firstPumpStationGroup' && key !== 'requestFromDam');
        break;
      case "مدیران مرتبط آب نیرو":
        Object.keys(newState).forEach(key => newState[key] = key === 'currentAffairs' ? false : true);
        break;
      case "مدیران مرتبط وزارت نیرو":
        Object.keys(newState).forEach(key => newState[key] = false);
        newState.waterAccounting = true;
        newState.maintenance = true;
        break;
      default:
        break;
    }

    // به‌روزرسانی وضعیت با مقادیر جدید
    setCheckedState(newState);
    // setDisabledState(disabledState);
    console.log("Checkbox States:", newState); // نمایش مقادیر در کنسول
  }, [selectedPosition, setCheckedState]);
};

export default useAccessLevelEffect;
