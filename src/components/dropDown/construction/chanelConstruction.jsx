import TabComponent from "../../tabComponent";

const ChanelConstruction = () => {
  const tabs = [
    { label: "سوابق اجرا/سامانه:", content: "" },
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

export default ChanelConstruction;
