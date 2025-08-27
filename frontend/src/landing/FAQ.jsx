import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "How fast is delivery?",
      answer: "We deliver within 15 minutes in most areas.",
    },
    {
      question: "What are the delivery charges?",
      answer: "Delivery starts at just ₹20, free for orders above ₹500.",
    },
    {
      question: "Which locations do you cover?",
      answer: "We currently serve all major cities across India.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="mb-5 text-center fw-bold">FAQs</h2>
        <div className="accordion">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="card mb-3 shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="card-header bg-white"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <h5 className="mb-0">{faq.question}</h5>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="card-body bg-white"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
