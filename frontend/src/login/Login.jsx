// src/landing/Landing.jsx
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Hero from "./Hero";

export default function Login() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
