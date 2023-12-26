import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";

import TicketForm from "./components/common/TicketForm";

import Landing from "./components/common/Landing";
import Message from "./components/common/Message";
import TicketManagement from "./components/common/TicketManagement";
import UserManagement from "./components/common/UserManagement";



class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/ticket" element={<TicketForm/>} />
          <Route path="/message" element={<Message />} />
          <Route path="/ticket-management" element={<TicketManagement/>} />
          <Route path="/admin/user-management" element={<UserManagement/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
