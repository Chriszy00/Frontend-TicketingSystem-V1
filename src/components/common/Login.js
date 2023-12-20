import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/style-t&c.css";
import { ACCESS_TOKEN, FIRST_NAME, PHONE_NUMBER, ROLE_NAME, ID, EMAIL } from "../../constant/index";
import { login } from "../../util/APIUtils";
import { notification } from "antd";

function Login() {
  const navigate = useNavigate();
  const isLoggedIn = "isLoggedIn";

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginRequest = {
      email: e.target.email.value,
      password: e.target.password.value,
    }; 

    login(loginRequest)
      .then((response) => {
        console.log(response);
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        localStorage.setItem(ID, response.userId);
        localStorage.setItem(ROLE_NAME, response.roleName);
        localStorage.setItem(EMAIL, response.email);
        localStorage.setItem(isLoggedIn, true)
        navigate("/dashboard", { replace: true });

      })
      .catch((error) => {
        if (error.status === 400 || 401) {
          notification.error({
            message: "DigiDesk APP",
            description: "Your Email and Password are incorrect. Please try again.",
          });
        } else {
          notification.error({
            message: "DigiDesk APP",
            description: error.message || "Sorry! Something went wrong. Please try again.",
          });
        }
      });
  };

  return (
    <div className="container-fluid min-vh-100 bg custom-font custom-vh">
      <div className="row">
        <div className="col-md-4">
          <div className="welcome-register">
            <div className="image-holder">
              <img src="#!" alt="logo" />
            </div>
            <h4 className="text-muted ms-5 pt-1">Welcome Back</h4>
            <h2 className="ms-5 pt-2">Sign in to DigiDesk</h2>
          </div>
        </div>
        <div className="col-md-8 p-0">
          <div className="card rounded-top-left shadow">
            <div className="card-header bg-transparent px-5 pt-5 m-5 border-1">
              <h5 className="text-muted text-end py-2 pb-4">
                Do not have an account?{" "}
                <Link to="/register" className="TC fw-bold">
                  Sign Up
                </Link>
              </h5>
            </div>
            <div className="card-body mx-5 px-5">
              <div>
                <h3 className="pb-5 mt-3 text-muted">Your account details</h3>
              </div>
              <div className="form-inner text-dark">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="py-3 fs-5">
                    <div className="mt-5">
                      <Link to="#" className="TC fw-bold">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent text-center mt-5 py-5 border-1">
                    <div className="mt-3">
                      <span className="fs-6 text-muted">
                        By continuing, you agree to the DigiDesk{" "}
                        <Link to="/termsandconditions" className="TC fw-bold">
                          Terms and Conditions
                        </Link>
                      </span>
                    </div>
                    <button
                      className="btn btn-outline btn-custom btn-lg btn-block ms-3 mt-3"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;