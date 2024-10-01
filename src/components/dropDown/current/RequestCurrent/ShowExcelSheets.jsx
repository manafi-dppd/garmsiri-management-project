import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ShowExcelSheets = ({ fileData }) => {
  const [sheets, setSheets] = useState([]); // ذخیره شیت‌ها
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // ذخیره ایندکس تب انتخابی
  // const [currentSheetIndex, setCurrentSheetIndex] = useState(0); // برای نمایش شیت فعلی
  const [modalIsOpen, setModalIsOpen] = useState(false); // کنترل مودال

  useEffect(() => {
    if (fileData) {
      const workbook = XLSX.read(fileData, { type: "array" });

      // استخراج شیت‌ها از فایل اکسل
      const sheetsData = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        return { name: sheetName, data: jsonSheet };
      });

      setSheets(sheetsData); // ذخیره شیت‌ها در استیت
      setModalIsOpen(true); // باز کردن مودال پس از دریافت فایل اکسل
    }
  }, [fileData]);

  // نمایش جدول شیت فعلی
  const renderSheet = (sheet) => {
    if (!sheet) return null;

    const { data } = sheet;

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
    const iArray = [2, 8, 14, 20, 26]; // ستون‌هایی که باید ادغام شوند
    return (
      <table border="1">
        <thead>
          <tr>
            {Array.from({ length: numberOfColumns }).map((_, index) => {
              // ستون‌هایی که باید ادغام شوند
              const mergeColumns = [2, 8, 14, 20, 26]; // 3، 9، 15، 21، 27 (ایندکس‌ها از 0 شروع می‌شوند)

              if (index === 0) {
                // ادغام ستون‌های 1 و 2
                return (
                  <th
                    key={index}
                    colSpan={2} // ادغام ستون 1 و 2
                    style={{
                      borderBottom: "1px solid black", // رسم border پایین
                      borderRight: "1px solid black", // رسم border سمت راست
                      textAlign: "center", // وسط‌چین کردن متن
                    }}
                  >
                    {data[2][index]} {/* محتوای ستون ادغام‌شده */}
                  </th>
                );
              }

              if (index === 1) {
                return null; // عدم نمایش ستون دوم چون با ستون اول ادغام شده
              }

              if (mergeColumns.includes(index)) {
                // ادغام ستون‌های انتخاب‌شده با 5 ستون بعدی
                return (
                  <th
                    key={index}
                    colSpan={5} // ادغام 5 ستون بعدی
                    style={{
                      borderBottom: "1px solid black", // رسم border در پایین سلول‌ها
                      borderRight: "1px solid black", // رسم border در سمت راست سلول ادغام‌شده
                      textAlign: "center", // وسط‌چین کردن متن
                    }}
                  >
                    {data[2][index]} {/* نمایش محتوای سلول */}
                  </th>
                );
              }

              if (mergeColumns.some((col) => index > col && index <= col + 5)) {
                // عدم نمایش ستون‌های ادغام‌شده
                return null;
              }

              if (shouldRemoveColumn(index)) {
                return null;
              }

              const isEmptyColumn = emptyColumns.includes(index);
              const cellStyle = {
                borderBottom: "1px solid black", // رسم border در پایین سلول‌ها
                borderRight: isEmptyColumn ? "none" : "none", // حذف border سمت راست برای سلول‌هایی که مقدار دارند
              };

              if (isEmptyColumn) {
                return <th key={index} style={cellStyle}></th>; // نمایش سلول خالی
              }

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
                if (
                  // hiddenColumns.includes(cellIndex) ||
                  shouldRemoveColumn(cellIndex)
                ) {
                  return null; // اگر ستون مخفی یا حذف شده باشد، چیزی برنگردانید
                }
                const cellStyle = {
                  borderBottom: "1px solid black", // مرز زیر هر سلول
                  borderRight:
                    rowIndex === 0 ||
                    rowIndex === 1 ||
                    rowIndex === 2 ||
                    rowIndex === 14 ||
                    rowIndex === 15 ||
                    rowIndex === 16
                      ? row[cellIndex]
                        ? "1px solid black"
                        : "none" // فقط اگر سلول مقدار داشته باشد
                      : "1px solid black", // در غیر این صورت همیشه مرز سمت راست رسم شود
                  textAlign: "center", // وسط‌چین کردن متن
                  verticalAlign: "middle", // وسط‌چین کردن عمودی
                };
                return (
                  <td key={cellIndex} style={cellStyle}>
                    {
                      row[cellIndex] === undefined || row[cellIndex] === ""
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            zIndex: 1000, // Ensure this is higher than other elements on the page
            position: "absolute", // To control positioning
            top: "2%", // Adjust the positioning as per your need
            left: "2%",
            right: "2%",
            bottom: "2%",
          },
          overlay: {
            zIndex: 999, // Overlay should also have a high z-index
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          },
        }}
      >
        <Tabs
          selectedIndex={selectedTabIndex}
          onSelect={(index) => setSelectedTabIndex(index)}
        >
          <TabList>
            {sheets.map((sheet, index) => (
              <Tab
                key={index}
                style={{
                  fontWeight: selectedTabIndex === index ? "bold" : "normal", // نوشته تب انتخاب شده ضخیم و بقیه نازک
                  padding: "10px", // فاصله داخلی برای زیبایی بیشتر
                  cursor: "pointer", // تغییر نشانگر به دست برای کلیک روی تب‌ها
                  borderRight: "1px solid gray", // حاشیه سمت راست برای جدا کردن تب‌ها
                  borderBottom:
                    selectedTabIndex === index ? "2px solid black" : "none", // خط زیر تب انتخاب شده برای تاکید
                }}
              >
                {sheet.name}
              </Tab>
            ))}
          </TabList>

          {sheets.map((sheet, index) => (
            <TabPanel key={index}>
              {renderSheet(sheet)} {/* ارسال شیت انتخابی به تابع renderSheet */}
            </TabPanel>
          ))}
        </Tabs>

        <button onClick={() => setModalIsOpen(false)}>بستن</button>
      </Modal>
    </div>
  );
};

export default ShowExcelSheets;
