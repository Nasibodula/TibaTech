import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Modal } from 'react-bootstrap';
import { useDoctorContext } from '../context/GetDoctorsContext';
import { IoFilter } from 'react-icons/io5';
import Select from 'react-select';
import { Link } from 'react-router-dom';


const Doctors = () => {
  const { doctors, isLoading, error } = useDoctorContext();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    speciality: '',
    gender: '',
    rating: '',
    price: [],
    isOnline: '',
    sort: ''
  });

  // Filter options
  const sortOptions = [
    { value: 'ascFees', label: 'Fees Low to High' },
    { value: 'descFees', label: 'Fees High to Low' },
    { value: 'rating', label: 'Top Rated' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSort = (selectedOption) => {
    setFilters(prev => ({ ...prev, sort: selectedOption.value }));
  };

  const applyFilters = () => {
    let filtered = [...doctors];

    // Apply filters
    if (filters.speciality) {
      filtered = filtered.filter(doc => doc.title === filters.speciality);
    }

    if (filters.gender) {
      filtered = filtered.filter(doc => doc.gender === filters.gender);
    }

    if (filters.rating) {
      filtered = filtered.filter(doc => doc.rating >= parseFloat(filters.rating));
    }

    if (filters.isOnline) {
      filtered = filtered.filter(doc => doc.isOnline === filters.isOnline);
    }

    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'ascFees':
          filtered.sort((a, b) => a.fees60min - b.fees60min);
          break;
        case 'descFees':
          filtered.sort((a, b) => b.fees60min - a.fees60min);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      applyFilters();
    }
  }, [doctors, filters]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center">Error: {error}</div>;
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <h1 className="text-primary text-center mb-5">Our Doctors</h1>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search doctors..."
            className="mb-3"
          />
        </Col>
        <Col md={4}>
          <Select
            options={sortOptions}
            onChange={handleSort}
            placeholder="Sort by..."
            className="mb-3"
          />
        </Col>
        <Col md={4}>
          <Button 
            variant="outline-primary" 
            onClick={() => setShowFilterModal(true)}
            className="w-100"
          >
            <IoFilter className="me-2" />
            Filters
          </Button>
        </Col>
      </Row>

      {/* Doctor Cards */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredDoctors.map(doctor => (
          <Col key={doctor.id}>
            <Card className="h-100 shadow-sm hover-shadow">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary rounded-circle p-3 text-white me-3">
                    {doctor.name.charAt(0)}
                  </div>
                  <div>
                    <Card.Title className="mb-0">{doctor.name}</Card.Title>
                    <Card.Subtitle className="text-primary">{doctor.title}</Card.Subtitle>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">⭐</span>
                    <span>{doctor.rating} ({doctor.numReviews} Reviews)</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">👥</span>
                    <span>{doctor.numSessions} Sessions</span>
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Interests:</strong>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {doctor.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-light rounded-pill px-3 py-1 small"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div>60 min: {doctor.fees60min} EGP</div>
                  <div>30 min: {doctor.fees30min} EGP</div>
                </div>

                <div className="mb-3">
                  <strong>Languages:</strong> {doctor.language.join(', ')}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className={`badge ${doctor.isOnline === 'Yes' ? 'bg-success' : 'bg-secondary'}`}>
                    {doctor.isOnline === 'Yes' ? 'Online' : 'Offline'}
                  </div>
                  <div>Next: {doctor.nearestApp}</div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0">
                <div className="d-grid gap-2">
                  <Button variant="outline-primary">View Profile</Button>
                  <Button as={Link} to="/booking" variant="primary">Book Appointment</Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Doctors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Speciality</Form.Label>
              <Form.Control
                as="select"
                name="speciality"
                value={filters.speciality}
                onChange={handleFilterChange}
              >
                <option value="">All Specialities</option>
                {[...new Set(doctors.map(doc => doc.title))].map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Minimum Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={filters.rating}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                name="isOnline"
                value={filters.isOnline}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Yes">Online</option>
                <option value="No">Offline</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              applyFilters();
              setShowFilterModal(false);
            }}
          >
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Doctors;