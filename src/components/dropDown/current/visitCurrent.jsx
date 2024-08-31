import TabComponent from "../../tabComponent";

const VisitCurrent = () => {
  const tabs = [
    { label: "امور جاری/بازدید:", content: "" },
    { label: "عملیاتی", content: "عملیاتی" },
    { label: "مقامات و مسئولین", content: "مقامات و مسئولین" },


  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default VisitCurrent;
