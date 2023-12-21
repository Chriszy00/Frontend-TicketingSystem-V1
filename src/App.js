import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Landing from "./components/common/Landing";
import Message from "./components/common/Message";


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
