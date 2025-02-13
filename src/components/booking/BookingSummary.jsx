import React, { useState, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Utility function to convert date and time to code
const convertDateToCode = (day, time, type) => {
  // Remove any spaces and convert to lowercase
  const cleanDay = day.toLowerCase().trim();
  const cleanTime = time.replace(/:/g, '').trim();
  const cleanType = type.toLowerCase().trim();
  
  // Combine all parts into a single code
  return `${cleanDay}_${cleanTime}_${cleanType}`;
};

const BookingSummary = ({ 
  selectedSlot, 
  selectedDuration, 
  selectedType,
  doctor,
  selectedDate,
  appointmentState 
}) => {
  const [complaint, setComplaint] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' });

  const cancelCreate = () => {
    setShowConfirmDialog(false);
  };

  const getDateTime = () => {
    if (!selectedDate || !selectedSlot) return null;
    const dateStr = new Date(selectedDate.date).toISOString().split('T')[0];
    const timeStr = selectedSlot;
    return `${dateStr}T${timeStr}Z`;
  };

  const getDay = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const bookAppointment = () => {
    if (!selectedSlot || !selectedDate) return;
    setLoading(true);
    setTimeout(() => {
      setShowConfirmDialog(true);
      setLoading(false);
    }, 1000);
  };

  const confirmCreate = async () => {
    if (!selectedSlot || !selectedDate) return;

    setLoading(true);
    setErrorMessage(null);

    const body = {
      doctor_id: Number(doctor.id),
      complaint: complaint,
      duration: selectedDuration,
      appointment_type: "First_time",
      appointment_date: getDateTime(),
      appointment_parent_reference: null,
      time_slot_code: convertDateToCode(
        getDay(selectedDate.date),
        selectedSlot,
        selectedType
      ),
    };

    try {
      // Simulated API call
      setTimeout(() => {
        setShowConfirmDialog(false);
        setToastMessage({
          type: 'success',
          message: 'Request sent successfully!'
        });
        setShowToast(true);
      }, 2000);
    } catch (error) {
      setToastMessage({
        type: 'danger',
        message: `Failed to book appointment: ${error}`
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const ConfirmDialog = () => (
    <Modal show={showConfirmDialog} onHide={cancelCreate}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Please describe your complaint</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Enter your complaint here..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelCreate} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={confirmCreate} disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="card shadow p-4 mb-4 book">
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        className={`position-fixed top-0 end-0 m-3 ${
          toastMessage.type === 'success' ? 'bg-success' : 'bg-danger'
        } text-white`}
      >
        <Toast.Body>{toastMessage.message}</Toast.Body>
      </Toast>

      <div className="text-center mb-3">
        {selectedSlot ? (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <span className="badge bg-success p-2">
              {selectedDate?.date} {selectedSlot}
            </span>
            <span className="text-primary">Slot is selected</span>
          </div>
        ) : (
          <span className="text-primary">No slot selected</span>
        )}
      </div>

      <Button
        variant="primary"
        className="w-100"
        disabled={!selectedSlot || loading}
        onClick={bookAppointment}
      >
        {loading
          ? "Sending..."
          : `Book Now ${
              doctor?.fees60min && doctor?.fees30min
                ? `for ${
                    selectedDuration === 60
                      ? doctor.fees60min
                      : doctor.fees30min
                  } EGP`
                : ""
            }`}
      </Button>

      {errorMessage && (
        <div className="text-danger mt-2">{errorMessage}</div>
      )}

      <ConfirmDialog />
    </div>
  );
};

export default BookingSummary;