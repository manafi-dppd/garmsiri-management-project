import TabComponent from "../../tabComponent";

const ContractCurrent = () => {
  const tabs = [
    { label: "امور جاری/قراردادهای بهره‌برداری:", content: "" },
    { label: "مجموعه اول ایستگاه‌های پمپاژ", content: "مجموعه اول ایستگاه‌های پمپاژ" },
    { label: "مجموعه دوم ایستگاه‌های پمپاژ", content: "مجموعه دوم ایستگاه‌های پمپاژ" },
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

export default ContractCurrent;
