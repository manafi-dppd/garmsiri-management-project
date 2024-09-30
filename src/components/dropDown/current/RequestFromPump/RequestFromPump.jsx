import React, { useState } from "react";
import * as XLSX from "xlsx";
import Modal from "react-modal";

const RequestFromPump = () => {
  const [sheets, setSheets] = useState([]); // ذخیره شیت‌ها
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0); // برای نمایش شیت فعلی
  const [modalIsOpen, setModalIsOpen] = useState(false); // کنترل مودال

  // تابع برای پردازش فایل اکسل
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // اگر فایلی انتخاب نشده است، از تابع خارج شو
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // استخراج همه شیت‌ها
      const sheetsData = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        // تبدیل شیت به JSON
        const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        return {
          name: sheetName,
          data: jsonSheet,
          hiddenColumns: findHiddenColumns(sheet),
        };
      });

      setSheets(sheetsData); // ذخیره داده‌های شیت‌ها
      setModalIsOpen(true); // باز کردن مودال
    };

    reader.readAsArrayBuffer(file);
  };

  // تابع برای پیدا کردن ستون‌های مخفی
  const findHiddenColumns = (sheet) => {
    let hiddenCols = [];
    for (let col in sheet) {
      if (sheet[col] && sheet[col].hidden) {
        hiddenCols.push(XLSX.utils.decode_col(col));
      }
    }
    return hiddenCols;
  };

  // تابع برای تغییر شیت
  const changeSheet = (direction) => {
    if (direction === "next" && currentSheetIndex < sheets.length - 1) {
      setCurrentSheetIndex(currentSheetIndex + 1);
    } else if (direction === "prev" && currentSheetIndex > 0) {
      setCurrentSheetIndex(currentSheetIndex - 1);
    }
  };

  // نمایش جدول شیت فعلی
  const renderCurrentSheet = () => {
    if (sheets.length === 0) return null;

    const { data, hiddenColumns } = sheets[currentSheetIndex];

    // تابع برای تعیین اینکه آیا ستون باید حذف شود
    const shouldRemoveColumn = (index) => {
      // آرایه‌ای از ایندکس‌های ستون‌هایی که باید حذف شوند
      const columnsToRemove = [7, 13, 19, 25, 31];
      return columnsToRemove.includes(index); // اگر ستون در آرایه باشد، حذف می‌شود
    };

    // ستون‌هایی که باید با فرمت ساعت نمایش داده شوند
    const timeColumns = [4, 5, 10, 11, 16, 17, 22, 23, 28, 29];

    // ستون‌هایی که باید با یک رقم اعشار نمایش داده شوند
    const decimalColumns = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

    // تابع برای فرمت کردن به فرمت ساعت (hh:mm)
    const formatTime = (value) => {
      const time = parseFloat(value) * 24;
      if (isNaN(time)) return value; // اگر مقدار عددی نبود، همان مقدار اصلی را برگرداند

      const hours = Math.floor(time) + 1;
      const minutes = Math.round((time - hours) * 60);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    };

    // تابع برای تعیین اینکه آیا ستون باید به فرمت ساعت نمایش داده شود
    const shouldFormatAsTime = (index) => {
      return timeColumns.includes(index);
    };

    // تابع برای تعیین اینکه آیا ستون باید با یک رقم اعشار نمایش داده شود
    const shouldFormatAsDecimal = (index) => {
      return decimalColumns.includes(index);
    };

    return (
      <table border="1">
        <thead>
          <tr>
            {data[2].map((col, index) =>
              hiddenColumns.includes(index) ||
              shouldRemoveColumn(index) ||
              col === undefined ||
              col === "" ? null : ( // بررسی خالی بودن سلول هدر
                <th key={index}>{col}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {data.slice(3, 19).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                hiddenColumns.includes(cellIndex) ||
                shouldRemoveColumn(cellIndex) ? null : (
                  <td key={cellIndex}>
                    {cell === undefined || cell === ""
                      ? "" // سلول خالی نمایش داده شود
                      : shouldFormatAsTime(cellIndex)
                      ? formatTime(cell) // نمایش به فرمت ساعت (hh:mm)
                      : shouldFormatAsDecimal(cellIndex)
                      ? parseFloat(cell).toFixed(1) // نمایش با یک رقم اعشار
                      : cell // مقدار اصلی سلول
                    }
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // تابع برای تعیین ستون‌های قابل ویرایش
  const isEditableColumn = (columnIndex) => {
    const editableColumns = ["تعداد پمپ", "دبی درخواستی", "از", "تا"];
    return editableColumns.includes(sheets[0].data[0][columnIndex]);
  };

  return (
    <div>
      <h3>فایل اکسل خود را بارگذاری کنید</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>{sheets[currentSheetIndex]?.name}</h2>
        <button
          onClick={() => changeSheet("prev")}
          disabled={currentSheetIndex === 0}
        >
          &lt; شیت قبلی
        </button>
        <button
          onClick={() => changeSheet("next")}
          disabled={currentSheetIndex === sheets.length - 1}
        >
          شیت بعدی &gt;
        </button>

        {renderCurrentSheet()}

        <button onClick={() => setModalIsOpen(false)}>بستن مودال</button>
      </Modal>
    </div>
  );
};

export default RequestFromPump;
