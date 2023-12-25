import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Ensure local storage is cleared before navigating
    setTimeout(() => {
      console.log("Logged out");
      window.location.href = "/";
    }, 0);
  };
  return (
    <div>
      <section id="sidebar">
        <a href="/" className="brand">
          <i className="bx bx-desktop"></i>
          <span className="text">DigiDesk</span>
        </a>
        <ul className="side-menu ps-0">
          <li className="">
            <Link to="/" id="dashboardBtn">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/ticket" id="orderManagementBtn">
              <i className="bx bxs-notepad"></i>
              <span className="text">Ticket</span>
            </Link>
          </li>
          <li className="">
            <Link to="/message">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Message</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu ps-0">
          <li>
            <a href="/" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text" onClick={handleLogout}>
                Logout
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
export default Sidebar;
