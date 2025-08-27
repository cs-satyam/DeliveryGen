// src/landing/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      alert("⚠️ Please fill in both fields before submitting.");
      return;
    }
    alert(`✅ Message Sent!\n\n📧 Email: ${formData.email}\n💬 Message: ${formData.message}`);
    setFormData({ email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #f9f9f9 0%, #eef3f8 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-3 fw-bold">Contact Us</h3>
                <p className="text-center text-muted small mb-4">
                  Have questions? Reach out at{" "}
                  <strong className="text-primary">support@quickship.com</strong>
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-3"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="message"
                      rows="3"
                      className="form-control rounded-3"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-3"
                    style={{
                      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                      border: "none",
                    }}
                  >
                    Send Message 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
