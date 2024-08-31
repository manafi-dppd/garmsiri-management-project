import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class TabComponent extends Component {
  state = {};

  render() {
    const { tabs, activeTabIndex, disabledTabIndex } = this.props;

    return (
      <>
        <ul className="nav nav-tabs d-flex justify-content-start justify-content-evenly" role="tablist">
          {tabs.map((tab, index) => (
            <li className="nav-item" key={index}>
              <a
                className={`nav-link ${
                  index === activeTabIndex ? "active" : ""
                } ${index === disabledTabIndex ? "disabled" : ""}`}
                data-bs-toggle="tab"
                href={`#menu${index + 1}`}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="tab-content d-flex justify-content-around flex-row-reverse text-end">
          {tabs.map((tab, index) => (
            <div
              key={index}
              id={`menu${index + 1}`}
              className={`container tab-pane ${
                index === activeTabIndex ? "active" : ""
              }`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default TabComponent;
