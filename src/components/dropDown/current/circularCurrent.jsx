import TabComponent from "../../tabComponent";

const CircularCurrent = () => {
  const tabs = [
    { label: "امور جاری/بخشنامه‌ها", content: "" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={0}
      disabledTabIndex={0}
    />
  );
};

export default CircularCurrent;
