import React from "react";
import TabComponent from "../../tabComponent";
import RequestFromPump from "./RequestCurrent/RequestFromPump"; // ایمپورت کامپوننت اکسل

const RequestCurrent = () => {
  const tabs = [
    { label: "امور جاری/درخواست آب:", content: "" },
    { label: "تقویم آبیاری", content: "تقویم آبیاری" },
    { label: "درخواست از سد", content: "درخواست از سد" },
    { label: "درخواست از سامانه", content: "درخواست از سامانه" },
    { label: "درخواست از ایستگاه پمپاژ", content: <RequestFromPump /> }, // اضافه کردن کامپوننت اکسل
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default RequestCurrent;