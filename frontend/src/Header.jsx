import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Phone, Mail } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Help", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <header className="sticky-top shadow-sm bg-white">
      <nav className="navbar navbar-expand-md px-4 py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4"
            style={{
              background: "linear-gradient(90deg, #00ff6a, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚀 DeliveryGen
          </Link>

          {/* Desktop Menu */}
          <div className="d-none d-md-flex align-items-center gap-4">
            <ul className="navbar-nav d-flex flex-row gap-4">
              {navLinks.map((link, idx) => (
                <li className="nav-item" key={idx}>
                  <Link
                    to={link.path}
                    className="nav-link text-dark position-relative"
                    style={{ transition: "0.3s" }}
                  >
                    {link.name}
                    <span className="underline"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="d-flex gap-3 ms-3">
              <Facebook className="text-primary" style={{ cursor: "pointer" }} />
              <Twitter className="text-info" style={{ cursor: "pointer" }} />
              <Instagram className="text-danger" style={{ cursor: "pointer" }} />
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 d-md-none"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden d-md-none bg-white shadow-sm"
      >
        <div className="d-flex flex-column text-center py-3">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="py-2 text-dark fw-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link:hover::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #00d4ff;
          border-radius: 2px;
        }
      `}</style>
    </header>
  );
}
