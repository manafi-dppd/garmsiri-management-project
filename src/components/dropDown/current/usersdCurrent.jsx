import React, { useState } from "react";
import TabComponent from "../../tabComponent";
import InvitationModal from "./usersdCurrent/invitationModal";
import AccessLevelModal from "./usersdCurrent/AccessLevelModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UsersdCurrent = ({ userData, row, index }) => {
  const [checkedStates, setCheckedStates] = useState([]); // State برای ذخیره checked states
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessLevelsData, setAccessLevelsData] = useState({});
  const [currentPosition, setCurrentPosition] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendars, setShowCalendars] = useState([]);
  const [showAccessLevelModal, setShowAccessLevelModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [checkedState, setCheckedState] = useState({});

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null); // ایندکس سطر مورد نظر برای حذف
  const [selectedUser, setSelectedUser] = useState(null); // ذخیره اطلاعات کاربر انتخاب شده

  const handleDeleteClick = (row) => {
    setSelectedUser(row); // ذخیره سطر انتخاب شده
    setRowToDelete(row.index); // ذخیره ایندکس سطر انتخاب شده
    setShowDeleteWarning(true); // نمایش هشدار حذف
  };

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
      const selectedPositions = position.join(" / ");

    setTableRows((prevRows) => [
      ...prevRows,
      { firstName, lastName, phoneNumber, endDate, gender, selectedPositions },
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

  const handleAccessLevelButtonClick = (index) => {
    setSelectedRowIndex(index);
    setCheckedState(accessLevelsData[tableRows[index].selectedPosition] || {});
    setShowAccessLevelModal(true);
  };

  const handleAccessLevelSubmit = (checkedState) => {
    setTableRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[selectedRowIndex].accessLevel = checkedState;
      return updatedRows;
    });
    setShowAccessLevelModal(false);
  };

  const handleDeleteButtonClick = (index) => {
    setRowToDelete(index);
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    setTableRows(
      (prevRows) => prevRows.filter((_, index) => index !== rowToDelete) // استفاده از rowToDelete
    );
    setShowDeleteWarning(false); // بستن هشدار
  };

  const cancelDelete = () => {
    setShowDeleteWarning(false);
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
      updatedState[index] = !updatedState[index];
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
      updatedState[index] = false;
      return updatedState;
    });
  };
  const today = new Date(); // تاریخ امروز
  const handleCheckedStateUpdate = (checkedState) => {
    setCheckedStates((prev) => {
      const newStates = [...prev];
      newStates[selectedRowIndex] = checkedState; // به روز رسانی وضعیت برای ردیف انتخابی
      return newStates;
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
        onCheckedStateUpdate={handleCheckedStateUpdate} // ارسال تابع به کامپوننت
      />

      <AccessLevelModal
        show={showAccessLevelModal}
        onClose={() => setShowAccessLevelModal(false)}
        onAccessLevelSubmit={handleAccessLevelSubmit}
        checkedState={checkedState[selectedRowIndex]}
      />

      {showDeleteWarning && selectedUser && (
        <div className="alert alert-warning">
          <p>
            آیا از حذف {selectedUser.gender === "مرد" ? "آقای" : selectedUser.gender === "زن" ? "خانم" : "خانم/آقای"}{" "}
            {selectedUser.firstName} {selectedUser.lastName} مطمئن هستید؟
          </p>
          <button className="btn btn-danger" onClick={confirmDelete}>
            بله
          </button>
          <button className="btn btn-secondary" onClick={cancelDelete}>
            خیر
          </button>
        </div>
      )}

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
            <th>سطح دسترسی</th>
            <th>حذف</th> {/* اضافه کردن ستون حذف */}
            <th>مرحله ثبت‌نام</th>
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
                  onClick={() => handleButtonClick(index)}
                >
                  {new Date(row.endDate).toLocaleDateString("fa-IR")}
                </button>
                {showCalendars[index] && (
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange(date, index)}
                    inline
                    minDate={today} // فقط تاریخ امروز و بعد از آن قابل انتخاب هستند
                  />
                )}
              </td>
              <td>{row.gender}</td>
              <td>{row.selectedPositions}</td>
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
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAccessLevelButtonClick(index)}
                >
                  سطح دسترسی
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick({ ...row, index })} // ارسال اطلاعات سطر و ایندکس
                >
                  حذف
                </button>
              </td>
              <td>ارسال دعوتنامه</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersdCurrent;
