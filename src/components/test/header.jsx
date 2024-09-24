import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Current from "./current";
import Records from "./records";
import Construction from "./construction";
import Studies from "./studies";
import Specifications from "./specifications";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevels: {}, // اینجا دسترسی‌های کاربر ذخیره می‌شود
    };
  }
  handleAccessLevelUpdate = (newAccessLevels) => {
    this.setState({ accessLevels: newAccessLevels });
  };

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

  render() {
    const { accessLevels } = this.state;

    // استفاده از مقادیر دسترسی برای نشان دادن یا پنهان کردن منوهای اصلی و فرعی
    const shouldShowRecords = accessLevels.operationalRecords;
    const constructionAccess = accessLevels.constructionAccess;
    const shouldShowStudies = accessLevels.studiesAccess;

    const currentHandlers = { /* هندلرهای مربوط به Current */ };
    const recordsHandlers = { /* هندلرهای مربوط به Records */ };
    const constructionHandlers = { /* هندلرهای مربوط به Construction */ };
    const StudiesHandlers = { /* هندلرهای مربوط به Studies */ };
    return (
      <>
        <div className="row Header pb-0" role="banner">
          <div className="col col-xl-9 col-lg-8 col-md-7 mt-auto align-bottom">
            <div className="row">
              <div className="form-group position-fixed top-0 start-0 ml-5 mt-4 px-3">
                <label
                  htmlFor="registerInput"
                  className="d-flex align-items-center text-white"
                >
                  <a
                    href="#"
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
          <div
            className="nav nav-pills container-fluid d-flex justify-content-around flex-row-reverse"
            role="tablist"
          >
            <Current className="p-2" {...currentHandlers} />
            {constructionAccess && <Construction className="p-2" {...constructionHandlers} />}
            {shouldShowRecords && <Records className="p-2" {...recordsHandlers} />}
            {shouldShowStudies && <Studies className="p-2" {...StudiesHandlers} />}
            <Specifications className="p-2" />
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="registerModal"
          tabIndex="-1"
          aria-labelledby="registerModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className="modal-content text-end"
              style={{ direction: "rtl", fontFamily: "IRANSans, sans-serif" }}
            >
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ position: "absolute", left: "1rem" }}
                ></button>
                <h5 className="modal-title mx-auto" id="registerModalLabel">
                  فرم ثبت‌نام
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      نام:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      نام خانوادگی:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nationalCode" className="form-label">
                      کد ملی:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nationalCode"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                      سمت:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="position"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  بستن
                </button>
                <button type="button" className="btn btn-primary">
                  ثبت نام
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* اگر کامپوننت خاصی فعال باشد، نمایش داده شود */}
        {this.state.activeComponent && <this.state.activeComponent />}

        {/* فراخوانی InvitationModal و پاس دادن تابع handleAccessLevelUpdate */}
        <InvitationModal onAccessLevelSubmit={this.handleAccessLevelUpdate} />
      </>
    );
  }
}

export default Header;




