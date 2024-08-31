import TabComponent from "../../tabComponent";

const ProtectionRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/حراست", content: "" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={0}
      disabledTabIndex={0}
    />
  );
};

export default ProtectionRecords;
