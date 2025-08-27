import React from "react";
import { Smartphone } from "lucide-react"; // Import the icon

export default function Download() {
  return (
    <section className="py-5 text-center">
      <h2 className="mb-4">Get Started Today</h2>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-dark d-flex align-items-center gap-2">
          <Smartphone size={20} /> Google Play
        </button>
        <button className="btn btn-dark d-flex align-items-center gap-2">
          <Smartphone size={20} /> App Store
        </button>
      </div>
    </section>
  );
}
