import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class Construction extends Component {
  state = {};
  render() {
    const {
      onDamConstructionClick,
      onChannelConstructionClick,
      onPumpingConstructionClick,
      onNetworkConstructionClick,
      accessLevels,
    } = this.props;
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
            سوابق اجرا
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={onDamConstructionClick}
              >
                سد
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={onChannelConstructionClick}
              >
                سامانه
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={onChannelConstructionClick}
              >
                ایستگاه‌های پمپاژ
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={onNetworkConstructionClick}
              >
                شبکه‌های آبیاری
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Construction;
