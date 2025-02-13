import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FollowUpAppointments = ({
  appointments,
  selectedAppointment,
  setSelectedAppointment,
  setAppointmentState,
  appointmentState,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleFollowUpClick = () => {
    setShowModal(true);
  };

  const handleSaveAppointment = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <Form.Check
        type="radio"
        label="Follow up"
        name="type"
        value="Follow_up"
        checked={appointmentState === "Follow_up"}
        onChange={() => {
          setAppointmentState(
            appointments && appointments.length > 0
              ? "Follow_up"
              : "First_time"
          );
          handleFollowUpClick();
        }}
        className="mb-3"
      />

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {appointments && appointments.length > 0
              ? "Select Appointment for Follow Up"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.isArray(appointments) && appointments.length > 0 ? (
            <div className="list-unstyled">
              {appointments.map((appointment) => (
                <Card key={appointment.appointment_id} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      Dr. {appointment.doctor_first_name} {appointment.doctor_last_name}
                    </Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-2">
                          <strong>Specialization:</strong>{" "}
                          {appointment.doctor_specialization}
                        </p>
                        <p className="mb-2">
                          <strong>Appointment Type:</strong>{" "}
                          {appointment.appointment_type}
                        </p>
                        <p className="mb-2">
                          <strong>Date & Time:</strong>{" "}
                          {formatDate(appointment.doctor_availability_day_hour)}
                        </p>
                        <p className="mb-2">
                          <strong>Duration:</strong>{" "}
                          {appointment?.appointment_duration} min
                        </p>
                      </div>
                      <Button
                        variant={
                          selectedAppointment?.appointment_id ===
                          appointment.appointment_id
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => handleAppointmentSelect(appointment)}
                      >
                        Select
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-danger text-center fst-italic">
              No appointments found
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={handleSaveAppointment}
            disabled={!selectedAppointment}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FollowUpAppointments;