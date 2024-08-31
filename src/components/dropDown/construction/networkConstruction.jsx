import TabComponent from "../../tabComponent";

const NetworkConstruction = () => {
  const tabs = [
    { label: "سوابق اجرا/شبکه‌های آبیاری:", content: "" },
    { label: "مشخصات", content: "مشخصات" },
    { label: "نقشه‌های ازبیلت", content: "نقشه‌های ازبیلت" },
    { label: "لوازم مصرفی", content: "لوازم مصرفی" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default NetworkConstruction;
