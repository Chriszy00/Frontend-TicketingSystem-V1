import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const TicketForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user information after component mounts
    const token = localStorage.getItem('accessToken');

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
      const token = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const data = {
        title,
        description,
        categoryNames: selectedCategory, // Change to categoryNames to match the backend
      };
  
      const response = await axios.post("http://localhost:8080/api/ticket/complaint", data, { headers });
  
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error submitting complaint:', error.response.data); // Handle error response
    }
  };
  
  

  return (
    <div>
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Category:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="TECHNICAL">Technical</option>
            <option value="ACCOUNT_ISSUES">Account Issues</option>
            <option value="BILLING_AND_PAYMENT">Billing and Payment</option>
            <option value="CONTENT_ISSUES">Content Issues</option>
            {/* Add more category options as needed */}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
