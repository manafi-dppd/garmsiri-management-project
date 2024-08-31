import TabComponent from "../../tabComponent";

const FirstStudies = () => {
  const tabs = [
    { label: "سوابق مطالعات/مرحله اول:", content: "" },
    { label: "زمین شناسی و ژئوتکنیک", content: "زمین شناسی و ژئوتکنیک" },
    { label: "خاکشناسی", content: "خاکشناسی" },
    { label: "هواشناسی و هیدرولوژی", content: "هواشناسی و هیدرولوژی" },
    { label: "محیط زیست", content: "محیط زیست" },
    { label: "جامعه شناسی", content: "جامعه شناسی" },
    { label: "کشاورزی و دامپروری", content: "کشاورزی و دامپروری" },
    { label: "آبیاری و زهکشی", content: "آبیاری و زهکشی" },
    { label: "اقتصاد طرح", content: "اقتصاد طرح" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default FirstStudies;
