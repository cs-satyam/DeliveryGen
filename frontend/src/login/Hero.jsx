// src/login/Login.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion"; // ✅ Import motion
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ important if using cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        <h1 className="text-2xl font-bold text-green-600">Welcome! Login Successful</h1>
        setMessage(data.message);
        setType("success");
        alert
        setTimeout(() => {
          window.location.href = "/distancePage";
        }, 1500);
      } else {
        setMessage(data.message);
        setType("error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        {/* Left Illustration with Animation */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            src="media/logo.png" // put your delivery image in public/ folder
            alt="Delivery Illustration"
            className="img-fluid"
            style={{ width: "900px", height: "700px" }}
          />
        </motion.div>

        {/* Right Login Form with Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="col-md-6 d-flex align-items-center justify-content-center"
        >
          <div
            className="card p-5 shadow rounded-4 w-100"
            style={{ maxWidth: "400px" }}
          >
            <h2 className="text-center fw-bold mb-3">Welcome Back 👋</h2>
            <p className="text-muted text-center mb-4">
              Login to continue your delivery journey
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-danger w-100"
              >
                Login
              </motion.button>
            </form>

            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <Link className="text-decoration-none fw-bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
