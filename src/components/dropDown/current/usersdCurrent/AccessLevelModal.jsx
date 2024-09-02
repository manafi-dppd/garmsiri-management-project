import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentAffairs from "./AccessLevelModal/CurrentAffairs"; // کامپوننت "امور جاری"
import OperationalRecords from "./AccessLevelModal/OperationalRecords"; // کامپوننت جدید "سوابق بهره‌برداری"
import PerformanceRecords from "./AccessLevelModal/PerformanceRecords";
import StudiesRecords from "./AccessLevelModal/StudiesRecords";

const AccessLevelModal = ({ show, onClose }) => {
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
    console.log("Current Checkbox States:", checkedState);
    // کدهای مربوط به عملیات ثبت اطلاعات سطح دسترسی
    onClose(); // بستن پنجره
    // gatherAllCheckBoxes(); // نمایش وضعیت چک‌باکس‌ها در کنسول
    // onAccessLevelSubmit(); // غیرفعال کردن دکمه و بستن پنجره
    
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
              <div className="col-12 col-md-6 col-lg-4 border-start border-bottom mb-3">
                <CurrentAffairs
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 border-start border-bottom mb-3">
                <OperationalRecords
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-2 border-start border-bottom mb-3">
                <PerformanceRecords
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 border-bottom">
                <StudiesRecords
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
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
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessLevelModal;
