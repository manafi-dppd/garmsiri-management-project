import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Current from "../components/dropDown/current";
import Records from "../components/dropDown/records";
import Construction from "../components/dropDown/construction";
import Studies from "../components/dropDown/studies";
import Specifications from "../components/dropDown/specifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ContractCurrent from "../components/dropDown/current/contractCurrent";
import RequestCurrent from "../components/dropDown/current/requestCurrent";
import DeliveryCurrent from "./dropDown/current/deliveryCurrent";
import ReportCurrent from "../components/dropDown/current/reportCurrent";
import ServiceCurrent from "../components/dropDown/current/serviceCurrent";
import RepairCurrent from "../components/dropDown/current/repairCurrent";
import ProtectionCurrent from "../components/dropDown/current/protectionCurrent";
import LetterCurrent from "../components/dropDown/current/letterCurrent";
import MeetingCurrent from "../components/dropDown/current/meetingCurrent";
import VisitCurrent from "../components/dropDown/current/visitCurrent";
import WarehouseCurrent from "../components/dropDown/current/warehouseCurrent";
import CircularCurrent from "../components/dropDown/current/circularCurrent";
import StandardCurrent from "../components/dropDown/current/standardCurrent";
import UsersdCurrent from "../components/dropDown/current/usersdCurrent";
import AccountingRecords from "../components/dropDown/records/accountingRecords";
import RepairsService from "../components/dropDown/records/repairsRecords";
import ServiceRecords from "../components/dropDown/records/serviceRecords";
import WarehouseRecords from "./dropDown/records/warehouseRecords";
import ProtectionRecords from "../components/dropDown/records/protectionRecords";
import LegalRecords from "../components/dropDown/records/legalRecords";
import LetterRecords from "../components/dropDown/records/letterRecords";
import ReportsRecords from "../components/dropDown/records/reportsRecords";
import VisitesRecords from "../components/dropDown/records/visitesRecords";
import DamConstruction from "../components/dropDown/construction/damConstruction";
import ChannelConstruction from "./dropDown/construction/chanelConstruction";
import PumpingConstruction from "../components/dropDown/construction/pumpingConstruction";
import NetworkConstruction from "../components/dropDown/construction/networkConstruction";
import FirstStudies from "../components/dropDown/studies/firstStudies";
import SecondStudies from "../components/dropDown/studies/secondStudies";
import ModalTest from "./modal";

class Header extends Component {
  state = {
    activeComponent: null,
    userData: null,
    accessLevels: {}, // This will hold the filtered menu visibility state
  };
  constructor(props) {
    super(props);
    this.state = {
      accessLevels: {}, // This will hold the filtered menu visibility state
    };
  }
  handleAccessLevelUpdate = (newAccessLevels) => {
    // به‌روزرسانی سطوح دسترسی
    this.setState({ accessLevels: newAccessLevels });
  };
  static finalAccessLevel = {};

  static setFinalAccessLevel(newAccessLevel) {
    Header.finalAccessLevel = newAccessLevel;
    console.log("Final Access Level in Header:", newAccessLevel);
  }
  
  componentDidMount() {
    document.querySelectorAll(".dropdown-submenu > a").forEach((element) => {
      const nextEl = element.nextElementSibling;

      element.addEventListener("mouseover", () => {
        if (nextEl && nextEl.classList.contains("dropdown-menu")) {
          nextEl.classList.add("show");
          element.classList.add("show");
        }
      });

      element.parentElement.addEventListener("mouseleave", () => {
        if (nextEl && nextEl.classList.contains("dropdown-menu")) {
          nextEl.classList.remove("show");
          element.classList.remove("show");
        }
      });
    });

    document.querySelectorAll(".dropdown").forEach((element) => {
      element.addEventListener("hidden.bs.dropdown", () => {
        element.querySelectorAll(".dropdown-menu.show").forEach((submenu) => {
          submenu.classList.remove("show");
        });
      });
    });
  }

  handleToggle = (componentName) => {
    this.setState((prevState) => ({
      activeComponent:
        prevState.activeComponent === componentName ? null : componentName,
    }));
  };

  handleUserSubmit = (userData) => {
    this.setState({ userData });
  };

