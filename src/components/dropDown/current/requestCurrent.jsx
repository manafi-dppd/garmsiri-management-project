import TabComponent from "../../tabComponent";

const RequestCurrent = () => {
  const tabs = [
    { label: "امور جاری/درخواست آب:", content: "" },
    { label: "تقویم آبیاری", content: "تقویم آبیاری" },
    { label: "درخواست از سد", content: "درخواست از سد" },
    { label: "درخواست از سامانه", content: "درخواست از سامانه" },
    { label: "درخواست از ایستگاه پمپاژ", content: "درخواست از ایستگاه پمپاژ" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default RequestCurrent;
