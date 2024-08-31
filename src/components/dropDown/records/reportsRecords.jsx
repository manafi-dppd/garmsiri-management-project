import TabComponent from "../../tabComponent";

const ReportsRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/گزارشات", content: "" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={0}
      disabledTabIndex={0}
    />
  );
};

export default ReportsRecords;
