// import React, { useState, useEffect } from 'react';
// import { Card, Button, Row, Col } from 'react-bootstrap';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const NearbyClinics = () => {
//   const [clinics, setClinics] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);

//   // Get User Location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation([position.coords.latitude, position.coords.longitude]);
//         fetchClinics(position.coords.latitude, position.coords.longitude);
//       },
//       (error) => console.error('Error getting location:', error),
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   // Fetch Nearby Clinics using OpenStreetMap Nominatim API (Free)
//   const fetchClinics = async (lat, lon) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=clinic&bounded=1&viewbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}`
//       );
//       setClinics(response.data);
//     } catch (error) {
//       console.error('Error fetching clinics:', error);
//     }
//   };

//   // Custom Icon for Markers
//   const customIcon = new L.Icon({
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   return (
//     <div>
//       <h2>Nearby Clinics</h2>
//       <Row>
//         {clinics.map((clinic, index) => (
//           <Col key={index} md={4}>
//             <Card>
//               <Card.Body>
//                 <Card.Title>{clinic.display_name}</Card.Title>
//                 <Card.Text>
//                   <strong>Address:</strong> {clinic.address}
//                 </Card.Text>
//                 <Button variant="primary" href={`/directions/${clinic.lat},${clinic.lon}`}>
//                   Get Directions
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       {userLocation && (
//         <MapContainer center={userLocation} zoom={14} style={{ height: '400px', width: '100%' }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           {clinics.map((clinic, index) => (
//             <Marker
//               key={index}
//               position={[clinic.lat, clinic.lon]}
//               icon={customIcon}
//             >
//               <Popup>{clinic.display_name}</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default NearbyClinics;


import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { useNavigate } from 'react-router-dom';


// Default coordinates (fallback if geolocation fails)
const defaultPosition = [51.505, -0.09];

// Sample clinic data
const clinics = [
    {
        id: 1,
        name: "City Health Clinic",
        address: "123 Main St, City",
        coordinates: [51.51, -0.09],
        services: ["General", "Pediatrics", "Emergency"],
        phone: "+1234567890"
    },
    // Add more clinics...
];

const NearbyClinics = () => {
    const [position, setPosition] = useState(defaultPosition);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedServices, setSelectedServices] = useState(new Set());
    const navigate = useNavigate();

    // Get user location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.error("Error getting location:", err);
            }
        );
    }, []);

    // Calculate distance between two coordinates
    const calculateDistance = (lat2, lon2) => {
        const [lat1, lon1] = position;
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(1); // Distance in km
    };

    // Save clinic for offline
    const saveForOffline = (clinic) => {
        const savedClinics = JSON.parse(localStorage.getItem('clinics') || '[]');
        if (!savedClinics.find(c => c.id === clinic.id)) {
            localStorage.setItem('clinics', JSON.stringify([...savedClinics, clinic]));
        }
    };

    // Filter clinics
    const filteredClinics = clinics.filter(clinic => {
        const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             clinic.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesServices = selectedServices.size === 0 || 
                              clinic.services.some(service => selectedServices.has(service));
        return matchesSearch && matchesServices;
    });

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Nearby Clinics</h1>
            
            {/* Search Bar */}
            <InputGroup className="mb-4">
                <Form.Control
                    placeholder="Search by location or clinic name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={() => navigator.geolocation.getCurrentPosition(
                    (pos) => setPosition([pos.coords.latitude, pos.coords.longitude])
                )}>
                    Use Current Location
                </Button>
            </InputGroup>

            {/* Services Filter */}
            <div className="mb-4">
                {['General', 'Pediatrics', 'Emergency', 'Maternity'].map(service => (
                    <Form.Check
                        inline
                        label={service}
                        key={service}
                        type="checkbox"
                        onChange={(e) => {
                            const newServices = new Set(selectedServices);
                            e.target.checked ? newServices.add(service) : newServices.delete(service);
                            setSelectedServices(newServices);
                        }}
                    />
                ))}
            </div>

            {/* Map View */}
            <div className="map-container">
                <MapContainer center={position} zoom={13} style={{ height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    {filteredClinics.map(clinic => (
                        <Marker key={clinic.id} position={clinic.coordinates}>
                            <Popup>
                                <strong>{clinic.name}</strong><br/>
                                {clinic.address}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Clinic List */}
            <Row>
                {filteredClinics.map(clinic => (
                    <Col md={6} key={clinic.id}>
                        <Card className="clinic-card">
                            <Card.Body>
                                <Button 
                                    variant="outline-secondary" 
                                    size="sm" 
                                    className="offline-btn"
                                    onClick={() => saveForOffline(clinic)}
                                >
                                    Save Offline
                                </Button>
                                <Card.Title>{clinic.name}</Card.Title>
                                <Card.Text>
                                    {clinic.address}<br/>
                                    Distance: {calculateDistance(...clinic.coordinates)} km
                                </Card.Text>
                                <div>
                                    {clinic.services.map(service => (
                                        <Badge key={service} bg="info" className="service-badge">
                                            {service}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button variant="success" href={`tel:${clinic.phone}`}>
                                        Call
                                    </Button>
                                    <Button variant="primary" href={`sms:${clinic.phone}`}>
                                        SMS
                                    </Button>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => navigate(`/directions/${clinic.id}`)}
                                    >
                                        Directions
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default NearbyClinics;