  render() {

    // استفاده از مقادیر دسترسی‌ها برای فیلتر کردن منوها
    const { accessLevels } = this.state;
    // Inside Header's render method:
    const { operationalRecords, constructionAccess } = Header.finalAccessLevel;
    // استفاده از مقادیر checkedState برای فیلتر کردن نمایش منوها
    const shouldShowRecords = accessLevels.operationalRecords !== false;    
    const shouldShowConstruction = accessLevels.constructionAccess !== false;
    const shouldShowStudies = accessLevels.studiesAccess !== false;

    const currentHandlers = {
      onContractCurrentClick: () => this.handleToggle("contractCurrent"),
      onRequestCurrentClick: () => this.handleToggle("requestCurrent"),
      onDeliveryCurrentClick: () => this.handleToggle("deliveryCurrent"),
      onReportCurrentClick: () => this.handleToggle("reportCurrent"),
      onServiceCurrentClick: () => this.handleToggle("serviceCurrent"),
      onRepairCurrentClick: () => this.handleToggle("repairCurrent"),
      onProtectionCurrentClick: () => this.handleToggle("protectionCurrent"),
      onLetterCurrentClick: () => this.handleToggle("letterCurrent"),
      onMeetingCurrentClick: () => this.handleToggle("meetingCurrent"),
      onVisitCurrentClick: () => this.handleToggle("visitCurrent"),
      onWarehouseCurrentClick: () => this.handleToggle("warehouseCurrent"),
      onCircularCurrentClick: () => this.handleToggle("circularCurrent"),
      onStandardCurrentClick: () => this.handleToggle("standardCurrent"),
      onUsersdCurrentClick: () => this.handleToggle("usersdCurrent"),
    };
    const recordsHandlers = 
      shouldShowRecords ? {
      onAccountingRecordsClick: () => this.handleToggle("accountingRecords"),
      onRepairsServiceClick: () => this.handleToggle("repairsService"),
      onServiceRecordsClick: () => this.handleToggle("serviceRecords"),
      onWarehouseRecordsClick: () => this.handleToggle("warehouseRecords"),
      onProtectionRecordsClick: () => this.handleToggle("protectionRecords"),
      onLegalRecordsClick: () => this.handleToggle("legalRecords"),
      onLetterRecordsClick: () => this.handleToggle("letterRecords"),
      onReportsRecordsClick: () => this.handleToggle("reportsRecords"),
      onVisitesRecordsClick: () => this.handleToggle("visitesRecords"),
    } : {};
    const constructionHandlers = shouldShowConstruction ? {
      onDamConstructionClick: () => this.handleToggle("damConstruction"),
      onChannelConstructionClick: () =>
        this.handleToggle("channelConstruction"),
      onPumpingConstructionClick: () =>
        this.handleToggle("pumpingConstruction"),
      onNetworkConstructionClick: () =>
        this.handleToggle("networkConstruction"),
    } : {};
    const StudiesHandlers = shouldShowStudies ? {
      onFirstStudiesClick: () => this.handleToggle("firstStudies"),
      onSecondStudiesClick: () => this.handleToggle("secondStudies"),
    } : {};
    const { activeComponent, userData } = this.state;
    const componentMap = {
      usersdCurrent: () => <UsersdCurrent userData={userData} />,
      contractCurrent: ContractCurrent,
      requestCurrent: RequestCurrent,
      deliveryCurrent: DeliveryCurrent,
      reportCurrent: ReportCurrent,
      serviceCurrent: ServiceCurrent,
      repairCurrent: RepairCurrent,
      protectionCurrent: ProtectionCurrent,
      letterCurrent: LetterCurrent,
      meetingCurrent: MeetingCurrent,
      visitCurrent: VisitCurrent,
      warehouseCurrent: WarehouseCurrent,
      circularCurrent: CircularCurrent,
      standardCurrent: StandardCurrent,
      usersdCurrent: UsersdCurrent,
      accountingRecords: AccountingRecords,
      repairsService: RepairsService,
      serviceRecords: ServiceRecords,
      warehouseRecords: WarehouseRecords,
      protectionRecords: ProtectionRecords,
      legalRecords: LegalRecords,
      letterRecords: LetterRecords,
      reportsRecords: ReportsRecords,
      visitesRecords: VisitesRecords,
      damConstruction: DamConstruction,
      channelConstruction: ChannelConstruction,
      pumpingConstruction: PumpingConstruction,
      networkConstruction: NetworkConstruction,
      firstStudies: FirstStudies,
      secondStudies: SecondStudies,
    };

    const ActiveComponent = componentMap[this.state.activeComponent];

    return (
      <>
        <div className="row Header pb-0" role="banner">
          <div className="col col-xl-3 col-lg-4 col-md-5 px-5">
            <a
              href="index.html"
              className="navbar-brand text-white d-block text-center pt-3 pb-3"
            >
              <h3
                className="border-bottom pb-0 mb-0"
                style={{ fontFamily: "b titr", height: "5vh" }}
              >
                سامانه جامع مدیریت یکپارچه
              </h3>
              <h1 className="h1 mt-0" style={{ fontFamily: "b titr" }}>
                طرح گرمسیری
              </h1>
            </a>
          </div>
          <div className="col col-xl-7 col-lg-5 col-md-3"></div>
          <div className="col col-xl-2 col-lg-3 col-md-4 mt-auto align-bottom">
            <div className="row">
              <div className="form-group position-fixed top-0 ml-5 mt-4 px-3">
                <label
                  htmlFor="registerInput"
                  className="d-flex align-items-center text-white"
                >
                  <a
                    href=""
                    className="text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    ورود/عضویت
                  </a>
                </label>
              </div>
            </div>
          </div>

          <div
            className="nav nav-pills container-fluid d-flex justify-content-around"
            role="tablist"
          >
            <Current className="p-2" {...currentHandlers} />
            {constructionAccess && <Construction className="p-2" {...constructionHandlers} />}
            {shouldShowRecords && <Records className="p-2" {...recordsHandlers} />}
            {shouldShowConstruction && <Construction className="p-2" {...constructionHandlers} />}
            {shouldShowStudies && <Studies className="p-2" {...StudiesHandlers} />}
            <Specifications className="p-2" />
          </div>
        </div>

        {ActiveComponent && <ActiveComponent />}
        <ModalTest onUserSubmit={this.handleUserSubmit} />
      </>
    );
  }
}

export default Header;