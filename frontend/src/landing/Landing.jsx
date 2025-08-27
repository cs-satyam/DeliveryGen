// src/landing/Landing.jsx
import React from "react";
import Header from "../Header";
import Home from "./Home";
import Working from "./Working";
import Contact from "./Contact";
import WhyChoose from "./WhyChoose";
import Footer from "../Footer";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import Download from "./Download";
import FAQ from "./FAQ";

export default function Landing() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <Home />
      <Working />
      <WhyChoose />
      <Featured />
      <Testimonials />
      <Download />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
