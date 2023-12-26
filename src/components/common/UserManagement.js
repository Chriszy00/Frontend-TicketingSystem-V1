import React, { useState, useEffect } from "react";
import "../../assets/css/style-tm.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchtUsers().then((r) => console.log("Users Fetched"));
  }, []);

  const fetchtUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/management/allUsers" 
      );
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Error fetching users");
      }
    } catch (error) {
      console.error("Error fetching users:", error.response.data); // Handle error response
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      await axios.delete(`http://localhost:8080/user/management/deleteUser/${id}`, { headers });

      // Fetch the updated list of tickets after successful deletion
      fetchtUsers().then(() => {
        // Toast and log messages
        toast.success("User Deleted", {
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
        <ul className="side-menu top ps-0">
          <li className="active">
            <Link to="/user-management" id="orderManagementBtn">
              <i className="bx bxs-user"></i>
              <span className="text">User Management</span>
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
            <div className="left pt-4 pb-4">
              <h1 className="mb-0">User Dashboard</h1>
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
                          <th className="px-4 py-3">First Name</th>
                          <th className="px-4 py-3">Last Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3" colSpan="3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 rounded">
                        {users.map((application) => (
                          <tr
                            key={application.id}
                            className="text-gray-700 dark:text-gray-400"
                          >
                            <td className="px-4 py-3">
                              {application.id}
                            </td>
                            <td className="px-4 py-3">
                              {application.firstName}
                            </td>
                            <td className="px-4 py-3">
                              {application.lastName}
                            </td>
                            <td className="px-4 py-3">
                              {application.email}
                            </td>
                           {/* Actions buttons */}
                           <td className="px-4 py-3 fs-1">
                              <div className="btn-group">
                                <button
                                  className="btn btn-outline-primary btn-sm me-3 rounded-1 border-2"
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button
                                  className="btn btn-outline-success btn-sm me-3 rounded-1 border-2"
                                >
                                  <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm rounded-1 border-2"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to delete this user?"
                                      )
                                    ) {
                                      deleteUser(application.id);
                                    }
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
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

export default UserManagement;
