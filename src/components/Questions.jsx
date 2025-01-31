import React from 'react';


const Questions = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Frequently Asked Question</h1>
      
      <div className="row">
        <div className="col-md-6">
          <h2>Causes of Brain Tumor and ways to avoid contracting the disease</h2>
          <h3>Some tips to prevent Brain Tumor</h3>
          <ol>
            <li>Reduce exposure to radiation</li>
            <li>Adopt a healthy diet</li>
            <li>Exercise regularly</li>
            <li>Periodic medical examination</li>
            <li>Stress management</li>
            <li>Reducing exposure to harmful chemicals</li>
          </ol>
        </div>

        <div className="col-md-6">
          <h2>Causes of Skin Cancer and ways to avoid contracting the disease</h2>
          <h3>Some tips to prevent Skin Cancer</h3>
          {/* Add content for Skin Cancer prevention tips here */}
        </div>
      </div>
    </div>
  );
};

export default Questions;