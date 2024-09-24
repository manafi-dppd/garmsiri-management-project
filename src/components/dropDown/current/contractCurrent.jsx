import TabComponent from "../../tabComponent";
import Header
 from "../../header";
const ContractCurrent = ( accessLevels ) => {
  const tabs = [
    Header.finalAccessLevel.operationalContract
      ? { label: "امور جاری/قراردادهای بهره‌برداری", content: "" }
      : null,
    Header.finalAccessLevel.pumpingStationFirst
      ? { label: "مجموعه اول ایستگاه‌های پمپاژ", content: "مجموعه اول ایستگاه‌های پمپاژ" }
      : null,
    Header.finalAccessLevel.pumpingStationSecond
      ? { label: "مجموعه دوم ایستگاه‌های پمپاژ", content: "مجموعه دوم ایستگاه‌های پمپاژ" }
      : null,
    Header.finalAccessLevel.irrigationNetwork
      ? { label: "شبکه‌های آبیاری", content: "شبکه‌های آبیاری" }
      : null,
  ].filter(Boolean); // Filter out null values

  return (
    <TabComponent
      tabs={tabs}
      activeTabIndex={1}
      disabledTabIndex={0}
    />
  );
};

export default ContractCurrent;
