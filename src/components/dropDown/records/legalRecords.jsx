import TabComponent from "../../tabComponent";

const LegalRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/امور حقوقی:", content: "" },
    { label: "لیست و اسناد املاک", content: "فهرست و اسناد املاک" },
    { label: "خسارت و جریمه", content: "خسارت و جریمه" },
    { label: "معارض", content: "معارض" },
    { label: "دادخواست/دفاعیه/رای", content: "دادخواست/دفاعیه/رای" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default LegalRecords;
