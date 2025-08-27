import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Alice Johnson",
            feedback: "Fast and reliable service! My go-to for quick deliveries.",
            avatar: "https://i.pravatar.cc/100?img=1",
            rating: 5,
        },
        {
            name: "Bob Smith",
            feedback: "The delivery was super quick and the app is very user-friendly.",
            avatar: "https://i.pravatar.cc/100?img=2",
            rating: 4,
        },
        {
            name: "Catherine Lee",
            feedback: "Excellent customer support and timely deliveries every time.",
            avatar: "https://i.pravatar.cc/100?img=3",
            rating: 5,
        },
    ];

    const renderStars = (count) => "⭐".repeat(count);

    return (
        <section className="bg-light py-5">
            <div className="container text-center">
                <h2 className="mb-5">What Our Users Say</h2>
                <div className="row g-4">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="col-md-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3, duration: 0.6 }}
                        >
                            <div className="card border-0 shadow p-4 h-100">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="rounded-circle mb-3"
                                    width="80"
                                    height="80"
                                />
                                <h5>{testimonial.name}</h5>
                                <div className="mb-2">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="text-muted">"{testimonial.feedback}"</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
