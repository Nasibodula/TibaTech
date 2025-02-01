import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import ScrollReveal from 'scrollreveal';


const Questions = () => {
  const [activeKey, setActiveKey] = useState(null);
  useEffect(() => {
    const scrollRevealOption = {
      origin: 'left',
      distance: '50px',
      duration: 1000,
      delay: 200,
    };

    // Ensure ScrollReveal applies to the correct elements
    ScrollReveal().reveal('h4', { ...scrollRevealOption });
    ScrollReveal().reveal('.accordion', { ...scrollRevealOption, delay: 500 });
  }, []);

  const faqData = [
    {
      title: 'Causes of Brain Tumor and ways to avoid contracting the disease',
      content: (
        <>
          <h6>Some tips to prevent Brain Tumor</h6>
          <ol>
            <li>Reduce exposure to radiation</li>
            <li>Adopt a healthy diet</li>
            <li>Exercise regularly</li>
            <li>Reducing exposure to harmful chemicals</li>
            <li>Stress management</li>
            <li>Periodic medical examination</li>
          </ol>
        </>
      )
    },
    {
      title: 'Causes of Brain Tumor and ways to avoid contracting the disease',
      content: (
        <>
          <h6>Some tips to prevent Brain Tumor</h6>
          <ol>
            <li>Reduce exposure to radiation</li>
            <li>Adopt a healthy diet</li>
            <li>Exercise regularly</li>
            <li>Reducing exposure to harmful chemicals</li>
            <li>Stress management</li>
            <li>Periodic medical examination</li>
          </ol>
        </>
      )
    },
    {
      title: 'Causes of Skin Cancer and ways to avoid contracting the disease',
      content: (
        <>
          <h6>Some tips to prevent Skin Cancer</h6>
          <p className="text-muted">(Prevention content would go here)</p>
        </>
      )
    }
  ];

  return (
    <div className="faq-container">
      <h4 className="mb-4 text-center">Frequently Asked Questions</h4>
      <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)} className='accordion'>
        {faqData.map((item, index) => (
          <Accordion.Item 
            key={index} 
            eventKey={index.toString()} 
            className={`mb-3 ${activeKey === index.toString() ? 'active-item' : ''}`}
          >
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100 pe-3">
                <span>{item.title}</span>
                {/* <span className={`accordion-arrow ${activeKey === index.toString() ? 'active' : ''}`}>
                  ▼
                </span> */}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {item.content}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Questions;