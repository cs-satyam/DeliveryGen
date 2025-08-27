// src/landing/Team.jsx
import React from "react";

export default function WhyChoose() {
  const features = [
    { icon: "⚡", title: "Ultra-Fast Delivery" },
    { icon: "📍", title: "Available in your city" },
    { icon: "💳", title: "Secure payments" },
    { icon: "🛡️", title: "Trusted by 10k+ users" },
  ];

  return (
    <section className="bg-light py-5 text-center">
      <div className="container">
        <h2 className="mb-5 display-5 fw-bold">Why Choose Us?</h2>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-3">
              <div className="p-4 bg-white rounded-4 shadow h-100 d-flex flex-column align-items-center justify-content-center transition hover-shadow">
                <div className="fs-1 mb-3">{feature.icon}</div>
                <p className="mt-2 fw-semibold fs-5">{feature.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .transition {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .transition:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
