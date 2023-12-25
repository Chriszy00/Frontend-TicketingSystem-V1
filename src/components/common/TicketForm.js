import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./Sidebar";
import "../../assets/css/style-ticket.css";
import { notification } from "antd";

const TicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user information after component mounts
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const data = {
        title,
        description,
        categoryNames: selectedCategory,
      };
  
      const response = await axios.post(
        "http://localhost:8080/api/ticket/complaint",
        data,
        { headers }
      );
  
      notification.success({
        message: "Complaint Submitted",
        description: "Your complaint has been submitted successfully",
      });
  
      // Reset or clear the form fields by updating state
      setTitle("");
      setDescription("");
      setSelectedCategory("");
  
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error submitting complaint:", error.response.data);
      // Handle error response
    }
  };
  

  return (
    <div>
      <section id="">
        <main>
          <div className="head-title">
            <div className="left pt-3 pb-4">
              <h1 className="mb-0">Submit Your Complaint</h1>
            </div>
          </div>

          <div className="card rounded-5">
            <div className="card-body p-0 mx-5">
              <div className="px-5 mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group form-floating mb-3 mt-3">
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your title here"
                      />
                      <label htmlFor="floatingInput" className="ms-2">
                        Subject
                      </label>
                    </div>

                    <div className="form-group form-floating mb-3 mt-3">
                      <textarea
                        value={description}
                        className="form-control custom-textarea"
                        style={{ height: "200px" }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <label htmlFor="floatingInput" className="ms-2">
                        Description
                      </label>
                    </div>

                    <div className="form-group form-floating mb-1 mt-3">
                      <select
                        value={selectedCategory}
                        className="form-select"
                        onChange={handleCategoryChange}
                      >
                        <option value="">Select a category</option>
                        <option value="TECHNICAL">Technical</option>
                        <option value="ACCOUNT_ISSUES">Account Issues</option>
                        <option value="BILLING_AND_PAYMENT">
                          Billing and Payment
                        </option>
                        <option value="CONTENT_ISSUES">Content Issues</option>
                      </select>
                    </div>
                  </div>
                  <div className="py-5 px-5">
                    <button
                      type="submit"
                      className="btn btn-lg btn-custom btn-block"
                      style={{ width: "100%" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

const TicketContainer = () => {
  return (
    <div>
      <Sidebar />
      <div id="content" className="p-4">
        <TicketForm />
      </div>
    </div>
  );
};

export default TicketContainer;
