import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "boxicons/css/boxicons.min.css";
import "./dashboard.css";
import "./admin.js";
// import { sendMessage } from './WebSocketService';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Message = () => {
  const [messageInput, setMessageInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [type, setType] = useState("");
  const [selectedOption, setSelectedOption] = useState("reply");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [isHistoryFetched, setIsHistoryFetched] = useState(false); // Declare and initialize isHistoryFetched here
  const [selectedUserId, setSelectedUserId] = useState(null);
  const roleName = localStorage.getItem("roleName");
  const token = localStorage.getItem("accessToken");
  const [allUsers, setAllUsers] = useState([]);
  const messagesContainerRef = useRef(null);

  const socket = useMemo(() => {
    if (token) {
      return new SockJS("http://localhost:8080/ws", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return null;
  }, [token]);

  const stompClient = useMemo(() => {
    if (socket) {
      return Stomp.over(socket);
    }
    return null;
  }, [socket]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  useEffect(() => {
    if (roleName === "ROLE_INTERNAL") {
      axios
        .get("http://localhost:8080/api/message/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // Add other headers as needed
          },
        })
        .then((response) => {
          console.log(response.data);
          setAllUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
        });
    }

    if (stompClient && !stompClient.connected) {
      console.log("Opening Web Socket...");
      stompClient.connect({}, () => {
        console.log("WebSocket connection established");
        fetchMessageHistory();
        stompClient.subscribe("/topic/public", (response) => {
          const message = JSON.parse(response.body);
          console.log("Received message:", message);
          setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });
      });

      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect();
          console.log("WebSocket connection closed");
        }
      };
    }
  }, [stompClient, roleName]);

  useEffect(() => {
    if (selectedUserId) {
      console.log("Selected user ID:", selectedUserId);
    }
  }, [selectedUserId]);

  const fetchMessageHistory = () => {
    if (process.env.NODE_ENV !== "production") {
      console.log("START OF HISTORY");
    }

    axios
      .get("http://localhost:8080/api/message/convo", {
        params: { userId: localStorage.getItem("userId") },
      })
      .then((response) => {
        const historicalMessages = response.data;
        console.log("START OF HISTORY");
        historicalMessages.forEach((message) => {
          console.log("Received historical message:", message);
          setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });
        if (process.env.NODE_ENV !== "production") {
          console.log("END OF HISTORY");
        }
      })
      .catch((error) => {
        console.error("Error fetching historical data:", error);
      });
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      console.log(messageInput);
      const message = {
        message: messageInput,
        sender: localStorage.getItem("userId"),
      };
      stompClient.send("/app/send/message", {}, JSON.stringify(message));
      setMessageInput("");
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setReplyInput(e.target.value);
  };

  const handleSend = () => {
    handleSendReply();
  };

  const handleSendReply = () => {
    if (replyInput.trim() !== "") {
      const reply = {
        message: replyInput,
        sender: localStorage.getItem("userId"),
        receiver: "1",
        type: selectedOption,
      };
      stompClient.send("/app/send/reply", {}, JSON.stringify(reply));
      setReplyInput("");
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
        <a href="/" class="brand">
          <i className="bx bx-desktop"></i>
          <span class="text">DigiDesk</span>
        </a>
        <ul class="side-menu top ps-0">
          <li class="">
            <a href="/" id="dashboardBtn">
              <i class="bx bxs-dashboard"></i>
              <span class="text">Dashboard</span>
            </a>
          </li>
          <li className="">
            <Link to="/ticket" id="orderManagementBtn">
              <i className="bx bxs-notepad"></i>
              <span className="text">Ticket</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/message">
              <i class="bx bxs-message-dots"></i>
              <span class="text">Message</span>
            </Link>
          </li>
        </ul>
        <ul class="side-menu ps-0">
          <li>
            <a href="/" class="logout">
              <i class="bx bxs-log-out-circle"></i>
              <span class="text" onClick={handleLogout}>Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i class="bx bx-menu"></i>
        </nav>

        <main id="adminDashboard">
          <div class="head-title">
            <div class="left pt-5 pb-4">
              <h1 className="mb-0">Customer Service</h1>
            </div>
          </div>

          <div class="table-data">
            <div class="order">
              <div className="row" style={{ height: "62vh" }}>
                {/* ROLE_INTERNAL */}
                {roleName === "ROLE_INTERNAL" ? (
                  <div className="bg-primary col-3">
                    <h5>Chats</h5>
                    {allUsers.map((user, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedUserId(user.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {user.firstName} {user.lastName}
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="col">
                  {roleName === "ROLE_USER" ? (
                    <div
                      ref={messagesContainerRef}
                      style={{
                        width: "100%",
                        maxHeight: "58vh",
                        overflowY: "auto",
                      }}
                    >
                      <h5>Messages</h5>
                      {receivedMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`px-3 py-1 mb-1 rounded-5 text-white ${
                            message.sender.id == localStorage.getItem("userId")
                              ? "bg-primary ms-auto"
                              : "bg-secondary"
                          }`}
                          style={{ width: "fit-content" }}
                        >
                          {message.message}
                        </div>
                      ))}
                      {/* ROLE INTERNAL */}
                      {/* Get all messages where receiver and sender is userId */}
                      {/* If type is reply */}
                      {/* If type is note */}
                    </div>
                  ) : roleName === "ROLE_INTERNAL" ? (
                    <div
                      ref={messagesContainerRef}
                      style={{
                        width: "100%",
                        maxHeight: "58vh",
                        overflowY: "auto",
                      }}
                    >
                      <h5>{selectedUserId}</h5>
                      {receivedMessages.map((message, index) => (
                        <div key={index}>
                          {message.sender &&
                            message.sender.id !==
                              parseInt(selectedOption, 10) && (
                              <div
                                style={{
                                  fontSize: "12px",
                                  width: "fit-content",
                                }}
                                className={`ms-1 text-black ${
                                  message.type === "reply"
                                    ? "me-1 ms-auto"
                                    : message.type === "note"
                                    ? "me-1 ms-auto"
                                    : "ms-1 text-end"
                                }`}
                              >
                                {message.sender.firstName}{" "}
                                {message.sender.lastName}
                              </div>
                            )}
                          <div
                            className={`px-3 py-1 mb-1 rounded-5 text-white ${
                              message.sender &&
                              message.sender.id === selectedOption
                                ? "bg-secondary"
                                : message.type === "reply"
                                ? "bg-primary ms-auto"
                                : message.type === "note"
                                ? "bg-warning ms-auto"
                                : "bg-secondary"
                            }`}
                            style={{ width: "fit-content" }}
                          >
                            {message.message}
                          </div>
                        </div>
                      ))}
                      {/* ROLE INTERNAL */}
                      {/* Get all messages where receiver and sender is userId */}
                      {/* If type is reply */}
                      {/* If type is note */}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="d-flex justify-content-start border rounded-3 p-3">
                {roleName === "ROLE_USER" ? (
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      style={{
                        height: "5vh",
                        width: "94%",
                        border: "1px solid #ced4da",
                      }}
                      className="border rounded-3"
                      placeholder="Type your message..."
                    />
                    <button
                      onClick={handleSendMessage}
                      className="ms-3 btn btn-outline-primary"
                    >
                      Send
                    </button>
                  </div>
                ) : roleName === "ROLE_INTERNAL" ? (
                  <div style={{ width: "100%" }}>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      className="border rounded-3 py-2"
                    >
                      <option value="reply">Reply</option>
                      <option value="note">Note</option>
                    </select>
                    <input
                      type="text"
                      value={replyInput}
                      onChange={handleInputChange}
                      style={{ height: "5vh", width: "88%" }}
                      className="border rounded-3 ms-3"
                      placeholder={`Type your ${
                        selectedOption === "reply" ? "reply" : "note"
                      }...`}
                    />
                    <button
                      onClick={handleSend}
                      className="ms-3 btn btn-outline-primary"
                    >
                      Send
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </section>
      <script src="/admin.js"></script>
    </div>
  );
};

export default Message;
