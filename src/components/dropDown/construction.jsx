import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class Construction extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle m-2"
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
                onClick={this.props.onDamConstructionClick}
              >
                سد
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onChannelConstructionClick}
              >
                سامانه
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onPumpingConstructionClick}
              >
                ایستگاه‌های پمپاژ
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onNetworkConstructionClick}
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
