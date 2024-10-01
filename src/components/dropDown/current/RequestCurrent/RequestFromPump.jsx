import React, { useState } from "react";
import ShowExcelSheets from "./ShowExcelSheets"; // فرض بر این است که این کامپوننت در فایل دیگری است
import "bootstrap/dist/css/bootstrap.min.css";
import ProgramList from "./ProgramList";

const RequestFromPump = () => {
  const [selectedOption, setSelectedOption] = useState("upload"); // وضعیت دکمه رادیویی
  const [cropSeason, setCropSeason] = useState("پاییزه"); // وضعیت دوره کشت
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // تغییر گزینه انتخاب شده
  };
  const [fileData, setFileData] = useState(null);

  // تابع برای پردازش فایل اکسل
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // پردازش فایل به این صورت که فایل خوانده و سپس به ShowExcelSheets داده می‌شود
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        setFileData(data); // ذخیره داده‌های فایل اکسل در استیت
      };
      reader.readAsArrayBuffer(file); // فایل به صورت ArrayBuffer خوانده می‌شود
    }
  };

  return (
    <div>
      <div class="d-flex d-inline align-items-center mb-4">
        <div className="col col-12 col-xl-3">
          <div
            className="form-group d-flex flex-row my-0 justify-content-around container container-fluid"
            action="/action_page.php"
          >
            <label for="plain" className="form-label mb-0 align-content-center">
              ایستگاه پمپاژ
            </label>
            <select
              className="form-select"
              style={{ width: "65%" }}
              id="plain"
              name="plain"
            >
              <option hidden>انتخاب کنید</option>
              <option>ذهاب شمالی</option>
              <option>ذهاب جنوبی</option>
              <option>حومه قراویز</option>
              <option>بشیوه1</option>
              <option>بشیوه2</option>
              <option>قلعه‌شاهین1</option>
              <option>قلعه‌شاهین2</option>
              <option>جگرلوی جنوبی</option>
            </select>
          </div>
        </div>
        <div className="col col-12 col-xl-3">
          <div
            className="form-group d-flex flex-row my-0 d-flex justify-content-around container container-fluid"
            action="/action_page.php"
          >
            <label for="year" className="form-label mb-0 align-content-center">
              سال زراعی
            </label>
            <select
              class="form-select"
              style={{ width: "65%" }}
              id="year"
              name="year"
            >
              <option>1403-1404</option>
            </select>
          </div>
        </div>

        <div className="col col-12 col-xl-3">
          <div
            className="form-group d-flex flex-row my-0 d-flex justify-content-around container container-fluid"
            action="/action_page.php"
          >
            <label
              for="period"
              className="form-label mb-0 align-content-center"
            >
              دوره کشت
            </label>
            <select
              className="form-select"
              style={{ width: "65%" }}
              id="period"
              name="period"
              value={cropSeason}
              onChange={(e) => setCropSeason(e.target.value)}
            >
              <option value="پاییزه">پاییزه</option>
              <option value="تابستانه">تابستانه</option>
            </select>
          </div>
        </div>
      </div>
      <div className= "py-3" style={{ boxShadow: "-5px 7px 25px #48d45f", backgroundColor: "#a7e7bc" }}>
        <div className="d-flex flex-row mb-1">
          <h5>نحوه ارسال برنامه:</h5>
          <div className="mb-2 mx-2">
            <label>
              <input
                type="radio"
                className="form-check-input"
                value="upload"
                checked={selectedOption === "upload"}
                onChange={handleOptionChange}
              />
              فایل اکسل
            </label>
            <label className="mx-2">
              <input
                type="radio"
                className="form-check-input mx-1"
                value="form"
                checked={selectedOption === "form"}
                onChange={handleOptionChange}
              />
              تکمیل فرم
            </label>
          </div>
        </div>

        {selectedOption === "upload" && (
          <>
            <input
              className="form-control"
              type="file"
              accept=".xlsx, .xls"
              id="formFile"
              onChange={handleFileUpload}
            />
            {/* نمایش ShowExcelSheets در صورتی که فایل داده داشته باشد */}
            {fileData && (
              <div style={{ position: "relative", zIndex: 2 }}>
                <ShowExcelSheets fileData={fileData} />
              </div>
            )}
          </>
        )}

        {selectedOption === "form" && (
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => alert("تکمیل فرم")}
            >
              تکمیل فرم
            </button>
          </div>
        )}
      </div>
      <ProgramList cropSeason={cropSeason} />{" "}
      {/* ارسال دوره کشت به کامپوننت ExcelTable */}
    </div>
  );
};

export default RequestFromPump;
