import TabComponent from "../../tabComponent";

const VisitesRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/بازدیدها", content: "" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={0}
      disabledTabIndex={0}
    />
  );
};

export default VisitesRecords;
