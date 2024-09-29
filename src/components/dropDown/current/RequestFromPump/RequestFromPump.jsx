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

    // بدست آوردن تعداد ستون‌ها از اولین ردیف
    const numberOfColumns = data[6].length; // طول اولین ردیف نشان‌دهنده تعداد ستون‌ها است
    console.log("تعداد ستون‌ها:", numberOfColumns); // نمایش تعداد ستون‌ها در کنسول

    // تابع برای تعیین اینکه آیا ستون باید حذف شود
    const shouldRemoveColumn = (index) => {
      const columnsToRemove = [];
      // آرایه‌ای از ایندکس‌های ستون‌هایی که باید حذف شوند
      for (let i = 7; i <= numberOfColumns - 4; i += 6) {
        columnsToRemove.push(i);
      }
      return columnsToRemove.includes(index) || index >= numberOfColumns - 4; // اگر ستون در آرایه باشد، حذف می‌شود
    };

    // ستون‌هایی که باید با فرمت ساعت نمایش داده شوند
    const timeColumns = []; // آرایه خالی برای مقداردهی

    // استفاده از حلقه for برای مقداردهی
    for (let i = 4; i <= numberOfColumns - 6; i += 6) {
      timeColumns.push(i); // افزودن اولین مقدار جفت
      timeColumns.push(i + 1); // افزودن دومین مقدار جفت
    }

    // ستون‌هایی که باید با یک رقم اعشار نمایش داده شوند
    const decimalColumns = []; // آرایه خالی برای مقداردهی

    // استفاده از حلقه for برای مقداردهی
    for (let i = 3; i <= numberOfColumns - 4; i += 3) {
      decimalColumns.push(i); // هر مقدار را 3 واحد بیشتر می‌کنیم و به آرایه اضافه می‌کنیم
    }

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
    // آرایه‌ای برای ذخیره ایندکس ستون‌های خالی
    let emptyColumns = [];

    // بررسی تمام ستون‌ها در ردیف 3 (ایندکس 2) و پیدا کردن ستون‌های خالی
    for (let index = 0; index < numberOfColumns; index++) {
      const cell = data[2][index];
      if (cell === undefined || cell === "") {
        console.log(`ستون ${index} در ردیف 3 خالی است`);
        emptyColumns.push(index); // اضافه کردن ایندکس ستون خالی به آرایه
      }
    }

    return (
      <table border="1">
        <thead>
          <tr>
            {Array.from({ length: numberOfColumns }).map((_, index) => {
              // بررسی اینکه آیا ستون باید مخفی شود یا حذف شود
              if (hiddenColumns.includes(index) || shouldRemoveColumn(index)) {
                return null;
              }

              // بررسی اینکه آیا ستون خالی است یا نه
              const isEmptyColumn = emptyColumns.includes(index);
              const cellStyle = {
                borderBottom: "1px solid black", // مرز زیر هر سلول
                borderRight: !isEmptyColumn ? "1px solid black" : "none", // مرز راست برای سلول‌هایی که مقدار دارند
                // textAlign: "center", // وسط‌چین کردن متن
                // verticalAlign: "middle", // وسط‌چین کردن عمودی
              };

              // اگر ستون خالی باشد، یک سلول خالی را برگردانید
              if (isEmptyColumn) {
                return <th key={index} style={cellStyle}></th>; // نمایش سلول خالی با مرز زیرین
              }

              // در غیر این صورت، فقط مقدار سلول فعلی را نمایش دهید
              return (
                <th key={index} style={cellStyle}>
                  {data[2][index]}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
  {data.slice(3, 20).map((row, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: numberOfColumns }).map((_, cellIndex) => {
        if (hiddenColumns.includes(cellIndex) || shouldRemoveColumn(cellIndex)) {
          return null; // اگر ستون مخفی یا حذف شده باشد، چیزی برنگردانید
        }

        // استایل‌های مرز برای سلول
        const cellStyle = {
          borderBottom: "1px solid black", // مرز زیر هر سلول
          borderRight: row[cellIndex] ? "1px solid black" : "none", // مرز راست برای سلول‌هایی که مقدار دارند
          textAlign: "center", // وسط‌چین کردن متن
          verticalAlign: "middle", // وسط‌چین کردن عمودی
        };

        return (
          <td key={cellIndex} style={cellStyle}>
            {row[cellIndex] === undefined || row[cellIndex] === ""
              ? "" // سلول خالی نمایش داده شود
              : shouldFormatAsTime(cellIndex)
              ? formatTime(row[cellIndex]) // نمایش به فرمت ساعت (hh:mm)
              : (rowIndex === 0 ||
                  rowIndex === 14 ||
                  rowIndex === 15 ||
                  rowIndex === 16) &&
                cellIndex !== 0 // بررسی ایندکس‌های خاص برای ردیف‌های 16، 17 و 18
              ? parseFloat(row[cellIndex])
                  .toFixed(1)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // نمایش با یک رقم اعشار و جداکننده
              : shouldFormatAsDecimal(cellIndex) &&
                rowIndex !== 1 &&
                rowIndex !== 2
              ? parseFloat(row[cellIndex]).toFixed(1) // نمایش با یک رقم اعشار
              : row[cellIndex] // مقدار اصلی سلول
            }
          </td>
        );
      })}
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
