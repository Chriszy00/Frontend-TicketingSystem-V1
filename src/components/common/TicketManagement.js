import React, { useState, useEffect } from "react";
import "../../assets/css/style-tm.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetchtTickets().then((r) => console.log("Status Fetched"));
  }, []);

  const fetchtTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/ticket/management/allTickets"
      );
      if (response.status === 200) {
        setStatus(response.data);
      } else {
        console.log("Error fetching status");
      }
    } catch (error) {
      console.error("Error fetching status:", error.response.data); // Handle error response
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
  
    // Ensure local storage is cleared before navigating
    setTimeout(() => {
      console.log("Logged out");
      window.location.href = "/";
    }, 0);
  };

  const handleResovle = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/ticket/management/${id}/resolved`
      );
      if (response.status === 200) {
        setStatus((status) =>
          status.map((status) =>
            status.id === id ? { ...status, status: "Resolved" } : status
          )
        );
        toast.success("Ticket Resolved", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.log("Error resolving ticket");
      }
    } catch (error) {
      console.error("Error resolving ticket:", error.response.data); // Handle error response
    }
  };

  const handleAssign = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/ticket/management/${id}/assigned`
      );
      if (response.status === 200) {
        setStatus((status) =>
          status.map((status) =>
            status.id === id ? { ...status, status: "Assigned" } : status
          )
        );
        toast.success("Ticket Assigned", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.log("Error assigning ticket");
      }
    } catch (error) {
      console.error("Error assigning ticket:", error.response.data); // Handle error response
    }
  };

  const userID = localStorage.getItem("userId");

  const handleSwitchChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <section id="sidebar">
        <a href="!#" className="brand">
          <i className="bx bx-desktop"></i>
          <span className="text">DigiDesk</span>
        </a>
        <ul className="side-menu top ps-0">
          <li className="">
            <a href="!#" id="dashboardBtn">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <Link to="/user-management">
              <i className="bx bxs-cart-alt"></i>
              <span className="text">User Management</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/ticket-management">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Ticket Management</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu ps-0">
          <li>
            <a href="/" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text" onClick={handleLogout}>Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <main id="adminDashboard">
          <div className="head-title">
            <div className="left pt-5 pb-4">
              <h1 className="mb-0">Ticket Dashboard</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              {/* Scrollable Table */}
              <div className="scrollable-table">
                <div className="container px-6 mx-auto">
                  <div className="w-full overflow-x-auto rounded-lg shadow-md">
                    <table className="w-full whitespace-no-wrap">
                      <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 custom-font-bold">
                          <th className="px-4 py-3">User ID</th>
                          <th className="px-4 py-3">Last Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Priority</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3" colSpan="3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 rounded">
                        {status.map((application) => (
                          <tr
                            key={application.ticketId}
                            className="text-gray-700 dark:text-gray-400"
                          >
                            <td className="px-4 py-3">
                              {application.ticketId}
                            </td>
                            <td className="px-4 py-3">
                              {application.creator.lastName}
                            </td>
                            <td className="px-4 py-3">
                              {application.creator.email}
                            </td>
                            <td className="px-4 py-3">
                              {application.priority}
                            </td>
                            {/* Status as a select element */}
                            <td className="px-4 py-3">
                              <select
                                value={application.status.toLowerCase()}
                                // onChange={(e) => handleStatusChange(e, application.ticketId)}
                                className="form-select"
                              >
                                <option value="assigned">Assigned</option>
                                <option value="pending">Pending</option>
                                <option value="resolved">Resolved</option>
                              </select>
                            </td>
                            {/* Actions buttons */}
                            <td className="px-4 py-3 fs-1">
                              <button
                                className="btn btn-primary me-2"
                                // onClick={() => handleView(application.id)}
                              >
                                View
                              </button>
                              <button
                                className="ml-2 btn btn-success me-2"
                                // onClick={() => handleEdit(application.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="ml-2 btn btn-danger"
                                // onClick={() => handleDelete(application.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <script src="/admin.js"></script>
    </div>
  );
};

export default TicketManagement;
