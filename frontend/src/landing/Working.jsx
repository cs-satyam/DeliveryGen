import React from "react";
import { ShoppingBag, Clock, ArrowRight } from "lucide-react";

export default function Working() {
  const steps = [
    {
      icon: <ShoppingBag size={40} className="text-white" />,
      title: "Browse & Order",
      desc: "Pick from thousands of items",
      bg: "bg-success",
    },
    {
      icon: <Clock size={40} className="text-white" />,
      title: "Track Your Delivery",
      desc: "Real-time updates at every step",
      bg: "bg-success",
    },
    {
      icon: <ArrowRight size={40} className="text-white" />,
      title: "Enjoy in Minutes",
      desc: "Delivered safely and quickly",
      bg: "bg-success",
    },
  ];

  return (
    <section className="py-5 text-center bg-light">
      <div className="container">
        <h2 className="mb-5 fw-bold">How It Works</h2>
        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={index} className="col-md-4">
              <div className="card border-0 shadow p-4 h-100 text-center hover-scale">
                <div className={`rounded-circle d-flex align-items-center justify-content-center mb-3 mx-auto ${step.bg}`} style={{ width: "70px", height: "70px" }}>
                  {step.icon}
                </div>
                <h5 className="fw-bold">{step.title}</h5>
                <p className="text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hover-scale {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-scale:hover {
          transform: translateY(-10px);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
}
