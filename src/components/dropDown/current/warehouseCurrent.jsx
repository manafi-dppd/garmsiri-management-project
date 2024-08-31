import TabComponent from "../../tabComponent";

const WarehouseCurrent = () => {
  const tabs = [
    { label: ":امور جاری/انبار", content: "" },
    { label: "درخواست کالا", content: "درخواست کالا" },
    { label: "ورود/خروج", content: "ورود/خروج" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default WarehouseCurrent;
