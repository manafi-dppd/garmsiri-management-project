import TabComponent from "../../tabComponent";

const MeetingCurrent = () => {
  const tabs = [
    { label: "امور جاری/جلسه:", content: "" },
    { label: "خارجی", content: "خارجی" },
    { label: "داخلی", content: "داخلی" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default MeetingCurrent;
