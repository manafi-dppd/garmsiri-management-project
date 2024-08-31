import TabComponent from "../../tabComponent";

const WarehouseRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/انبار:", content: "" },
    { label: "موجودی", content: "موجودی" },
    { label: "ورودی/خروجی", content: "ورودی/خروجی" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default WarehouseRecords;

