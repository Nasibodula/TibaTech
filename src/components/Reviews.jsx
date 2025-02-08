import React, { useState } from "react";


const testimonials = [
  {
    name: "Michael Roberts",
    review: "As a photographer, finding picturesque locations is key, and this platform exceeded my expectations. They not only made booking easy but also helped me discover some incredible hidden gems. Their attention to detail made my journey unforgettable and hassle-free!",
    image: "/assets/client-2.jpg",
    role: "Photographer",
  },
  {
    name: "Jane Smith",
    review: "An absolutely seamless experience! I found the best locations for my travels, all thanks to this platform.",
    image:"/assets/client-2.jpg",
    role: "Travel Blogger",
  },
  {
    name: "John Doe",
    review: "This service has changed the way I plan my trips. Highly recommended!",
    image: "/assets/client-2.jpg",
    role: "Adventurer",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const prevTestimonial = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="testimonial-section container mt-5 position-relative text-center width-80 mb-5">
      <h2 className="text-start mb-4 flex align-items-center ">
        <span className="">What Our Client Say’s?</span><br />
        <strong>Client <span className="">Testimonials</span></strong>
      </h2>
      <div className="testimonial-wrapper d-flex align-items-center">
        <div className="testimonial-image">
          <img src={testimonials[index].image} alt="testimonial" className="img-fluid rounded" />
        </div>
        <div className="testimonial-content bg-white shadow p-4 rounded">
          <h4 className="fw-bold">{testimonials[index].name}</h4>
          <p className="role fw-bold">{testimonials[index].role}</p>
          <p className="testimonial-review">{testimonials[index].review}</p>
        </div>
      </div>
      <div className="testimonial-arrows position-absolute top-0 end-0 mt-4 me-4 d-flex gap-2">
        <button className="arrow-btn" onClick={prevTestimonial}>&#8249;</button>
        <button className="arrow-btn" onClick={nextTestimonial}>&#8250;</button>
      </div>
    </div>
  );
};

export default Testimonial;