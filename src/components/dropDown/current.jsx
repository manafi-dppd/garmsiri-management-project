import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

class Current extends Component {
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
            امور جاری
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onContractCurrentClick} // افزودن رویداد کلیک
              >
                قراردادهای بهره‌برداری
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-end"
                href="#"
                onClick={this.props.onRequestCurrentClick}
              >
                درخواست آب
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onDeliveryCurrentClick}>
                تحویل آب
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onReportCurrentClick}>
                گزارش
              </a>
            </li>           
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onServiceCurrentClick}>
                سرویس و نگهداری
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onRepairCurrentClick}>
                تعمیر
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onProtectionCurrentClick}>
                حراست
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onLetterCurrentClick}>
                نامه نگاری
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onMeetingCurrentClick}>
                جلسه
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onVisitCurrentClick}>
                بازدید
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onWarehouseCurrentClick}>
                انبار
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onCircularCurrentClick}>
                بخشنامه‌ها
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onStandardCurrentClick}>
                استانداردها و دستورالعمل‌ها
              </a>
            </li>
            <li>
              <a className="dropdown-item text-end" href="#" onClick={this.props.onUsersdCurrentClick}>
                کاربران
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Current;
