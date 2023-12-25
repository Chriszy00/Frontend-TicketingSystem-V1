import React, { useState, useEffect } from "react";
import "../../assets/css/style-register.css";
import { Link, useNavigate } from "react-router-dom";
import { notification, Modal, Button } from "antd";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // ["user", "admin", "internal"] - default: "user"
  const [roles, setRoles] = useState([]);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordUpperCaseValid, setPasswordUpperCaseValid] = useState(false);
  const [passwordLowerCaseValid, setPasswordLowerCaseValid] = useState(false);
  const [passwordNumberValid, setPasswordNumberValid] = useState(false);
  const [passwordSymbolValid, setPasswordSymbolValid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/roles");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.log("Failed to fetch roles:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
      if (firstNameError) {
        setFirstNameError("");
      }
    } else if (name === "lastName") {
      setLastName(value);
      if (lastNameError) {
        setLastNameError("");
      }
    } else if (name === "email") {
      setEmail(value);
      if (emailError) {
        setEmailError("");
      }
    } else if (name === "selectedRole") {
      setSelectedRole(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and space allowed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      role: selectedRole,
    };

    if (!selectedRole) {
      notification.info("Please select a role");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/signup", newUser);
      // Show success notification
      notification.success({
        message: "Registration Successful",
        description:
          "You have successfully registered. Please log in to continue.",
      });
      console.log("Form submitted successfully");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Email already exists
        notification.error({
          message: "DigiDesk APP",
          description: "Email Already exists, Please Enter Another Email",
        });
      } else {
        console.log(error);
      }
    }

    let isFormValid = true;

    if (!nameRegex.test(firstName.trim())) {
      setFirstNameError("Invalid first name");
      isFormValid = false;
    } else {
      setFirstNameError("");
    }

    if (!nameRegex.test(lastName.trim())) {
      setLastNameError("Invalid last name");
      isFormValid = false;
    } else {
      setLastNameError("");
    }

    if (!emailRegex.test(email.trim())) {
      setEmailError("Invalid email address");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    if (isFormValid) {
      // Form is valid, perform further actions (e.g., submit to server)
      console.log("Form submitted successfully");
    } else {
      // Display error messages or handle invalid form
      console.log("Invalid form");
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const passwordLengthValid = password.length >= 8;
    const passwordUpperCaseValid = /[A-Z]/.test(password);
    const passwordLowerCaseValid = /[a-z]/.test(password);
    const passwordNumberValid = /[0-9]/.test(password);
    const passwordSymbolValid = /[!@#$%^&*]/.test(password);
    const passwordValid =
      passwordLengthValid &&
      passwordUpperCaseValid &&
      passwordLowerCaseValid &&
      passwordNumberValid &&
      passwordSymbolValid;
    setPassword(password);
    setPasswordValid(passwordValid);
    setPasswordLengthValid(passwordLengthValid);
    setPasswordUpperCaseValid(passwordUpperCaseValid);
    setPasswordLowerCaseValid(passwordLowerCaseValid);
    setPasswordNumberValid(passwordNumberValid);
    setPasswordSymbolValid(passwordSymbolValid);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (!selectedRole) {
      notification.error({
        message: "DigiDesk APP",
        description: "Please select a role",
      });
    } else {
      setTimeout(() => {
        notification.info({
          message: "Selected Role",
          description: `You have selected the role: ${selectedRole.replace("ROLE_", "")}`,
        });
      }, 500);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  let passwordInputClass = "form-control";
  if (password !== "" && !passwordValid) {
    passwordInputClass += " is-invalid";
  }

  // Filter out the "ADMINISTRATOR" role from the roles array
  const filteredRoles = roles.filter(
    (role) => role.name !== "ROLE_ADMINISTRATOR"
  );

  return (
    <div className="container-fluid min-vh-100 bg custom-font custom-vh">
      <div className="row">
        <div className="col-md-4">
          <div className=" welcome-register">
            <div className="image-holder">
              <img src="#~" alt="logo" className="" />
            </div>

            <div className="custome-font">
              <h4 className="text-muted ms-5 pt-1">
                Welcome to&nbsp;{" "}
                <a href="/" className="text-decoration-none text-muted fw-bold">
                  {" "}
                  DigiDesk
                </a>
              </h4>
              <h2 className="ms-5 pt-2">Create Your Account</h2>
            </div>
          </div>
        </div>
        <div className="col-md-8 p-0">
          <div className="card rounded-top-left shadow">
            <div className="card-header bg-transparent px-5 pt-5 m-5 border-1">
              <h5 className="text-muted text-end py-2 pb-4">
                Already have an account?{" "}
                <Link to="/login" className="TC fw-bold">
                  Login
                </Link>
              </h5>
            </div>
            <div className="card-body p-0 mx-5">
              <div>
                <h3 className=" ms-5 text-muted">Your account details</h3>
              </div>
              <div className="form-inner text-dark px-5 mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group form-floating mb-3">
                        <input
                          type="text"
                          className={`form-control ${
                            firstNameError ? "is-invalid" : ""
                          }`}
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your First Name"
                        />
                        <label htmlFor="firstName">First Name</label>
                        {firstNameError && (
                          <div className="invalid-feedback">
                            {firstNameError}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group form-floating mb-3">
                        <input
                          type="text"
                          className={`form-control ${
                            lastNameError ? "is-invalid" : ""
                          }`}
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your Last Name"
                        />
                        <label htmlFor="lastName">Last Name</label>
                        {lastNameError && (
                          <div className="invalid-feedback">
                            {lastNameError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        emailError ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="Enter your Email"
                    />
                    <label htmlFor="email">Email Address</label>
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>

                  <div className="form-group form-floating mb-3">
                    <input
                      type="password"
                      className={passwordInputClass}
                      id="floatingPassword"
                      placeholder="Enter your Password"
                      onChange={handlePasswordChange}
                    />
                    <label htmlFor="floatingInput">Password</label>
                  </div>
                  <div>
                    <Button
                      type="primary custom-button"
                      className="text-light"
                      onClick={showModal}
                    >
                      Select a Role
                    </Button>
                    <Modal
                      title="Select a Role"
                      className="custom-font"
                      open={open}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      centered
                      styles={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: `${Math.min(filteredRoles.length * 40 + 100, 500)}px`,
                      }}
                      width={Math.min(filteredRoles.length * 200 + 50, 800)} // Increased the width
                    >
                      <label
                        htmlFor="role"
                        style={{ marginBottom: "1em", fontSize: "1.2em" }}
                        className=""
                      >
                        Choose what represents the user the best
                      </label>
                      <select
                        id="role"
                        name="selectedRole"
                        value={selectedRole}
                        className="custom-font form-control"
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "0.5em",
                        }}
                      >
                        <option value="">Choose an option</option>
                        {filteredRoles.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name.replace("ROLE_", "")}
                          </option>
                        ))}
                      </select>
                    </Modal>
                  </div>
                  <div className="password-validation-box">
                    <div className="password-validation">
                      <p className="px-3">Your password must have:</p>
                      <ul>
                        <li className={passwordLengthValid ? "check" : "wrong"}>
                          {passwordLengthValid ? "✓" : "✕"} At least 8
                          characters
                        </li>
                        <li
                          className={passwordUpperCaseValid ? "check" : "wrong"}
                        >
                          {passwordUpperCaseValid ? "✓" : "✕"} 1 upper-case
                          letter
                        </li>
                        <li
                          className={passwordLowerCaseValid ? "check" : "wrong"}
                        >
                          {passwordLowerCaseValid ? "✓" : "✕"} 1 lower-case
                          letter
                        </li>
                        <li className={passwordNumberValid ? "check" : "wrong"}>
                          {passwordNumberValid ? "✓" : "✕"} 1 number
                        </li>
                        <li className={passwordSymbolValid ? "check" : "wrong"}>
                          {passwordSymbolValid ? "✓" : "✕"} 1 symbol
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent py-5 mt-5 border-1">
                    <div className="text-center">
                      <span className="fs-6 text-muted">
                        By continuing, you agree to the DigiDesk{" "}
                        <Link to="/termsandconditions" className="TC fw-bold">
                          Terms and Conditions
                        </Link>
                      </span>
                      <button
                        className="btn btn-outline btn-custom btn-lg btn-block ms-3 mt-3"
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
