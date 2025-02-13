import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const WeekCalendar = ({
  availableDates,
  handleDateSelect,
  selectedDate,
  bookedDates,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datesWithSlots, setDatesWithSlots] = useState([]);

  // Pure JS date handling functions
  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const getEndOfWeek = (date) => {
    const end = new Date(date);
    end.setDate(end.getDate() + (6 - end.getDay()));
    return end;
  };

  const getDaysInInterval = (start, end) => {
    const days = [];
    let current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const formatDate = (date, format) => {
    const d = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    switch (format) {
      case 'yyyy-MM-dd':
        return d.toISOString().split('T')[0];
      case 'EEE d':
        return `${days[d.getDay()]} ${d.getDate()}`;
      case 'EEEE':
        return days[d.getDay()];
      case 'MMM d':
        return `${months[d.getMonth()]} ${d.getDate()}`;
      default:
        return d.toDateString();
    }
  };

  useEffect(() => {
    const start = getStartOfWeek(currentDate);
    const end = getEndOfWeek(currentDate);
    const days = getDaysInInterval(start, end);

    // Create a set of booked dates for quick lookup
    const bookedSet = new Set(bookedDates);

    const updatedDatesWithSlots = days.map((day) => {
      const dateStr = formatDate(day, 'yyyy-MM-dd');
      const dayStr = formatDate(day, 'EEEE');
      const existingDate = availableDates.find((d) => d.date === dayStr);

      // If there are existing slots, filter duplicates based on the 'time' property
      const uniqueSlots = existingDate
        ? Array.from(
            new Map(
              existingDate.slots.map((slot) => [slot.time, slot])
            ).values()
          ).filter((slot) => {
            // Check if the slot's time is booked
            const slotDateTime = `${dateStr} ${slot.time}`;
            return !bookedSet.has(slotDateTime); // Exclude booked slots
          })
        : [];

      return {
        date: dateStr,
        slots: uniqueSlots.map((slot) => ({
          ...slot,
          id: slot.id,
          time: slot.time,
          type: slot.type,
        })),
      };
    });

    setDatesWithSlots(updatedDatesWithSlots);
  }, [currentDate, availableDates, bookedDates]);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <Container fluid className="d-flex flex-column gap-2 mb-4   calender">
      <div className="d-flex align-items-center mb-4">
        <h3 className="fs-6 fs-md-5 fs-lg-4 fw-bold">Select date:</h3>
        <div className="mx-auto d-flex justify-content-evenly align-items-center">
          <Button
            variant="light"
            onClick={handlePreviousWeek}
            className="rounded-circle px-3 py-1"
          >
            &lt;
          </Button>
          <span className="mx-1 mx-xl-2 fs-6 fs-md-5 text-md-center text-end fw-semibold" 
                style={{ maxWidth: "var(--bs-breakpoint-lg) ? '11rem' : '7rem'" }}>
            {formatDate(getStartOfWeek(currentDate), 'MMM d')} -{' '}
            {formatDate(getEndOfWeek(currentDate), 'MMM d')}
          </span>
          <Button
            variant="light"
            onClick={handleNextWeek}
            className="rounded-circle px-3 py-1"
          >
            &gt;
          </Button>
        </div>
      </div>

      <Row className="g-2 fs-6 fs-md-5">
        {datesWithSlots.map((dateObj) => (
          <Col key={dateObj.date} xs={3} xl={true}>
            <Button
              variant={
                selectedDate?.date === dateObj.date
                  ? "success"
                  : dateObj.slots.length > 0
                  ? "light"
                  : "outline-light"
              }
              className="w-100 p-3"
              onClick={() => handleDateSelect(dateObj)}
            >
              {formatDate(dateObj.date, 'EEE d')}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeekCalendar;