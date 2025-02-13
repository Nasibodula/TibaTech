import React, { useState } from 'react';
import { FaUserCircle, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';

// Custom Rating component
const StarRating = ({ value, readOnly }) => {
  const stars = [];
  const totalStars = 5;

  for (let i = 0; i < totalStars; i++) {
    if (value >= i + 1) {
      stars.push(<FaStar key={i} className="text-warning" />);
    } else if (value >= i + 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-warning" />);
    }
  }

  return (
    <div className="d-flex gap-1">
      {stars}
    </div>
  );
};

// Review Button Component to replace RatingComp
const ReviewButton = ({ doctor, setDoctorRating }) => {
  const handleReviewClick = () => {
    // Add your review logic here
    // For now, we'll just set a default rating
    setDoctorRating(5);
  };

  return (
    <button
      className="btn btn-link p-0 text-decoration-none"
      onClick={handleReviewClick}
    >
      Review
    </button>
  );
};

const DoctorInfo = ({ doctor }) => {
  const userImage = (
    <FaUserCircle 
      className="text-primary" 
      style={{ width: '2.5rem', height: '2.5rem' }} 
    />
  );
  const [doctorRating, setDoctorRating] = useState(doctor.rating || 0);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            {userImage}
            <div>
              <h2 className="fs-5 fw-bold mb-1">{doctor.name}</h2>
              <p className="text-primary mb-0">{doctor.title}</p>
            </div>
          </div>
          
          <div className="d-flex flex-column align-items-center gap-2">
            {doctorRating ? (
              <StarRating value={doctorRating} readOnly />
            ) : (
              <ReviewButton
                doctor={doctor}
                setDoctorRating={setDoctorRating}
              />
            )}
            <p className="text-secondary small mb-0">
              {doctorRating && doctorRating > 0
                ? `${doctorRating.toFixed(2)} (${doctor.numReviews} Reviews)`
                : "No Reviews"}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DoctorInfo;