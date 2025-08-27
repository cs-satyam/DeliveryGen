// src/landing/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const textToType = "Fast Delivery 🚚";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(textToType.slice(0, i));
      i++;
      if (i > textToType.length) clearInterval(typing);
    }, 120);
    return () => clearInterval(typing);
  }, []);

  return (
    <section
      id="home"
      className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5"
    >
      {/* Left Content */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-md-start me-5"
        style={{ maxWidth: "480px" }}
      >
        <h1 className="fw-bold display-4 text-dark">{typedText}</h1>
        <p className="text-muted mt-3 fs-5">
          Get your products delivered faster than ever. Reliable, secure, and
          lightning quick 🚀
        </p>
        <button
          className="btn btn-success btn-lg mt-4 px-5 py-2 rounded-pill shadow"
          style={{ fontWeight: "600", letterSpacing: "1px" }}
        >
          <Link className="nav-link active" aria-current="page" to="/login">
                  SignIn
                </Link>
        </button>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-5 mb-5 ms-5 text-center"
      >
        <img 
          src="media/mobile.png"
          alt="delivery illustration"
          className="img-fluid "
          style={{ width: "600px", height: "350px", maxWidth: "100%" }}
        />
      </motion.div>
    </section>
  );
}
