import TabComponent from "../../tabComponent";

const ServiceCurrent = () => {
  const tabs = [
    { label: "امور جاری/سرویس و نگهداری:", content: "" },
    { label: "ایستگاه پمپاژ", content: "ایستگاه پمپاژ" },
    { label: "تمیز کاری و لایروبی تاسیسات", content: "تمیز کاری و لایروبی تاسیسات" },
    { label: "لایروبی سامانه", content: "لایروبی سامانه" },
    { label: "سرویس و تعمیر جزیی تجهیزات", content: "سرویس و تعمیر جزیی تجهیزات" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default ServiceCurrent;

