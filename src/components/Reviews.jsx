// import React from 'react'

// export default function Reviews() {
//   return (
//     <section class="section__container client__container">
//       <img src="assets/bg.png" alt="bg" class="client__bg" />
//       <p class="section__subheader">What Our Client Say's?</p>
//       <h2 class="section__header">Client <span>Testimonials</span></h2>
//       <div class="client__card active">
//         <img src="assets/client-1.jpg" alt="client" />
//         <div class="client__content">
//           <h4>Emma Johnson</h4>
//           <h5>Travel Blogger</h5>
//           <p>
//             This travel platform turned my bucket list dreams into reality! The
//             booking process was seamless, and their team provided excellent
//             guidance on must-visit spots. Every step felt effortless, and I
//             can't wait to plan my next adventure with them. Highly recommended!
//           </p>
//         </div>
//       </div>
//       <div class="client__card">
//         <img src="assets/client-2.jpg" alt="client" />
//         <div class="client__content">
//           <h4>Sophia Lee</h4>
//           <h5>Software Engineer</h5>
//           <p>
//             Traveling with this service was a delight! The flexible booking
//             options gave me the freedom to plan at my own pace, and the detailed
//             itineraries ensured I didn't miss anything important. I felt like
//             they genuinely cared about creating the perfect travel experience
//             for me. Absolutely wonderful!
//           </p>
//         </div>
//       </div>
//       <div class="client__card">
//         <img src="assets/client-3.jpg" alt="client" />
//         <div class="client__content">
//           <h4>Michael Roberts</h4>
//           <h5>Photographer</h5>
//           <p>
//             As a photographer, finding picturesque locations is key, and this
//             platform exceeded my expectations. They not only made booking easy
//             but also helped me discover some incredible hidden gems. Their
//             attention to detail made my journey unforgettable and hassle-free!
//           </p>
//         </div>
//       </div>
//       <div class="client__btns">
//         <button class="btn" id="prev">
//           <i class="ri-arrow-left-line"></i>
//         </button>
//         <button class="btn" id="next">
//           <i class="ri-arrow-right-line"></i>
//         </button>
//       </div>
//     </section>
//   )
// }


// import React, { useState } from 'react';


// export default function Testimonials() {
//   // Array of testimonial objects
//   const testimonials = [
//     {
//       id: 1,
//       img: "assets/client-2.jpg",
//       name: "Emma Johnson",
//       title: "Travel Blogger",
//       text: "This travel platform turned my bucket list dreams into reality! The booking process was seamless, and their team provided excellent guidance on must-visit spots. Every step felt effortless, and I can't wait to plan my next adventure with them. Highly recommended!"
//     },
//     {
//       id: 2,
//       img: "assets/client-2.jpg",
//       name: "Sophia Lee",
//       title: "Software Engineer",
//       text: "Traveling with this service was a delight! The flexible booking options gave me the freedom to plan at my own pace, and the detailed itineraries ensured I didn't miss anything important. I felt like they genuinely cared about creating the perfect travel experience for me. Absolutely wonderful!"
//     },
//     {
//       id: 3,
//       img: "assets/client-2.jpg",
//       name: "Michael Roberts",
//       title: "Photographer",
//       text: "As a photographer, finding picturesque locations is key, and this platform exceeded my expectations. They not only made booking easy but also helped me discover some incredible hidden gems. Their attention to detail made my journey unforgettable and hassle-free!"
//     }
//   ];

//   // State to keep track of which testimonial is active
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Handlers for previous/next navigation
//   const prevTestimonial = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const nextTestimonial = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <section className="section__container client__container container position-relative my-5">
//       {/* Section Header */}
//       <div className="text-center">
//         <p className="section__subheader">What Our Client Say's?</p>
//         <h2 className="section__header">
//           Client <span>Testimonials</span>
//         </h2>
//       </div>

//       {/* Testimonial Card */}
//       <div className="client__card active text-center mx-auto">
//         <img
//           src={testimonials[activeIndex].img}
//           alt="client"
//           className=" d-block mx-auto"
//         />
//         <div className="client__content mt-4">
//           <h4>{testimonials[activeIndex].name}</h4>
//           <h5>{testimonials[activeIndex].title}</h5>
//           <p>{testimonials[activeIndex].text}</p>
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="client__btns mt-4">
//         <button className="btn" id="prev" onClick={prevTestimonial}>
//           <i className="ri-arrow-left-line"></i>
//         </button>
//         <button className="btn" id="next" onClick={nextTestimonial}>
//           <i className="ri-arrow-right-line"></i>
//         </button>
//       </div>
//     </section>
//   );
// }


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