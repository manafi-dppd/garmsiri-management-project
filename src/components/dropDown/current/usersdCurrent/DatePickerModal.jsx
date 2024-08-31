import React, { useState, useEffect } from "react";

const DatePickerModal = ({ show, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
  const years = Array.from({ length: 10 }, (_, i) => i + 1400);

  const PersianNumber = (num) => {
    const persianNumbers = [
      '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹',
    ];
    return num.toString().replace(/\d/g, (match) => persianNumbers[match]);
  };

  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${PersianNumber(year)}/${PersianNumber(month)}/${PersianNumber(day)}`;
      setSelectedDate(formattedDate);
    }
  }, [day, month, year]);

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
    }
    onClose();
  };

  const handleDelete = () => {
    setSelectedDate("");
    setDay("");
    setMonth("");
    setYear("");
    onDateSelect(""); // Clear the date in InvitationModalCo as well
    onClose();
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg">
              <div className="flex flex-row justify-between w-full mb-4">
                <select
                  className="w-1/3 p-2 border border-gray-300 rounded-lg"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">روز</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {PersianNumber(day)}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/3 p-2 border border-gray-300 rounded-lg"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">ماه</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/3 p-2 border border-gray-300 rounded-lg"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">سال</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {PersianNumber(year)}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-4">تاریخ انتخاب شده: {selectedDate}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleDelete}>
              حذف
            </button>
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
