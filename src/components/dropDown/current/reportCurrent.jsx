import TabComponent from "../../tabComponent";

const ReportCurrent = () => {
  const tabs = [
    { label: "امور جاری/گزارش:", content: "" },
    { label: "دوره‌ای", content: "دوره‌ای" },
    { label: "موردی", content: "موردی" },
    { label: "پمپاژ لحظه‌ای", content: "پمپاژ لحظه‌ای" },
    { label: "پمپاژ روزانه", content: "پمپاژ روزانه" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default ReportCurrent;
