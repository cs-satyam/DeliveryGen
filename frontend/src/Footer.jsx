// src/components/Footer.jsx
import React from "react";
import { Container, Typography, IconButton, Box, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, Phone, Mail, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer style={{ background: "#222", color: "#fff", padding: "60px 0" }}>
      <Container>
        <div className="row">
          {/* Brand */}
          <div className="col-md-3 mb-4">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              <span style={{ background: "linear-gradient(90deg,#0f0,#0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                DeliveryGen
              </span>
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)" gutterBottom>
              Fast, reliable food delivery that brings your favorite meals right to your door.
            </Typography>
            <Box mt={2} display="flex" gap={2}>
              <IconButton sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#0f0" } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#0f0" } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#0f0" } }}>
                <Instagram />
              </IconButton>
            </Box>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-light opacity-75">About Us</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75">How It Works</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75">Restaurants</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 mb-4">
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-light opacity-75">Help Center</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75">Contact Us</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75">Privacy Policy</a></li>
              <li><a href="#" className="text-decoration-none text-light opacity-75">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Phone sx={{ color: "#0f0", mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                1-800-DELIVERY
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Mail sx={{ color: "#0f0", mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                support@deliverygen.com
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOn sx={{ color: "#0f0", mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                Available in 50+ cities
              </Typography>
            </Box>
          </div>
        </div>

        {/* Divider + Bottom Text */}
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 4 }} />
        <Typography variant="body2" align="center" color="rgba(255,255,255,0.6)">
          © 2024 DeliveryGen. All rights reserved. Made with ❤️ for food lovers everywhere.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
