// import React, { useEffect, useState } from 'react';
// import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// // Initialize the map component with your access token
// const Map = ReactMapboxGl({
//   accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
// });

// const NearbyHealthFacilities = () => {
//   const [userLocation, setUserLocation] = useState(null); // User's current location
//   const [nearbyClinics, setNearbyClinics] = useState([]); // List of nearby clinics
//   const [nearbyPharmacies, setNearbyPharmacies] = useState([]); // List of nearby pharmacies
//   const [nearbyHospitals, setNearbyHospitals] = useState([]); // List of nearby hospitals
//   const [error, setError] = useState(null); // Error handling

//   // Fetch user's location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([longitude, latitude]);
//           fetchNearbyHealthFacilities(longitude, latitude); // Fetch nearby health facilities
//         },
//         (err) => {
//           setError('Unable to retrieve your location. Please enable location access.');
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser.');
//     }
//   }, []);

//   const fetchNearbyHealthFacilities = async (longitude, latitude) => {
//     try {
//       // Fetch clinics
//       const clinicsResponse = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/clinic.json?proximity=${longitude},${latitude}&types=poi&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
//       );
//       if (!clinicsResponse.ok) throw new Error(`HTTP error! status: ${clinicsResponse.status}`);
//       const clinicsData = await clinicsResponse.json();
//       setNearbyClinics(clinicsData.features.map(feature => ({
//         name: feature.text,
//         coordinates: feature.center,
//         type: 'clinic'
//       })));

//       // Fetch pharmacies
//       const pharmaciesResponse = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/pharmacy.json?proximity=${longitude},${latitude}&types=poi&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
//       );
//       if (!pharmaciesResponse.ok) throw new Error(`HTTP error! status: ${pharmaciesResponse.status}`);
//       const pharmaciesData = await pharmaciesResponse.json();
//       setNearbyPharmacies(pharmaciesData.features.map(feature => ({
//         name: feature.text,
//         coordinates: feature.center,
//         type: 'pharmacy'
//       })));

//       // Fetch hospitals
//       const hospitalsResponse = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&types=poi&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
//       );
//       if (!hospitalsResponse.ok) throw new Error(`HTTP error! status: ${hospitalsResponse.status}`);
//       const hospitalsData = await hospitalsResponse.json();
//       setNearbyHospitals(hospitalsData.features.map(feature => ({
//         name: feature.text,
//         coordinates: feature.center,
//         type: 'hospital'
//       })));

//     } catch (err) {
//       console.error('Failed to fetch nearby health facilities:', err);
//       setError('Failed to fetch nearby health facilities.');
//     }
//   };

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//       <Map
//         style="mapbox://styles/mapbox/streets-v9"
//         containerStyle={{
//           height: '100vh',
//           width: '100vw',
//         }}
//         center={userLocation || [0, 0]} // Center map on user's location
//         zoom={[14]} // Zoom level
//       >
//         {/* Display user's location */}
//         {userLocation && (
//           <Marker coordinates={userLocation} anchor="bottom">
//             <div style={{ color: 'blue', fontWeight: 'bold' }}>You are here</div>
//           </Marker>
//         )}

//         {/* Display nearby clinics */}
//         <Layer type="symbol" id="clinic" layout={{ 'icon-image': 'marker-15', 'icon-size': 1.5 }}>
//           {nearbyClinics.map((clinic, index) => (
//             <Feature key={`clinic-${index}`} coordinates={clinic.coordinates} />
//           ))}
//         </Layer>

//         {/* Display nearby pharmacies */}
//         <Layer type="symbol" id="pharmacy" layout={{ 'icon-image': 'pharmacy-15', 'icon-size': 1.5 }}>
//           {nearbyPharmacies.map((pharmacy, index) => (
//             <Feature key={`pharmacy-${index}`} coordinates={pharmacy.coordinates} />
//           ))}
//         </Layer>

//         {/* Display nearby hospitals */}
//         <Layer type="symbol" id="hospital" layout={{ 'icon-image': 'hospital-15', 'icon-size': 1.5 }}>
//           {nearbyHospitals.map((hospital, index) => (
//             <Feature key={`hospital-${index}`} coordinates={hospital.coordinates} />
//           ))}
//         </Layer>
//       </Map>
//     </div>
//   );
// };

// export default NearbyHealthFacilities;

// import React, { useEffect, useState, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// const NearbyHealthFacilities = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const markersRef = useRef([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [facilities, setFacilities] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   // Initialize map
//   useEffect(() => {
//     if (map.current) return;

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [0, 0],
//       zoom: 2 // Start with a zoomed-out view
//     });

//     map.current.on('load', () => {
//       setMapLoaded(true);
//       map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
//     });

//     return () => {
//       if (map.current) {
//         map.current.remove();
//         map.current = null;
//       }
//     };
//   }, []);

//   // Get user location
//   useEffect(() => {
//     if (!mapLoaded) return;

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([longitude, latitude]);
//         },
//         (err) => {
//           setError('Unable to retrieve your location. Please enable location access.');
//           // Set default location if geolocation fails
//           setUserLocation([-74.006, 40.7128]); // Default to New York City
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser.');
//       setUserLocation([-74.006, 40.7128]); // Default to New York City
//     }
//   }, [mapLoaded]);

