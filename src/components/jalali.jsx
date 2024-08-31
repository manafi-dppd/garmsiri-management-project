import React, { useState } from 'react';

interface Props {
}

const PersianDatePicker: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const days = ['یکشنبه', 'دو��نبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  const today = new Date();
  const persianToday = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(today);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">تاریخ</h1>
      <input type="text" value={selectedDate || persianToday} className="w-full p-2 border border-gray-300 rounded" onClick={handleToggle} />
      {isOpen && (
        <div className="absolute bg-white shadow-md rounded p-4">
          <div className="flex justify-between mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDateChange(persianToday)}>امروز</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <span key={index} className="text-center">{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {[...Array(30).keys()].map((day) => (
              <button key={day} className="p-2 border border-gray-300 rounded" onClick={() => handleDateChange(`${day + 1} ${months[today.getMonth()]} ${today.getFullYear()}`)}>{day + 1}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersianDatePicker;