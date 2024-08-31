import TabComponent from "../../tabComponent";

const ReportCurrent = () => {
  const tabs = [
    { label: "امور جاری/گزارش:", content: "" },
    { label: "دوره‌ای", content: "دوره‌ای" },
    { label: "موردی", content: "موردی" },
    { label: "لحظه‌ای پمپاژ", content: "لحظه‌ای پمپاژ" },
    { label: "روزانه پمپاژ", content: "روزانه پمپاژ" },
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