//   // Handle user location changes
//   useEffect(() => {
//     if (!mapLoaded || !userLocation || !map.current) return;

//     // Fly to user location
//     map.current.flyTo({
//       center: userLocation,
//       zoom: 14,
//       essential: true
//     });

//     // Add user location marker
//     const el = document.createElement('div');
//     el.className = 'user-location-marker';
//     el.style.backgroundColor = '#4285F4';
//     el.style.width = '20px';
//     el.style.height = '20px';
//     el.style.borderRadius = '50%';
//     el.style.border = '3px solid white';
//     el.style.boxShadow = '0 0 0 2px #4285F4';

//     const marker = new mapboxgl.Marker(el)
//       .setLngLat(userLocation)
//       .addTo(map.current);

//     markersRef.current.push(marker);

//     // Fetch nearby facilities
//     fetchNearbyHealthFacilities(userLocation[0], userLocation[1]);
//   }, [userLocation, mapLoaded]);

//   // Update markers when facilities change
//   useEffect(() => {
//     if (!mapLoaded || !map.current) return;

//     // Clear existing markers except user location marker
//     markersRef.current.slice(1).forEach(marker => marker.remove());
//     markersRef.current = [markersRef.current[0]];

//     // Add new markers
//     facilities.forEach(facility => {
//       const el = document.createElement('div');
//       el.className = 'facility-marker';
//       el.style.width = '12px';
//       el.style.height = '12px';
//       el.style.backgroundColor = getFacilityColor(facility.type);
//       el.style.borderRadius = '50%';
//       el.style.border = '2px solid white';
//       el.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.2)';
//       el.style.cursor = 'pointer';

//       const popup = new mapboxgl.Popup({ offset: [0, -10] })
//         .setHTML(`
//           <div style="padding: 5px">
//             <h3 style="margin: 0 0 5px 0; font-size: 16px">${facility.name}</h3>
//             <p style="margin: 0 0 5px 0; font-size: 14px; color: #666">
//               Type: ${facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
//             </p>
//             <p style="margin: 0; font-size: 12px; color: #888">${facility.address}</p>
//           </div>
//         `);

//       const marker = new mapboxgl.Marker(el)
//         .setLngLat(facility.coordinates)
//         .setPopup(popup)
//         .addTo(map.current);

//       markersRef.current.push(marker);
//     });
//   }, [facilities, mapLoaded]);

//   const fetchNearbyHealthFacilities = async (longitude, latitude) => {
//     setIsLoading(true);
//     try {
//       const facilityTypes = ['clinic', 'pharmacy', 'hospital', 'doctor', 'medical'];
//       const promises = facilityTypes.map(async (type) => {
//         // Remove whitespace from the URL and use template literals properly
//         const response = await fetch(
//           `https://api.mapbox.com/geocoding/v5/mapbox.places/${type}.json?proximity=${longitude},${latitude}&types=poi&limit=10&access_token=${mapboxgl.accessToken}`
//         );

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
        
//         return data.features.map(feature => ({
//           id: feature.id,
//           name: feature.text || feature.place_name,
//           address: feature.place_name,
//           coordinates: feature.center,
//           type: type,
//           distance: feature.properties?.distance || 0
//         }));
//       });

//       const results = await Promise.all(promises);
//       const allFacilities = results.flat().sort((a, b) => a.distance - b.distance);
//       setFacilities(allFacilities);
//     } catch (err) {
//       console.error('Failed to fetch nearby health facilities:', err);
//       setError('Failed to fetch nearby health facilities.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getFacilityColor = (type) => {
//     const colors = {
//       clinic: '#FF4444',
//       pharmacy: '#4CAF50',
//       hospital: '#2196F3',
//       doctor: '#9C27B0',
//       medical: '#FF9800'
//     };
//     return colors[type] || '#666666';
//   };

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
//       {error && (
//         <div style={{ 
//           position: 'absolute', 
//           top: 10, 
//           left: '50%', 
//           transform: 'translateX(-50%)',
//           zIndex: 1,
//           backgroundColor: '#ff5252',
//           color: 'white',
//           padding: '10px 20px',
//           borderRadius: '5px'
//         }}>
//           {error}
//         </div>
//       )}
      
//       {isLoading && (
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           zIndex: 1,
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '5px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//         }}>
//           Loading nearby facilities...
//         </div>
//       )}

//       <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

//       {/* Legend */}
//       <div style={{
//         position: 'absolute',
//         bottom: '20px',
//         right: '20px',
//         backgroundColor: 'white',
//         padding: '10px',
//         borderRadius: '5px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
//         zIndex: 1
//       }}>
//         <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Legend</div>
//         {Object.entries({
//           'You are here': '#4285F4',
//           'Clinic': '#FF4444',
//           'Pharmacy': '#4CAF50',
//           'Hospital': '#2196F3',
//           'Doctor': '#9C27B0',
//           'Medical Center': '#FF9800'
//         }).map(([label, color]) => (
//           <div key={label} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
//             <div style={{
//               width: '10px',
//               height: '10px',
//               backgroundColor: color,
//               borderRadius: '50%',
//               marginRight: '5px'
//             }} />
//             <span style={{ fontSize: '12px' }}>{label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NearbyHealthFacilities;

