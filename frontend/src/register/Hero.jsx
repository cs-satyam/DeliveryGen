// src/register/Register.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ allow cookies (if needed later)
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.message);
        // redirect to login page after successful registration
        window.location.href = "/login";
      } else {
        alert("❌ " + (data.error || "Registration failed"));
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        {/* Left Illustration */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            src="media/logo.png" // put your register illustration in public/
            alt="Register Illustration"
            className="img-fluid"
            style={{ width: "900px", height: "700px" }}
          />
        </motion.div>

        {/* Right Register Form */}
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
            <h2 className="text-center fw-bold mb-3">Create Account ✨</h2>
            <p className="text-muted text-center mb-4">
              Join us and start your delivery journey
            </p>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
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

              {/* Password */}
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
                className="btn btn-primary w-100"
              >
                Register
              </motion.button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link className="text-decoration-none fw-bold" to="/login">
                Signin
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
