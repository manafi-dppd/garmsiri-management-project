import React from "react";
import TabComponent from "../../tabComponent";
import ExcelUploader from "./RequestFromPump/ExcelUploader"; // ایمپورت کامپوننت اکسل

const RequestCurrent = () => {
  const tabs = [
    { label: "امور جاری/درخواست آب:", content: "" },
    { label: "تقویم آبیاری", content: "تقویم آبیاری" },
    { label: "درخواست از سد", content: "درخواست از سد" },
    { label: "درخواست از سامانه", content: "درخواست از سامانه" },
    { label: "درخواست از ایستگاه پمپاژ", content: <ExcelUploader /> }, // اضافه کردن کامپوننت اکسل
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={4} // تنظیم تب فعال به "درخواست از ایستگاه پمپاژ"
      disabledTabIndex={0} // غیرفعال کردن اولین تب
    />
  );
};

export default RequestCurrent;
