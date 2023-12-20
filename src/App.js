import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
