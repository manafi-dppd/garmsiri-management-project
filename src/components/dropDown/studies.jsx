import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
// import SecondStudies from "../studies/secondStudies";

class Studies extends Component {
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
            سوابق مطالعات
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onFirstStudiesClick}
              >
                مرحله اول
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onSecondStudiesClick}
              >
                مرحله دوم
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Studies;
