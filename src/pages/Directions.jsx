// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const Directions = () => {
//   const { lat, lon } = useParams();
//   const [userLocation, setUserLocation] = useState(null);
//   const [route, setRoute] = useState(null);

//   // Get User Location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation([position.coords.latitude, position.coords.longitude]);
//         fetchRoute(position.coords.latitude, position.coords.longitude, lat, lon);
//       },
//       (error) => console.error('Error getting location:', error),
//       { enableHighAccuracy: true }
//     );
//   }, [lat, lon]);

//   // Fetch Route using OpenRouteService API
//   const fetchRoute = async (startLat, startLon, endLat, endLon) => {
//     try {
//       const response = await fetch(
//         `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=YOUR_API_KEY&start=${startLon},${startLat}&end=${endLon},${endLat}`
//       );
//       const data = await response.json();
//       const coordinates = data.features[0].geometry.coordinates;
//       setRoute(coordinates);
//     } catch (error) {
//       console.error('Error fetching route:', error);
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
//       <h2>Directions to Clinic</h2>
//       {userLocation && route && (
//         <MapContainer center={userLocation} zoom={14} style={{ height: '400px', width: '100%' }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={userLocation} icon={customIcon}>
//             <Popup>Your Location</Popup>
//           </Marker>
//           <Marker position={[lat, lon]} icon={customIcon}>
//             <Popup>Clinic Location</Popup>
//           </Marker>
//           <Polyline positions={route} color="blue" />
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default Directions;

// DirectionsPage.js
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';
// import { Button } from 'react-bootstrap';


// // Fix leaflet default markers
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// const DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const DirectionsPage = () => {
//     const [userPosition, setUserPosition] = useState([51.505, -0.09]);
//     const [clinic, setClinic] = useState(null);
//     const [mapInitialized, setMapInitialized] = useState(false);
//     const { clinicId } = useParams();
//     const navigate = useNavigate();
//     const mapRef = useRef();

//     useEffect(() => {
//         const foundClinic = clinics.find(c => c.id === parseInt(clinicId));
//         if (!foundClinic) {
//             navigate('/');
//             return;
//         }
//         setClinic(foundClinic);

//         navigator.geolocation.getCurrentPosition(
//             pos => {
//                 const newPos = [pos.coords.latitude, pos.coords.longitude];
//                 setUserPosition(newPos);
//                 setMapInitialized(true);
//             },
//             err => {
//                 console.error("Error getting position:", err);
//                 setMapInitialized(true);
//             }
//         );
//     }, [clinicId, navigate]);

//     const Routing = () => {
//         const map = useMap();

//         useEffect(() => {
//             if (!map || !clinic) return;

//             const routingControl = L.Routing.control({
//                 waypoints: [
//                     L.latLng(userPosition[0], userPosition[1]),
//                     L.latLng(clinic.coordinates[0], clinic.coordinates[1])
//                 ],
//                 routeWhileDragging: true,
//                 show: true,
//                 addWaypoints: false,
//                 draggableWaypoints: false,
//                 fitSelectedRoutes: true,
//             }).addTo(map);

//             return () => map.removeControl(routingControl);
//         }, [map, clinic, userPosition]);

//         return null;
//     };

//     if (!mapInitialized || !clinic) {
//         return <div>Loading map...</div>;
//     }

//     return (
//         <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
//             <Button 
//                 variant="secondary"
//                 style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}
//                 onClick={() => navigate(-1)}
//             >
//                 ← Back
//             </Button>
            
//             <MapContainer
//                 center={userPosition}
//                 zoom={13}
//                 style={{ height: '100%', width: '100%' }}
//                 ref={mapRef}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
                
//                 <Marker position={userPosition}>
//                     <Popup>Your Location</Popup>
//                 </Marker>
                
//                 <Marker position={clinic.coordinates}>
//                     <Popup>{clinic.name}</Popup>
//                 </Marker>

//                 <Routing />
//             </MapContainer>
//         </div>
//     );
// };

// export default DirectionsPage;