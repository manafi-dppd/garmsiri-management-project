import TabComponent from "../../tabComponent";

const RepairsService = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/تعمیرات:", content: "" },
    { label: "عملیات", content: "عملیات" },
    { label: "نیروی انسانی و ماشین آلات", content: "نیروی انسانی و ماشین آلات" },
    { label: "لوازم مصرفی", content: "لوازم مصرفی" },
    { label: "هزینه‌ها", content: "هزینه‌ها" },
    { label: "داشبورد", content: "داشبورد" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default RepairsService;

