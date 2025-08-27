import React from "react";
import Header from "../Header";
import Home from "./Home";
import Footer from "../Footer";

export default function DistancePage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}