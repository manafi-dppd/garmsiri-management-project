import TabComponent from "../../tabComponent";

const LetterCurrent = () => {
  const tabs = [
    { label: "امور جاری/نامه نگاری:", content: "" },
    { label: "وارده", content: "وارده" },
    { label: "صادره", content: "صادره" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default LetterCurrent;
