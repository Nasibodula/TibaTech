import React, { useState } from "react";
import { Alert, Button, Card, Spinner, Row, Col } from "react-bootstrap";
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
} from "lucide-react";

const CallInterface = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const startCall = (withVideo) => {
    setIsConnecting(true);
    setIsVideoCall(withVideo);
    setTimeout(() => {
      setIsConnecting(false);
      setIsCallActive(true);
    }, 1500);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsConnecting(false);
  };

  return (
    <div className="container p-4">
      {/* Status Message */}
      {isConnecting && (
        <Alert variant="info" className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" size="sm" className="me-2" />
          Connecting to call...
        </Alert>
      )}

      {/* BEFORE CALL UI */}
      {!isCallActive && !isConnecting && (
        <Card className="text-center p-1">
          <Card.Body className="d-flex flex-column align-items-center">
            {/* Phone Icon on Top */}
            <div className="text-primary  d-flex justify-content-center align-items-center mb-2" style={{ width: "70px", height: "70px" }}>
              <Phone size={40} />
            </div>

            <h5 className="mb-4">Start a Call</h5>

            {/* Call Buttons */}
            <div className="d-flex flex-column gap-3">
              <Button variant="success" className="px-5 py-3" onClick={() => startCall(false)}>
                <Phone size={20} className="me-2" /> Voice Call
              </Button>

              <Button variant="primary" className="px-5 py-3" onClick={() => startCall(true)}>
                <Video size={20} className="me-2" /> Video Call
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Video Call UI */}
      {isCallActive && isVideoCall && (
        <Row className="mt-4">
          {/* Local Video */}
          <Col md={6}>
            <Card className="bg-dark text-white">
              <Card.Body className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
                {isVideoEnabled ? <Camera size={50} /> : <CameraOff size={50} />}
              </Card.Body>
              <Card.Footer className="bg-black text-white text-center">You</Card.Footer>
            </Card>
          </Col>

          {/* Remote Video */}
          <Col md={6}>
            <Card className="bg-dark text-white">
              <Card.Body className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
                <Video size={50} />
              </Card.Body>
              <Card.Footer className="bg-black text-white text-center">Remote User</Card.Footer>
            </Card>
          </Col>
        </Row>
      )}

      {/* Voice Call UI */}
      {isCallActive && !isVideoCall && (
        <Card className="p-4 mt-4">
          <Card.Body className="d-flex flex-column align-items-center">
            <div className="rounded-circle bg-light d-flex justify-content-center align-items-center" style={{ width: "100px", height: "100px" }}>
              <Phone size={40} />
            </div>
            <h5 className="mt-3">Voice Call in Progress</h5>
            <p className="text-muted">00:00</p>
          </Card.Body>
        </Card>
      )}

      {/* Call Controls */}
      {isCallActive && (
        <div className="d-flex justify-content-center gap-3 mt-4">
          {isVideoCall && (
            <Button
              variant={isVideoEnabled ? "outline-secondary" : "dark"}
              className="rounded-circle p-3"
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            >
              {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
            </Button>
          )}

          <Button
            variant={isMuted ? "dark" : "outline-secondary"}
            className="rounded-circle p-3"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>

          <Button variant="danger" className="rounded-circle p-3" onClick={endCall}>
            <PhoneOff size={24} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallInterface;
