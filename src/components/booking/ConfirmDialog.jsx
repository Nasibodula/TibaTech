"use client";
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ConfirmDialog = ({
  visible,
  onConfirm,
  onCancel,
  loading,
  complaint,
  setComplaint
}) => {
  const handleConfirm = () => {
    onConfirm();
    setComplaint("");
  };

  return (
    <Modal
      show={visible}
      onHide={onCancel}
      centered
      backdrop="static"
      className="rounded-3 "
    >
      <Modal.Header>
        <Modal.Title className="h5 fw-semibold">
          Request Appointment
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center fst-italic text-secondary mb-4">
          Are you sure you want to send this appointment request?
        </p>
        
        <Form.Control
          as="textarea"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Patient's complaint goes here..."
          className="mb-4"
          rows={4}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={loading || complaint === ""}
        >
          {loading ? "Sending..." : "Request"}
        </Button>
        <Button
          variant="danger"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;