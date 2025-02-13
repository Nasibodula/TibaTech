import React, { useState } from 'react';
import FollowUpAppointments from './FollowUpAppointments';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const DetailsSelector = ({
  selectedDuration,
  handleDurationChange,
  appointmentState,
  setAppointmentState,
  appointments
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <Card className="shadow-sm p-4">
      <h3 className="h4 mb-4">Select session details:</h3>

      <div className="d-flex gap-4">
        {/* Duration Selection */}
        <div className="d-flex flex-column gap-2">
          <Form.Check
            type="radio"
            id="duration-60"
            name="duration"
            label="60 Min"
            value={60}
            checked={selectedDuration === 60}
            onChange={() => handleDurationChange(60)}
            className="user-select-none"
          />
          <Form.Check
            type="radio"
            id="duration-30"
            name="duration"
            label="30 Min"
            value={30}
            checked={selectedDuration === 30}
            onChange={() => handleDurationChange(30)}
            className="user-select-none"
          />
        </div>

        {/* Appointment Type Selection */}
        <div className="d-flex flex-column gap-2">
          <Form.Check
            type="radio"
            id="type-first"
            name="type"
            label="First time"
            value="First_time"
            checked={appointmentState === "First_time"}
            onChange={() => setAppointmentState("First_time")}
            className="user-select-none"
          />
          <FollowUpAppointments
            appointments={appointments}
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
            setAppointmentState={setAppointmentState}
            appointmentState={appointmentState}
          />
        </div>
      </div>
    </Card>
  );
};

export default DetailsSelector;