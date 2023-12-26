import React, { useState, useEffect } from "react";
import "../../assets/css/style-tm.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Select, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const TicketManagement = () => {
  const [status, setStatus] = useState([]);
  const [internalUsers, setInternalUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const roleName = localStorage.getItem("roleName");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchInternalUsers();
    fetchTickets().then((r) => console.log("Status Fetched"));
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/management/allTickets"
      );
      if (response.status === 200) {
        setStatus(response.data);
      } else {
        console.log("Error fetching status");
      }
    } catch (error) {
      console.error("Error fetching status:", error.response.data);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      console.log("Logged out");
      window.location.href = "/";
    }, 0);
  };

  const handleResolve = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/ticket/management/${id}/resolved`
      );
      if (response.status === 200) {
        updateStatus(id, "Resolved");
        toast.success("Ticket Resolved", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(`Ticket ${id} resolved successfully`);
      } else {
        console.log("Error resolving ticket");
      }
    } catch (error) {
      console.error("Error resolving ticket:", error.response.data);
    }
  };

  const fetchInternalUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/ticket/management/internal-users"
      );
      if (response.status === 200) {
        setInternalUsers(response.data);
      } else {
        console.log("Error fetching internal users");
      }
    } catch (error) {
      console.error("Error fetching internal users:", error.response.data);
    }
  };

  const handleAssign = async (ticketId, userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };

      const response = await axios.post(
        `http://localhost:8080/ticket/management/${ticketId}/assigned/${userId}`,
        { assignedUserId: userId },
        { headers }
      );

      if (response.status === 200) {
        updateStatus(ticketId, "Assigned");
        toast.success("Ticket Assigned", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(`Ticket ${ticketId} assigned successfully`);
      } else {
        console.log("Error assigning ticket");
      }
    } catch (error) {
      console.error("Error assigning ticket:", error.response.data);
    }
  };

  const deleteTicket = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      await axios.delete(
        `http://localhost:8080/api/ticket/deleteTicket/${id}`,
        { headers }
      );

      fetchTickets().then(() => {
        toast.success("Ticket Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(`Ticket ${id} deleted successfully`);
      });
    } catch (error) {
      console.error("Error deleting ticket:", error.response.data);
    }
  };

  const updateStatus = (ticketId, newStatus) => {
    setStatus((prevStatus) =>
      prevStatus.map((status) =>
        status.ticketId === ticketId ? { ...status, status: newStatus } : status
      )
    );
  };

  return (
    <div>
      <section id="sidebar">
        <a href="/" className="brand">
          <i className="bx bx-desktop"></i>
          <span className="text">DigiDesk</span>
        </a>
        <ul className="side-menu top ps-0">
          <li className="">
            <Link to="/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>

          <li className="active">
            <Link to="/ticket-management">
              <i className="bx bxs-book-alt"></i>
              <span className="text">Ticket Management</span>
            </Link>
          </li>

          <li className="">
            <Link to="/message">
              <i className="bx bxs-book-alt"></i>
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

      <section id="content">
        <main id="adminDashboard">
          <div className="head-title">
            <div className="left pt-4 pb-4">
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
                          <th className="px-4 py-3 ">Ticket ID</th>
                          <th className="px-4 py-3 ">User</th>
                          <th className="px-4 py-3 ">Title</th>
                          {/* <th className="px-4 py-3 text-center">Priority</th> */}
                          <th className="px-4 py-3 ">Status</th>
                          <th className="px-4 py-3 " colSpan="5">
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
                              {application.creator.firstName}{" "}
                              {application.creator.lastName}
                            </td>
                            <td className="px-4 py-3">{application.title}</td>
                            <td className="px-4 py-3">{application.status}</td>
                            <td className="px-4 py-3 fs-1">
                              <div className="btn-group">
                                {/* Assign Dropdown (visible for all users) */}
                                <Select
                                  style={{
                                    width: 120,
                                  }}
                                  placeholder="Assign"
                                  className="me-3 custom-select" // Add your custom class for additional styling
                                  onChange={(value) =>
                                    handleAssign(application.ticketId, value)
                                  }
                                  disabled={application.status === "Assigned"}
                                >
                                  {internalUsers.map((user) => (
                                    <Option key={user.id} value={user.id}>
                                      {user.id} ({user.email})
                                    </Option>
                                  ))}
                                </Select>

                                {/* Hide these buttons for ROLE_ADMINISTRATOR */}
                                {roleName !== "ROLE_ADMINISTRATOR" && (
                                  <>
                                    <button
                                      className="btn btn-primary me-2 rounded-1"
                                      onClick={() =>
                                        handleResolve(application.ticketId)
                                      }
                                    >
                                      Resolved
                                    </button>
                                    <button className="btn btn-outline-success btn-sm me-3 rounded-1 border-2">
                                      <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm me-3 rounded-1 border-2">
                                      <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button
                                      className="btn btn-outline-danger btn-sm rounded-1 border-2"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you want to delete this ticket?"
                                          )
                                        ) {
                                          deleteTicket(application.ticketId);
                                        }
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  </>
                                )}
                              </div>
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
