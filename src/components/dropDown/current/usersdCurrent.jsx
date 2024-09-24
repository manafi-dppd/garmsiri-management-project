import React, { useState } from "react";
import TabComponent from "../../tabComponent";
import InvitationModal from "./usersdCurrent/invitationModal";
import AccessLevelModal from "./usersdCurrent/AccessLevelModal"; // وارد کردن کامپوننت AccessLevelModal
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UsersdCurrent = ({ userData, row, index }) => {
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [tableRows, setTableRows] = useState([]); // State to manage table rows

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessLevelsData, setAccessLevelsData] = useState({}); // State to hold access levels
  const [currentPosition, setCurrentPosition] = useState(""); // ذخیره سمت فعلی

  const handleOpenModal = (position) => {
    setCurrentPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Extract lastName and position (first selected position)
    const { firstName, lastName, phoneNumber, endDate, gender, position } =
      formData;
    const selectedPosition = position[0] || "";

    // Add new row to the table
    setTableRows((prevRows) => [
      ...prevRows,
      { firstName, lastName, phoneNumber, endDate, gender, selectedPosition },
    ]);

    // Close the InvitationModal
    setShowInvitationModal(false);
    console.log("Form Data:", formData);

    setIsModalOpen(false);
  };

  const handleAccessLevelsUpdate = (updatedAccessLevels) => {
    const { position, checkedState } = updatedAccessLevels; // Ensure we're using checkedState from AccessLevelModal

    // Store the access levels for the given position
    setAccessLevelsData((prevState) => ({
      ...prevState,
      [position]: checkedState,
    }));
    console.log("Form Data:", updatedAccessLevels);

    console.log(
      `Access levels updated for position ${position}:`,
      checkedState
    );
  };

  const handlePositionButtonClick = (position) => {
    // Fetch the access levels for the clicked position
    const accessLevelsForPosition = accessLevelsData[position];

    if (accessLevelsForPosition) {
      console.log(
        "Checkbox States for Position:",
        position,
        accessLevelsForPosition
      );
    } else {
      console.log(`No access levels found for position: ${position}`);
    }
  };

  const tabs = [
    {
      label: "امور جاری/مدیریت مرورگر",
      content: (
        <div className="d-flex justify-content-start">
          <button className="btn btn-primary mt-3" onClick={handleOpenModal}>
            ارسال دعوتنامه
          </button>
        </div>
      ),
    },
  ];
  const [startDate, setStartDate] = useState(new Date()); // تاریخ اولیه
  const [showCalendar, setShowCalendar] = useState(false); // کنترل نمایش تقویم

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar); // با کلیک، وضعیت تقویم را تغییر می‌دهیم (باز یا بسته)
  };

  const handleDateChange = (date, index) => {
    setStartDate(date);
    setTableRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].endDate = date.toLocaleDateString("fa-IR"); // فرمت شمسی
      return updatedRows;
    });
    setShowCalendar(false); // بستن تقویم پس از انتخاب تاریخ
  };

  return (
    <>
      <TabComponent tabs={tabs} activeTabIndex={0} disabledTabIndex={0} />
      <InvitationModal
        show={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        onAccessLevelsUpdate={handleAccessLevelsUpdate} // Pass the function
      />

      {/* Render the table below the "Send Invitation" button */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>تلفن همراه</th>
            <th>تاریخ پایان عضویت</th>
            <th>جنسیت</th>
            <th>سمت</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.phoneNumber}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={handleButtonClick} // index را به عنوان مقدار برای کنترل نمایش تقویم پاس می‌دهیم
                >
                  {row.endDate}
                </button>
                {showCalendar && (
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange(date, index)} // بروز‌رسانی تاریخ برای سطر مشخص‌شده
                    inline // این گزینه باعث می‌شود تقویم در همان مکان نمایش داده شود
                  />
                )}
              </td>
              <td>{row.gender}</td>
              <td>{row.selectedPosition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersdCurrent;