import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFzaWJvZHVsYSIsImEiOiJjbTZ2OHUwZHQwNW9sMnFzOWF4bWtib3cyIn0.Miu3yNRbOYmO2oemFHNryA';

const NearbyHealthFacilities = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Unable to retrieve your location. Please enable location access.');
          setUserLocation([-74.006, 40.7128]); // Default to NYC
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setUserLocation([-74.006, 40.7128]); // Default to NYC
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapLoaded || !userLocation || !map.current) return;

    map.current.flyTo({
      center: userLocation,
      zoom: 13,
      essential: true
    });

    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.style.backgroundColor = '#4285F4';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 0 0 2px #4285F4';

    const marker = new mapboxgl.Marker(el)
      .setLngLat(userLocation)
      .addTo(map.current);

    markersRef.current = [marker];

    // Fetch facilities with different search terms
    fetchNearbyHealthFacilities(userLocation[0], userLocation[1]);
  }, [userLocation, mapLoaded]);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    markersRef.current.slice(1).forEach(marker => marker.remove());
    markersRef.current = markersRef.current.slice(0, 1);

    facilities.forEach(facility => {
      try {
        const el = document.createElement('div');
        el.className = 'facility-marker';
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.backgroundColor = getFacilityColor(facility.type);
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.2)';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: [0, -10] })
          .setHTML(`
            <div style="padding: 5px">
              <h3 style="margin: 0 0 5px 0; font-size: 16px">${facility.name || 'Unnamed Location'}</h3>
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #666">
                Type: ${facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
              </p>
              <p style="margin: 0; font-size: 12px; color: #888">${facility.address || 'No address available'}</p>
            </div>
          `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(facility.coordinates)
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current.push(marker);
      } catch (err) {
        console.error('Error adding facility marker:', err);
      }
    });
  }, [facilities, mapLoaded]);

  const fetchNearbyHealthFacilities = async (longitude, latitude) => {
    setIsLoading(true);
    try {
      // Updated search terms for better results
      const searchQueries = [
        { type: 'hospital', terms: ['hospital', 'medical center', 'healthcare'] },
        { type: 'clinic', terms: ['clinic', 'medical clinic', 'health clinic'] },
        { type: 'pharmacy', terms: ['pharmacy', 'drugstore', 'chemist'] },
        { type: 'doctor', terms: ['doctor office', 'physician', 'medical office'] },
        { type: 'medical', terms: ['urgent care', 'emergency room', 'medical facility'] }
      ];

      const allPromises = searchQueries.flatMap(({ type, terms }) =>
        terms.map(async (term) => {
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(term)}.json?proximity=${longitude},${latitude}&types=poi&limit=5&access_token=${mapboxgl.accessToken}`;
          
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            return data.features.map(feature => ({
              id: feature.id,
              name: feature.text || feature.place_name,
              address: feature.place_name,
              coordinates: feature.center,
              type: type,
              distance: feature.properties?.distance || 0
            }));
          } catch (error) {
            console.error(`Error fetching ${term}:`, error);
            return [];
          }
        })
      );

      const results = await Promise.all(allPromises);
      const allFacilities = results
        .flat()
        .flat()
        .filter(facility => facility.name && facility.coordinates)
        .reduce((unique, facility) => {
          const exists = unique.find(f => 
            f.coordinates[0] === facility.coordinates[0] && 
            f.coordinates[1] === facility.coordinates[1]
          );
          return exists ? unique : [...unique, facility];
        }, [])
        .sort((a, b) => a.distance - b.distance);

      console.log('Fetched facilities:', allFacilities);
      setFacilities(allFacilities);
    } catch (err) {
      console.error('Failed to fetch nearby health facilities:', err);
      setError('Failed to fetch nearby health facilities.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFacilityColor = (type) => {
    const colors = {
      clinic: '#FF4444',
      pharmacy: '#4CAF50',
      hospital: '#2196F3',
      doctor: '#9C27B0',
      medical: '#FF9800'
    };
    return colors[type] || '#666666';
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {error && (
        <div style={{ 
          position: 'absolute', 
          top: 10, 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 1,
          backgroundColor: '#ff5252',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px'
        }}>
          {error}
        </div>
      )}
      
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Loading nearby facilities...
        </div>
      )}

      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 1
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Legend</div>
        {Object.entries({
          'You are here': '#4285F4',
          'Clinic': '#FF4444',
          'Pharmacy': '#4CAF50',
          'Hospital': '#2196F3',
          'Doctor': '#9C27B0',
          'Medical Center': '#FF9800'
        }).map(([label, color]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            <div style={{
              width: '10px',
              height: '10px',
              backgroundColor: color,
              borderRadius: '50%',
              marginRight: '5px'
            }} />
            <span style={{ fontSize: '12px' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHealthFacilities;