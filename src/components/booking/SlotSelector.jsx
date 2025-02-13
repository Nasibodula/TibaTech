import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const SlotSelector = ({
  selectedDate,
  selectedSlot,
  handleSlotSelect,
  availableDates,
}) => (
  <Container fluid className="d-flex flex-column gap-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fs-6 fs-lg-3 fw-semibold">Select time slots:</h3>
      <div className="text-primary fw-bold small">
        {selectedDate?.slots.length} available time slots
      </div>
    </div>

    {availableDates.length === 0 ? (
      <p className="text-danger text-center mt-4 small fst-italic">
        No available dates for booking at the moment. <br />
        <br /> Please try again later.
      </p>
    ) : availableDates.length === 1 && availableDates[0].date === "loading" ? (
      <p className="text-primary text-center mt-4 small fst-italic">
        Loading available dates...
      </p>
    ) : (
      <div className="overflow-hidden hover-overflow-auto" style={{ height: "13rem", paddingBlock: "1rem" }}>
        <div
          className={`${
            selectedDate && selectedDate.slots?.length > 0
              ? "row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-4"
              : "text-center mx-auto"
          } mw-450`}
          style={{ maxWidth: "450px" }}
        >
        {selectedDate && selectedDate.slots && selectedDate.slots.length > 0 ? (
  selectedDate.slots.map((slot) => (
    <div className="d-flex flex-column gap-1" key={slot.id}>
      <Button
        onClick={() => handleSlotSelect(slot)}
        className={`p-3 rounded ${
          selectedSlot === slot.time ? "btn-success" : "btn-light text-dark"
        }`}
      >
        {slot.time}
      </Button>
      <p
        className={`small text-center fw-semibold fst-italic ${
          selectedSlot === slot.time ? "text-success" : "text-dark"
        }`}
      >
        {slot.type}
      </p>
    </div>
  ))
) : (
  <p className="text-primary text-center mt-4 small fst-italic">
    Choose a date to see available time slots.
  </p>
)}
        </div>
      </div>
    )}
  </Container>
);

export default SlotSelector;


// {selectedDate ? (
//   selectedDate.slots?.length > 0 ? (
//     selectedDate?.slots.map((slot) => (
//       <div className="d-flex flex-column gap-1" key={slot.id}>
//         <Button
//           onClick={() => handleSlotSelect(slot)}
//           className={`p-3 rounded ${
//             selectedSlot === slot.time
//               ? "btn-success"
//               : "btn-light text-dark"
//           }`}
//         >
//           {slot.time}
//         </Button>
//         <p
//           className={`small text-center fw-semibold fst-italic ${
//             selectedSlot === slot.time
//               ? "text-success"
//               : "text-dark"
//           }`}
//         >
//           {slot.type && slot.type}
//         </p>
//       </div>
//     ))
//   ) : (
//     <p className="text-danger text-center mt-4 small fst-italic">
//       No time slots available on this day, Try another day.
//     </p>
//   )
// ) : (
//   <p className="text-primary text-center mt-4 small fst-italic">
//     Choose a date to see available time slots.
//   </p>