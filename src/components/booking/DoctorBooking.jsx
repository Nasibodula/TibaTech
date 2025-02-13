// "use client";
// import React, { useState, useEffect } from "react";
// import DoctorInfo from "./DoctorInfo";
// import DetailsSelector from "./DetailsSelector";
// import BookingSummary from "./BookingSummary";
// import SlotSelector from "./SlotSelector";
// import WeekCalendar from "./WeekCalendar";
// import { Spinner, Container, Row, Col, Card } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';


// const dayCodes = {
//   "1": "Saturday",
//   "2": "Sunday",
//   "3": "Monday",
//   "4": "Tuesday",
//   "5": "Wednesday",
//   "6": "Thursday",
//   "7": "Friday",
// };

// // Utility function moved from external file
// const formatDoctorAvailabilities = (availableSlots) => {
//   if (!availableSlots) return [];

//   const slotsByDay = {};
//   const slots = availableSlots.split(",").filter(Boolean);

//   slots.forEach((slot) => {
//     const [day, time, type] = slot.split("_");
//     const dayName = dayCodes[day];

//     if (!slotsByDay[dayName]) {
//       slotsByDay[dayName] = [];
//     }

//     // Format time (assuming time is in 24-hour format)
//     const formattedTime = `${time}:00`;

//     slotsByDay[dayName].push({
//       id: `${day}_${time}_${type}`,
//       time: formattedTime,
//       type: type === "L" ? "Live" : "Virtual"
//     });
//   });

//   return Object.entries(slotsByDay).map(([date, slots]) => ({
//     date,
//     slots: slots.sort((a, b) => a.time.localeCompare(b.time))
//   }));
// };

// const DoctorBooking = () => {
//   const location = useLocation();
//   const [doctor, setDoctor] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState(60);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [selectedType, setSelectedType] = useState("L");
//   const [availableDates, setAvailableDates] = useState([{ date: "loading", slots: [] }]);
//   const [bookedDates, setBookedDates] = useState([]);
//   const [appointmentState, setAppointmentState] = useState("First_time");
//   const [appointments, setAppointments] = useState([]);

//   const formattedDatesFunc = (data) => {
//     if (!data.booked || !Array.isArray(data.booked)) {
//       throw new Error("Invalid data structure for booked dates");
//     }

//     return data.booked.map((date) => {
//       if (!date) {
//         console.error("Invalid date found in booked dates:", date);
//         return "Invalid date";
//       }

//       const formattedDate = date.split("T");
//       return `${formattedDate[0]} ${formattedDate[1]?.slice(0, 8)}`;
//     });
//   };

//   // Get doctor data from URL parameters
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const doctorParam = params.get("doctorBooking");

//     if (doctorParam) {
//       try {
//         const parsedDoctor = JSON.parse(decodeURIComponent(doctorParam));
//         setDoctor(parsedDoctor);
//       } catch (error) {
//         console.error("Error parsing doctor parameter:", error);
//       }
//     }
//   }, [location]);

//   // Fetch doctor availability
//   useEffect(() => {
//     const token = localStorage.getItem("jwt");

//     const fetchDoctorAvailability = async () => {
//       if (doctor?.id) {
//         try {
//           const response = await fetch(
//             `${process.env.REACT_APP_SERVER_NAME}/patient/appointment/Availabilities/${doctor.id}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           if (!response.ok) throw new Error("Failed to fetch availability");

//           const data = await response.json();

//           if (!data || typeof data !== "object" || !data.available_slots) {
//             setAvailableDates([]);
//             throw new Error("Invalid data structure");
//           }

//           const formattedDates = formatDoctorAvailabilities(data.available_slots);
//           setAvailableDates(formattedDates);
//           setBookedDates(formattedDatesFunc(data));
//         } catch (error) {
//           console.error("Error fetching availability:", error);
//         }
//       }
//     };

//     // Generate static available slots
//     const staticAvailableSlots = Array.from({ length: 20 }, (_, index) => {
//       const date = new Date(Date.now() + index * 24 * 60 * 60 * 1000);
//       const dayCode = Object.keys(dayCodes).find(
//         (key) => dayCodes[key] === date.toLocaleDateString("en-US", { weekday: "long" })
//       );

//       return Array.from({ length: 5 }, (_, slotIndex) => {
//         const timeCode = String(slotIndex + 1).padStart(2, "0");
//         const typeCode = "L";
//         return `${dayCode}_${timeCode}_${typeCode}`;
//       }).join(",");
//     }).join(",");

//     const formattedDates = formatDoctorAvailabilities(staticAvailableSlots);
//     setAvailableDates(formattedDates);
//     setBookedDates(formattedDatesFunc({ booked: [] }));

//     if (doctor) fetchDoctorAvailability();
//   }, [doctor]);

//   // Fetch patient appointments
//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     fetch(
//       `${process.env.REACT_APP_SERVER_NAME}/patient/appointment/appointmentsHistory`,
//       {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((response) => setAppointments(response?.appointments || []));
//   }, [appointmentState]);

//   const handleDurationChange = (duration) => setSelectedDuration(duration);

//   const handleDateSelect = (dateObj) => {
//     setSelectedSlot("");
//     setSelectedDate(dateObj);
//   };

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot.time);
//     setSelectedType(slot.type);
//   };

//   if (!doctor) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   return (
//     <Container fluid className="py-4 bg-light">
//       <Row className="justify-content-center g-4 mx-auto" style={{ maxWidth: '1200px' }}>
//         <Col md={5}>
//           <div className="d-flex flex-column gap-4">
//             <DoctorInfo doctor={doctor} />
//             <DetailsSelector
//               selectedDuration={selectedDuration}
//               handleDurationChange={handleDurationChange}
//               appointmentState={appointmentState}
//               setAppointmentState={setAppointmentState}
//               appointments={appointments}
//             />
//             <BookingSummary
//               selectedSlot={selectedSlot}
//               selectedDuration={selectedDuration}
//               selectedType={selectedType}
//               doctor={doctor}
//               selectedDate={selectedDate}
//               appointmentState={appointmentState}
//             />
//           </div>
//         </Col>

//         <Col md={7}>
//           <Card className="p-4 h-100">
//             <div className="d-flex flex-column gap-4">
//               <WeekCalendar
//                 selectedDate={selectedDate}
//                 handleDateSelect={handleDateSelect}
//                 availableDates={availableDates}
//                 bookedDates={bookedDates}
//               />
//               <SlotSelector
//                 selectedDate={selectedDate}
//                 selectedSlot={selectedSlot}
//                 handleSlotSelect={handleSlotSelect}
//                 availableDates={availableDates}
//               />
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DoctorBooking;



import React, { useState } from "react";
import DoctorInfo from "./DoctorInfo";
import DetailsSelector from "./DetailsSelector";
import BookingSummary from "./BookingSummary";
import SlotSelector from "./SlotSelector";
import WeekCalendar from "./WeekCalendar";
import { Container, Row, Col, Card } from 'react-bootstrap';

// Mock doctor data
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Wilson",
  title: "Cardiologist",
  rating: 4.8,
  numReviews: 124
};

// Mock available dates with slots
const generateMockAvailableDates = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const slots = [
    { time: "09:00", type: "Live", id: 1 },
    { time: "10:00", type: "Virtual", id: 2 },
    { time: "11:00", type: "Live", id: 3 },
    { time: "14:00", type: "Virtual", id: 4 },
    { time: "15:00", type: "Live", id: 5 }
  ];

  return days.map(day => ({
    date: day,
    slots: slots
  }));
};

const DoctorBooking = () => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedType, setSelectedType] = useState("Live");
  const [appointmentState, setAppointmentState] = useState("First_time");

  
  // Mock data
  const availableDates = generateMockAvailableDates();
  const bookedDates = [];
  const appointments = [
    {
      appointment_id: 1,
      doctor_first_name: "Sarah",
      doctor_last_name: "Wilson",
      doctor_specialization: "Cardiologist",
      appointment_type: "Check-up",
      doctor_availability_day_hour: "2025-02-10T09:00:00",
      appointment_duration: 60
    }
  ];

  const handleDurationChange = (duration) => setSelectedDuration(duration);
  

  const handleDateSelect = (dateObj) => {
    setSelectedSlot("");
    setSelectedDate(dateObj);
  };


  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot.time);
    setSelectedType(slot.type);
  };
  

  return (
    <Container fluid className="py-4 bg-light">
      <Row className="justify-content-center g-4 mx-auto" style={{ maxWidth: '1200px' }}>
        <Col md={5}>
          <div className="d-flex flex-column gap-4">
            <DoctorInfo doctor={mockDoctor} />
            <DetailsSelector
              selectedDuration={selectedDuration}
              handleDurationChange={handleDurationChange}
              appointmentState={appointmentState}
              setAppointmentState={setAppointmentState}
              appointments={appointments}
            />
            <BookingSummary
              selectedSlot={selectedSlot}
              selectedDuration={selectedDuration}
              selectedType={selectedType}
              doctor={mockDoctor}
              selectedDate={selectedDate}
              appointmentState={appointmentState}
            />
          </div>
        </Col>

        <Col md={7}>
          <Card className="p-4 h-100">
            <div className="d-flex flex-column gap-4">
              <WeekCalendar
                selectedDate={selectedDate}
                handleDateSelect={handleDateSelect}
                availableDates={availableDates}
                bookedDates={bookedDates}
              />
              <SlotSelector
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                handleSlotSelect={handleSlotSelect}
                availableDates={availableDates}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorBooking;