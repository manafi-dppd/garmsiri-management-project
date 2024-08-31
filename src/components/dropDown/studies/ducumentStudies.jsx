import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class DucumentStudies extends Component {
  state = {};
  render() {
    return (
      <>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item text-end" href="#">
              مشخصات
            </a>
          </li>
          <li>
            <a className="dropdown-item text-end" href="#">
              گزارشات
            </a>
          </li>
          <li>
            <a className="dropdown-item text-end" href="#">
              نقشه‌ها
            </a>
          </li>
        </ul>
      </>
    );
  }
}

export default DucumentStudies;
