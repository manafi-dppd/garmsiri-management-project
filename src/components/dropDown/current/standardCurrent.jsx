import TabComponent from "../../tabComponent";

const StandardCurrent = () => {
  const tabs = [
    { label: "امور جاری/استانداردها و دستورالعمل‌ها", content: "" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={0}
      disabledTabIndex={0}
    />
  );
};

export default StandardCurrent;
