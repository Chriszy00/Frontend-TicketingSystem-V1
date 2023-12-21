import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
<<<<<<< HEAD
import TicketForm from "./components/common/TicketForm";
=======
import Landing from "./components/common/Landing";
import Message from "./components/common/Message";
>>>>>>> 07b40f50f1b929ca13c7fec7c510ee52ebc66ddc


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route path="/ticket" element={<TicketForm/>} />

=======
          <Route path="/" element={<Landing />} />
          <Route path="/message" element={<Message />} />
>>>>>>> 07b40f50f1b929ca13c7fec7c510ee52ebc66ddc
        </Routes>
      </Router>
    );
  }
}

export default App;
