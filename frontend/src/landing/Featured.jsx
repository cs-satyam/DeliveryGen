import React from "react";

export default function Featured() {
  const categories = [
    { icon: "🍔", title: "Food", bg: "bg-success" },
    { icon: "🥦", title: "Groceries", bg: "bg-primary" },
    { icon: "💊", title: "Medicines", bg: "bg-warning" },
    { icon: "📦", title: "Parcels", bg: "bg-info" },
  ];

  return (
    <section className="py-5 text-center">
      <div className="container">
        <h2 className="mb-5 display-5 fw-bold">Featured Categories</h2>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-md-3">
              <div
                className={`${category.bg} text-white p-5 rounded-4 shadow h-100 d-flex flex-column align-items-center justify-content-center transition hover-shadow`}
              >
                <div className="fs-1 mb-3">{category.icon}</div>
                <p className="fw-semibold fs-5">{category.title}</p>
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
