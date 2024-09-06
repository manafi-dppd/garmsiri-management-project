import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AccessLevelModal from "./AccessLevelModal"; // Import the AccessLevelModal component
import DatePickerModal from "./DatePickerModal"; // Import the DatePickerModal component

const InvitationModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    endDate: "",
    position: [],
    gender: "",
    file: null,
    issuer: "",
    letterNumber: "",
    letterDate: "",
    confirmer: "",
  });

  const [isAccessLevelButtonDisabled, setIsAccessLevelButtonDisabled] =
    useState(true);

  const [showFileInput, setShowFileInput] = useState(false);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [listSize, setListSize] = useState(4);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showAccessLevelModal, setShowAccessLevelModal] = useState(false); // State to control the AccessLevelModal

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type, selectedOptions, files } = e.target;
    if (type === "select-multiple") {
      const options = Array.from(selectedOptions).map((option) => option.value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: options,
      }));
      // فعال کردن دکمه ویرایش سطح دسترسی زمانی که انتخاب سمت تغییر می‌کند
      setIsAccessLevelButtonDisabled(false);

      const specialOptions = [
        "نماینده آب منطقه‌ای",
        "نماینده آببران ذهاب جنوبی",
        "نماینده آببران حومه قراویز",
        "نماینده آببران بشیوه",
        "نماینده آببران قلعه شاهین",
        "نماینده آببران جگرلوی جنوبی",
        "متقاضی مجوزدار",
      ];
      const hasSpecialOption = options.some((option) =>
        specialOptions.includes(option)
      );
      setShowFileInput(hasSpecialOption);
      setShowAdditionalInputs(hasSpecialOption);
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSizeChange = (e) => {
    setListSize(Number(e.target.value));
  };

  const isFormValid = () => {
    const {
      lastName,
      phoneNumber,
      gender,
      position,
      file,
      issuer,
      letterNumber,
      letterDate,
      confirmer,
    } = formData;

    const basicValid = lastName && phoneNumber && gender && position.length > 0;

    const specialOptionsSelected = [
      "نماینده آب منطقه‌ای",
      "نماینده آببران ذهاب جنوبی",
      "نماینده آببران حومه قراویز",
      "نماینده آببران بشیوه",
      "نماینده آببران قلعه شاهین",
      "نماینده آببران جگرلوی جنوبی",
      "متقاضی مجوزدار",
    ].some((option) => position.includes(option));

    if (specialOptionsSelected) {
      return (
        basicValid && file && issuer && letterNumber && letterDate && confirmer
      );
    }

    return basicValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData);
    }
  };

  const modalClass = showAdditionalInputs ? "modal-lg" : "modal-md";
  

  const toggleAccessLevelModal = () => {
    setShowAccessLevelModal((prevState) => !prevState);
  };

  const toggleDatePickerModal = () => {
    setShowDatePickerModal((prevState) => !prevState);
  };

  const handleDateSelect = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      letterDate: date,
    }));
  };

  const handleAccessLevelSubmit = () => {
    // setIsAccessLevelButtonDisabled(true); // غیرفعال کردن دکمه پس از ثبت تغییرات سطح دسترسی
    setShowAccessLevelModal(false); // بستن پنجره سطح دسترسی
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className={`modal-dialog ${modalClass}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">دعوتنامه</h5>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={onClose}
              style={{ position: "absolute", left: "10px" }} // تنظیم مکان دقیق دکمه
            ></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                
                <div
                  className={`col-12 ${
                    showAdditionalInputs ? "col-md-6" : "col-md-12"
                  }`}                  
                >
                  <form onSubmit={handleSubmit} className="text-end">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        نام
                      </label>
                      <input
                        type="text"
                        className="form-control text-end"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        className="form-control text-end"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">
                        تلفن همراه
                      </label>
                      <input
                        type="tel"
                        className="form-control text-end"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">
                        تاریخ پایان عضویت
                      </label>
                      <input
                        type="date"
                        className="form-control text-end"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        min={today}
                      />
                    </div>

                    <div className="mb-3 d-flex flex-row">
                      <label className="form-label">جنسیت:</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label" htmlFor="male">
                            مرد
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label" htmlFor="female">
                            زن
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-baseline mb-3">
                      <div className="flex-grow-1">
                        <label htmlFor="position" className="form-label">
                          سمت
                        </label>
                        <select
                          className="form-select text-end"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          multiple
                          size={listSize}
                          required
                        >
                          <option value="ادمین وبسایت">ادمین وبسایت</option>
                          <option value="مدیر بهره‌برداری">
                            مدیر بهره‌برداری
                          </option>
                          <option value="مدیران مرتبط آب نیرو">
                            مدیران مرتبط آب نیرو
                          </option>
                          <option value="مدیران مرتبط وزارت نیرو">
                            مدیران مرتبط وزارت نیرو
                          </option>
                          <option value="ناظر برق و پمپاژ">
                            ناظر برق و پمپاژ
                          </option>
                          <option value="نماینده اجرا">نماینده اجرا</option>
                          <option value="اپراتور سد">اپراتور سد</option>
                          <option value="اپراتور سامانه">اپراتور سامانه</option>
                          <option value="سرپرست مجموعه اول پمپاژ">
                            سرپرست مجموعه اول پمپاژ
                          </option>
                          <option value="سرپرست مجموعه دوم پمپاژ">
                            سرپرست مجموعه دوم پمپاژ
                          </option>
                          <option value="اپراتور مجموعه اول پمپاژ">
                            اپراتور مجموعه اول پمپاژ
                          </option>
                          <option value="اپراتور مجموعه دوم پمپاژ">
                            اپراتور مجموعه دوم پمپاژ
                          </option>
                          <option value="اپراتور شبکه">اپراتور شبکه</option>
                          <option value="مسئول اداری">مسئول اداری</option>
                          <option value="مسئول حراست">مسئول حراست</option>
                          <option value="نگهبان سامانه">نگهبان سامانه</option>
                          <option value="نماینده حقوق">نماینده حقوقی</option>
                          <option value="انباردار">انباردار</option>
                          <option value="نماینده آب منطقه‌ای">
                            نماینده آب منطقه‌ای
                          </option>
                          <option value="نماینده آببران ذهاب جنوبی">
                            نماینده آببران ذهاب جنوبی
                          </option>
                          <option value="نماینده آببران حومه قراویز">
                            نماینده آببران حومه قراویز
                          </option>
                          <option value="نماینده آببران بشیوه">
                            نماینده آببران بشیوه
                          </option>
                          <option value="نماینده آببران قلعه شاهین">
                            نماینده آببران قلعه شاهین
                          </option>
                          <option value="نماینده آببران جگرلوی جنوبی">
                            نماینده آببران جگرلوی جنوبی
                          </option>
                          <option value="متقاضی مجوزدار">متقاضی مجوزدار</option>
                        </select>
                      </div>
                      <div className="me-3">
                        <input
                          type="number"
                          className="form-control text-end"
                          id="listSize"
                          name="listSize"
                          value={listSize}
                          onChange={handleSizeChange}
                          min="1"
                          max="20"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={isAccessLevelButtonDisabled}
                        onClick={toggleAccessLevelModal}
                      >
                        ویرایش سطح دسترسی
                      </button>
                      {/* <AccessLevelModal
                        show={showAccessLevelModal}
                        onClose={toggleAccessLevelModal}
                        // onAccessLevelSubmit={handleAccessLevelSubmit} // ارسال تابع به AccessLevelModal
                      /> */}
                    </div>
                  </form>
                </div>
                {showAdditionalInputs && (
                  <div
                    className="col-12 col-md-6  position-relative"
                    style={{
                      top: 0,
                      left: 0,
                      borderRight: "1px solid #ccc",
                      backgroundColor: "white",
                      height: "100%",
                      zIndex: 1,
                    }}
                  >
                    <form>
                      <div className="mb-3 text-end">
                        <label htmlFor="file" className="form-label">
                          آپلود معرفی‌نامه
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="file"
                          name="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleChange}
                          required={showFileInput}
                        />
                      </div>

                      <div className="mb-3 text-end">
                        <label htmlFor="issuer" className="form-label">
                          صادرکننده معرفی‌نامه
                        </label>
                        <input
                          list="issuerOptions"
                          type="text"
                          className="form-control text-end"
                          id="issuer"
                          name="issuer"
                          value={formData.issuer}
                          onChange={handleChange}
                          required
                        />
                        <datalist id="issuerOptions">
                          <option value="شرکت آب منطقه‌ای کرمانشاه" />
                          <option value="سازمان جهاد کشاورزی استان کرمانشاه" />
                        </datalist>
                      </div>

                      <div className="mb-3 text-end">
                        <label htmlFor="letterNumber" className="form-label">
                          شماره معرفی‌نامه
                        </label>
                        <input
                          type="text"
                          className="form-control text-end"
                          id="letterNumber"
                          name="letterNumber"
                          value={formData.letterNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3 text-end">
                        <span className="ms-2 mx-2">{formData.letterDate}</span>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={toggleDatePickerModal}
                        >
                          تاریخ معرفی‌نامه{" "}
                        </button>
                      </div>

                      <div className="mb-3 text-end">
                        <label htmlFor="confirmer" className="form-label">
                          تاییدکننده
                        </label>
                        <input
                          type="text"
                          className="form-control text-end"
                          id="confirmer"
                          name="confirmer"
                          value={formData.confirmer}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </form>
                  </div>
                )}
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
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              ارسال دعوتنامه
            </button>
          </div>
        </div>
      </div>
      {showDatePickerModal && (
        <DatePickerModal
          show={showDatePickerModal}
          onClose={toggleDatePickerModal}
          onDateSelect={handleDateSelect}
          selectedDate={formData.letterDate}
        />
      )}
      {showAccessLevelModal && (
        <AccessLevelModal
          show={showAccessLevelModal}
          onClose={toggleAccessLevelModal}
          onAccessLevelSubmit={handleAccessLevelSubmit}
        />
      )}
    </div>
  );
};

export default InvitationModal;