import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class MenuConstruction extends Component {
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
              نقشه‌های ازبیلت
            </a>
          </li>
          <li>
            <a className="dropdown-item text-end" href="#">
              لوازم مصرفی
            </a>
          </li>
        </ul>
      </>
    );
  }
}

export default MenuConstruction;
