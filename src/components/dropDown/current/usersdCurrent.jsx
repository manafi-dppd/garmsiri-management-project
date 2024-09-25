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
  const [startDate, setStartDate] = useState(new Date()); // تاریخ اولیه
  const [showCalendars, setShowCalendars] = useState([]); // کنترل نمایش تقویم برای هر سطر

  const handleOpenModal = (position) => {
    setCurrentPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    const { firstName, lastName, phoneNumber, endDate, gender, position } =
      formData;
    const selectedPosition = position[0] || "";

    // Add new row to the table
    setTableRows((prevRows) => [
      ...prevRows,
      { firstName, lastName, phoneNumber, endDate, gender, selectedPosition },
    ]);

    setShowInvitationModal(false);
    setIsModalOpen(false);
  };

  const handleAccessLevelsUpdate = (updatedAccessLevels) => {
    const { position, checkedState } = updatedAccessLevels;
    setAccessLevelsData((prevState) => ({
      ...prevState,
      [position]: checkedState,
    }));
  };

  const handlePositionButtonClick = (position) => {
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

  const handleButtonClick = (index) => {
    setShowCalendars((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index]; // فقط وضعیت همان سطر را تغییر می‌دهد
      return updatedState;
    });
  };

  const handleDateChange = (date, index) => {
    setStartDate(date);
    setTableRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].endDate = date;
      return updatedRows;
    });
    setShowCalendars((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = false; // بستن تقویم پس از انتخاب تاریخ
      return updatedState;
    });
  };

  return (
    <>
      <TabComponent tabs={tabs} activeTabIndex={0} disabledTabIndex={0} />
      <InvitationModal
        show={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        onAccessLevelsUpdate={handleAccessLevelsUpdate}
      />

      <table className="table mt-4">
        <thead>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>تلفن همراه</th>
            <th>تاریخ پایان عضویت</th>
            <th>جنسیت</th>
            <th>سمت</th>
            <th>مجوز</th>
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
                  onClick={() => handleButtonClick(index)} // index را پاس می‌دهیم
                >
                  {new Date(row.endDate).toLocaleDateString("fa-IR")}
                </button>
                {showCalendars[index] && (
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange(date, index)}
                    inline
                  />
                )}
              </td>
              <td>{row.gender}</td>
              <td>{row.selectedPosition}</td>
              <td>
                {row.selectedPosition === "نماینده آب منطقه‌ای" ||
                row.selectedPosition === "نماینده آببران ذهاب جنوبی" ||
                row.selectedPosition === "نماینده آببران حومه قراویز" ||
                row.selectedPosition === "نماینده آببران بشیوه" ||
                row.selectedPosition === "نماینده آببران قلعه شاهین" ||
                row.selectedPosition === "نماینده آببران جگرلوی جنوبی" ||
                row.selectedPosition === "متقاضی مجوزدار" ? (
                  <button className="btn btn-info">مشاهده</button>
                ) : (
                  "نیاز ندارد"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersdCurrent;
