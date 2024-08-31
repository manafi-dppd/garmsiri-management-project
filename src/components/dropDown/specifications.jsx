import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class Specifications extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle d-flex flex-row-reverse align-items-center m-2"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            اطلاعات و مشخصات عمومی
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a className="dropdown-item text-end" href="#">
              سیمای کلی طرح
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#">
              تاسیسات بالادست سد ازگله
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#">
              سد ازگله
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#">
              سامانه گرمسیری
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#">
              ایستگاه‌های پمپاز
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#">
              شبکه‌های آبیاری
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Specifications;
