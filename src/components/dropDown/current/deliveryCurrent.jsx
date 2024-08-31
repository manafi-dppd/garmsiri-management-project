import TabComponent from "../../tabComponent";

const DeliveryCurrent = () => {
  const tabs = [
    { label: "امور جاری/تحویل آب:", content: "" },
    { label: "مانور دریچه‌های سد", content: "مانور دریچه‌های سد" },
    { label: "مانور دریچه‌ها و شیرآلات سامانه و مخازن", content: "مانور دریچه‌ها و شیرآلات سامانه و مخازن" },
    { label: "رقوم سطح آب نقاط تحویل", content: "رقوم سطح آب نقاط تحویل" },
    { label: "رقوم فلومتر نقاط تحویل ثقلی", content: "رقوم فلومتر نقاط تحویل ثقلی" },
    { label: "رقوم فلومتر ایستگاه‌های پمپاژ", content: "رقوم فلومتر ایستگاه‌های پمپاژ" },
    { label: "رقوم کنتورهای مزارع", content: "رقوم کنتورهای مزارع" },
    { label: "صورتجلسه تحویل", content: "صورتجلسه تحویل" },
  ];

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default DeliveryCurrent;
