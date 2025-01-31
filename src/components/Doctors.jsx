import React from 'react';


const DoctorsPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Meet our great doctors</h1>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Dr. John Paul</h2>
              <h3 className="card-subtitle mb-2 text-muted">Brain tumor</h3>
              <p className="card-text">
                Availability:<br />
                Mon-Fri 10AM-9PM<br />
                Sat 10AM-2PM
              </p>
              <p className="card-text">
                An esteemed doctor distinguished by precise diagnoses and effective treatments, paying attention
                to every detail to ensure the health of his patients.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Dr. Maria Elena</h2>
              <h3 className="card-subtitle mb-2 text-muted">Skin cancer</h3>
              <p className="card-text">
                Availability:<br />
                Mon-Fri 10AM-9PM<br />
                Sat 10AM-2PM
              </p>
              <p className="card-text">
                An esteemed doctor distinguished by precise diagnoses and effective treatments, paying attention
                to every detail to ensure the health of his patients.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <img
          src="https://hianco.net/gallery/216426057/MedScan-website/modules/1232298425"
          alt="Doctors"
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default DoctorsPage;