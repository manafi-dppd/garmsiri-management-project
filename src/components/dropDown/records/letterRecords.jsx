import TabComponent from "../../tabComponent";

const LetterRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/مکاتبات", content: "" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={0}
      disabledTabIndex={0}
    />
  );
};

export default LetterRecords;
