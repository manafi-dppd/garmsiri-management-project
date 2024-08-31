import TabComponent from "../../tabComponent";

const AccountingRecords = () => {
  const tabs = [
    { label: "سوابق بهره‌برداری/حسابداری آب:", content: "" },
    { label: "بیلان سد", content: "بیلان سد" },
    { label: "بیلان سامانه", content: "بیلان سامانه" },
    { label: "تقویم آبیاری", content: "تقویم آبیاری" },
    { label: "برنامه آبیاری", content: "برنامه آبیاری" },
    { label: "تحویل آب", content: "تحویل آب" },
    { label: "بارندگی", content: "بارندگی" },
    { label: "داشبورد", content: "داشبورد" },
    { label: "صورتجلسات تحویل آب", content: "صورتجلسات تحویل آب" },        
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default AccountingRecords;
