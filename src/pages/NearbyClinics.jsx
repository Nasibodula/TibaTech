import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize the map component with your access token
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const NearbyClinics = () => {
  const [userLocation, setUserLocation] = useState(null); // User's current location
  const [nearbyClinics, setNearbyClinics] = useState([]); // List of nearby health centers
  const [error, setError] = useState(null); // Error handling

  // Fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          fetchNearbyClinics(longitude, latitude); // Fetch nearby clinics
        },
        (err) => {
          setError('Unable to retrieve your location. Please enable location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Fetch nearby health centers (mock function for demonstration)
  const fetchNearbyClinics = async (longitude, latitude) => {
    try {
      // Replace this with a real API call to fetch nearby health centers
      const mockClinics = [
        { name: 'Clinic A', coordinates: [-0.481747846041145, 51.3233379650232] },
        { name: 'Clinic B', coordinates: [-0.491747846041145, 51.3333379650232] },
        { name: 'Clinic C', coordinates: [-0.471747846041145, 51.3133379650232] },
      ];
      setNearbyClinics(mockClinics);
    } catch (err) {
      setError('Failed to fetch nearby health centers.');
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        center={userLocation || [0, 0]} // Center map on user's location
        zoom={[14]} // Zoom level
      >
        {/* Display user's location */}
        {userLocation && (
          <Marker coordinates={userLocation} anchor="bottom">
            <div style={{ color: 'blue', fontWeight: 'bold' }}>You are here</div>
          </Marker>
        )}

        {/* Display nearby health centers */}
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          {nearbyClinics.map((clinic, index) => (
            <Feature key={index} coordinates={clinic.coordinates} />
          ))}
        </Layer>
      </Map>
    </div>
  );
};

export default NearbyClinics;

