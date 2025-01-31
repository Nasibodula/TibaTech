// import React from 'react'

// export default function Services() {
//   return (
//   <section className="choose__container" id="choose">
//       <div className="choose__image">
//         <img src="/assets/team.png" alt="choose" />
//       </div>
//       <div className="choose__content">
//         <h2 className="section__header">Why choose us</h2>
//         <p className="section__description">
//           Discover the difference with our car rental service. We offer reliable
//           vehicles, exceptional customer service, and competitive pricing to
//           ensure a seamless rental experience.
//         </p>
//         <div className="choose__grid">
//           <div className="choose__card">
//             <span><i className="ri-customer-service-line"></i></span>
//             <div>
//               <h4>Customer Support</h4>
//               <p>Our dedicated support team is available to assist you 24/7.</p>
//             </div>
//           </div>
//           <div className="choose__card">
//             <span><i className="ri-map-pin-line"></i></span>
//             <div>
//               <h4>Many Locations</h4>
//               <p>
//                 Convenient pick-up and drop-off locations to suit your travel
//                 needs.
//               </p>
//             </div>
//           </div>
//           <div className="choose__card">
//             <span><i className="ri-wallet-line"></i></span>
//             <div>
//               <h4>Best Price</h4>
//               <p>Enjoy competitive rates and great value for every rental.</p>
//             </div>
//           </div>
//           <div className="choose__card">
//             <span><i className="ri-user-star-line"></i></span>
//             <div>
//               <h4>Experience Driver</h4>
//               <p>Reliable, professional drivers available upon request.</p>
//             </div>
//           </div>
//           <div className="choose__card">
//             <span><i className="ri-verified-badge-line"></i></span>
//             <div>
//               <h4>Verified Brands</h4>
//               <p>Choose from trusted and well-maintained car brands.</p>
//             </div>
//           </div>
//           <div className="choose__card">
//             <span><i className="ri-calendar-close-line"></i></span>
//             <div>
//               <h4>Free Cancellations</h4>
//               <p>Flexible bookings with free cancellation options.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>  
//   )
// }


import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export default function Services() {
  useEffect(() => {
    const scrollRevealOption = {
      origin: 'left',
      distance: '50px',
      duration: 1000,
      delay: 200,
    };

    // Ensure ScrollReveal applies to the correct elements
    ScrollReveal().reveal('.section__header', { ...scrollRevealOption });
    ScrollReveal().reveal('.section__description', { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal('.choose__card', { ...scrollRevealOption, delay: 700, interval: 200 });
    ScrollReveal().reveal('img', { ...scrollRevealOption, delay: 300, interval: 200 });

  }, []);

  return (
    <section className="choose__container container py-5" id="choose">
      <div className="row align-items-center">
        {/* Left Side - Image */}
        <div className="col-lg-5">
          <img src="/assets/team.png" alt="choose" className="choose__img rounded" />
        </div>

        {/* Right Side - Content */}
        <div className="col-lg-7">
          <h2 className="section__header">Why Choose Us</h2>
          <p className="section__description">
            Discover the difference with our car rental service. We offer reliable
            vehicles, exceptional customer service, and competitive pricing to ensure
            a seamless rental experience.
          </p>

          <div className="row">
            {/* Service Cards */}
            <div className="col-md-6 choose__card">
              <i className="ri-customer-service-line icon"></i>
              <div>
                <h5>Customer Support</h5>
                <p>Our dedicated support team is available 24/7.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-map-pin-line icon"></i>
              <div>
                <h5>Many Locations</h5>
                <p>Convenient pick-up and drop-off locations.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-wallet-line icon"></i>
              <div>
                <h5>Best Price</h5>
                <p>Competitive rates and great value.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-user-star-line icon"></i>
              <div>
                <h5>Experienced Drivers</h5>
                <p>Professional drivers available.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-verified-badge-line icon"></i>
              <div>
                <h5>Verified Brands</h5>
                <p>Choose from trusted car brands.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-calendar-close-line icon"></i>
              <div>
                <h5>Free Cancellations</h5>
                <p>Flexible bookings with free cancellation.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}