import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import InvitationModal from "./components/dropDown/current/usersdCurrent/invitationModal";
import AccessLevelModal from "./components/dropDown/current/usersdCurrent/AccessLevelModal";

class App extends Component {
  state = {
    showInvitationModal: false, // کنترل نمایش دعوتنامه
    accessLevels: {}, // ذخیره سطح دسترسی‌ها
  };

  handleInvitationSubmit = (accessLevels) => {
    // تابعی برای زمانی که دعوتنامه ارسال شد
    this.setState({ accessLevels });
    // پس از ارسال دعوتنامه، می‌توانیم پنجره مودال را ببندیم
    this.toggleInvitationModal();
  };

  toggleInvitationModal = () => {
    // برای باز یا بسته کردن پنجره دعوتنامه
    this.setState((prevState) => ({
      showInvitationModal: !prevState.showInvitationModal,
    }));
  };

  render() {
    const { showInvitationModal, accessLevels } = this.state;

    return (
      <Router>
        <Header accessLevels={accessLevels} />
        {/* <button onClick={this.toggleInvitationModal}>نمایش دعوتنامه</button> */}
        {showInvitationModal && (
          <InvitationModal
            show={showInvitationModal}
            onClose={this.toggleInvitationModal}
            onSubmit={this.handleInvitationSubmit} // ارسال سطح دسترسی‌ها پس از ارسال دعوتنامه
          />
        )}
        <Routes>
          <Route path="/access" element={<AccessLevelModal />} />
        </Routes>
      </Router>
    );
  }
}

export default App;