import React from "react";

const Users = ({ submittedData }) => {
  return (
    <>
      {submittedData && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">اطلاعات ثبت‌شده</h5>
            <p className="card-text">
              <strong>نام:</strong> {submittedData.firstName}
            </p>
            <p className="card-text">
              <strong>نام خانوادگی:</strong> {submittedData.lastName}
            </p>
            <p className="card-text">
              <strong>کد ملی:</strong> {submittedData.nationalCode}
            </p>
            <p className="card-text">
              <strong>تلفن همراه:</strong> {submittedData.phoneNumber}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
