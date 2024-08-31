import TabComponent from "../../tabComponent";

const SecondStudies = () => {
  const tabs = [
    { label: "سوابق مطالعات/مرحله دوم:", content: "" },
    { label: "سد", content: "سد" },
    { label: "سامانه", content: "سامانه" },
    { label: "ایستگاه‌های پمپاژ", content: "ایستگاه‌های پمپاژ" },
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

export default SecondStudies;
