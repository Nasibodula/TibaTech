import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import SymptomChecker from './pages/SymptomsCheck';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Viewmore from './pages/Viewmore';
import NearbyClinics from './pages/NearbyClinics';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TelemedicinePage from './pages/Consultation';
import HelpCenter from './pages/HelpCenter';

function App() {
  // Leaflet marker icon setup
  let DefaultIcon = L.icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/symtomscheck" element={<SymptomChecker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/viewmore" element={<Viewmore />} />
          <Route path="/clinics" element={<NearbyClinics />} />
          <Route path="/consult" element={<TelemedicinePage />} />
          <Route path="/contact" element={ <HelpCenter />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
