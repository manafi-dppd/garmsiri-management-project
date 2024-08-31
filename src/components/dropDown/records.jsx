import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class Records extends Component {
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
            سوابق بهره‌برداری
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onAccountingRecordsClick}>
                حسابداری آب
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onRepairsServiceClick}>
                تعمیرات
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onServiceRecordsClick}>
                سرویس و نگهداری
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onWarehouseRecordsClick}>
                انبار
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onLegalRecordsClick}>
                امور حقوقی
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onProtectionRecordsClick}>
                حراست
              </a>
            </li>            
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onLetterRecordsClick}>
                مکاتبات
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onReportsRecordsClick}>
                گزارشات
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onVisitesRecordsClick}>
                بازدیدها
              </a>
            </li>
            
          </ul>
        </div>
      </>
    );
  }
}

export default Records;
