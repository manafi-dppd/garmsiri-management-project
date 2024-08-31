import TabComponent from "../../tabComponent";

const ProtectionCurrent = () => {
  const tabs = [
    { label: "امور جاری/حراست:", content: "" },
    { label: "برنامه شیفت نگهبانان", content: "برنامه شیفت نگهبانان" },
    { label: "گزارش بازدید", content: "گزارش بازدید" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default ProtectionCurrent;
