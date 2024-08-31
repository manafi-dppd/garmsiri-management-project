import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import InvitationModal from "./components/dropDown/current/usersdCurrent/invitationModal";
import AccessLevelModal from "./components/dropDown/current/usersdCurrent/AccessLevelModal";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/invitation" element={<InvitationModal />} />
          <Route path="/access" element={<AccessLevelModal />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
