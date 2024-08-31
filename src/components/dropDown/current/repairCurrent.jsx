import TabComponent from "../../tabComponent";

const RepairCurrent = () => {
  const tabs = [
    { label: "امور جاری/تعمیر:", content: "" },
    { label: "سد و سامانه", content: "سد و سامانه" },
    { label: "ایستگاه پمپاژ", content: "ایستگاه پمپاژ" },
    { label: "شبکه‌های آبیاری", content: "شبکه‌های آبیاری" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default RepairCurrent;
