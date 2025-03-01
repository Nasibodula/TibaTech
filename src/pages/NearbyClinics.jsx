import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

if (!process.env.REACT_APP_MAPBOX_ACCESS_TOKEN) {
  throw new Error('Mapbox access token is required');
}
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const NearbyHealthFacilities = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [manualLocation, setManualLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [35.2697, 0.5143], // Default to Eldoret coordinates
      zoom: 14
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      setIsMapLoading(false);
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!manualLocation.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(manualLocation)}.json?` +
        `access_token=${mapboxgl.accessToken}&` +
        `country=ke`
      );

      if (!response.ok) throw new Error('Location search failed');
      
      const data = await response.json();
      if (data.features.length === 0) {
        throw new Error('Location not found');
      }

      const [longitude, latitude] = data.features[0].center;
      setUserLocation([longitude, latitude]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle user location changes
  useEffect(() => {
    if (!mapLoaded || !userLocation || !map.current) return;

    // Fly to user location
    map.current.flyTo({
      center: userLocation,
      zoom: 14
    });

    // Add user location marker
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

    markersRef.current.push(marker);

    // Create AbortController for fetch requests
    const abortController = new AbortController();

    // Fetch nearby facilities
    fetchNearbyHealthFacilities(userLocation[0], userLocation[1], abortController);

    return () => {
      marker.remove();
      abortController.abort(); // Abort any ongoing fetch requests
    };
  }, [userLocation, mapLoaded]);

  const fetchNearbyHealthFacilities = async (longitude, latitude, controller) => {
    setIsLoading(true);
    try {
      const facilityTypes = ['clinic', 'pharmacy', 'hospital', 'doctor', 'medical'];
      const promises = facilityTypes.map(async (type) => {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${type}.json?` +
          `proximity=${longitude},${latitude}&` +
          `types=poi&` +
          `limit=10&` +
          `access_token=${mapboxgl.accessToken}`,
          { signal: controller.signal }
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        return data.features.map(feature => ({
          id: feature.id,
          name: feature.text,
          address: feature.place_name,
          coordinates: feature.center,
          type: type,
          distance: feature.properties.distance
        }));
      });

      const results = await Promise.all(promises);
      const allFacilities = results.flat().sort((a, b) => a.distance - b.distance);
      setFacilities(allFacilities);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Failed to fetch nearby health facilities:', err);
      setError('Failed to fetch nearby health facilities.');
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
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

  // Update markers when facilities change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    facilities.forEach(facility => {
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
            <h3 style="margin: 0 0 5px 0; font-size: 16px">${facility.name}</h3>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666">
              Type: ${facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
            </p>
            <p style="margin: 0; font-size: 12px; color: #888">${facility.address}</p>
          </div>
        `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(facility.coordinates)
        .setPopup(popup)
        .addTo(map.current);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [facilities, mapLoaded]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Location Search Form */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        width: '80%',
        maxWidth: '400px'
      }}>
        <form onSubmit={handleLocationSearch} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            placeholder="Enter location (e.g., Moi Teaching Hospital Eldoret)"
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: 'black'
            }}
          />
          <button
            type="submit"
            disabled={isSearching}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSearching ? 'not-allowed' : 'pointer'
            }}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div style={{ 
          position: 'absolute', 
          top: 70,
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
      
      {(isLoading || isMapLoading) && (
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
          {isMapLoading ? 'Loading map...' : 'Loading nearby facilities...'}
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
