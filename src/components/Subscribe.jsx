import React from 'react'

export default function Subscribe() {
  return (
    <section className="section__container subscribe__container mt-4" id="contact">
    <h2 className="section__header">
      Subscribe To Get The Latest News <span>About Us</span>
    </h2>
    <p className="section__description">
      Stay updated with the latest travel deals, destination highlights, and
      exclusive offers. Subscribe now and never miss out on exciting news and
      updates about our services!
    </p>
    <form action="/">
      <input type="text" placeholder="Your Email" />
      <button className="btn">Subscribe</button>
    </form>
  </section>
  )
}
