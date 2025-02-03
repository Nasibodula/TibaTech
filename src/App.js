import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; 
import Services from './components/Services'; 
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import SymptomChecker from "./pages/SymtomsCheck";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Viewmore from "./pages/Viewmore";
import Clinics from "./pages/NearbyClinics";
import NearbyClinics from "./pages/NearbyClinics";
import DirectionsPage from "./pages/Directions";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';



function App() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
  return (
    <Router>
    <div className="App">
      <Navbar/>

                <Routes className='content'>
                    <Route path="/" element={<Homepage/>} /> 
                    <Route path="/symtomscheck" element={<SymptomChecker/>} /> 
                    <Route path="/profile" element={<Profile/>} /> 
                    <Route path="/signup" element={<Signup/>} /> 
                    <Route path="/viewmore" element={<Viewmore/>} /> 
                    <Route path="/clinics" element={<NearbyClinics/>} /> 
                    <Route path="/directions/:clinicId" element={<DirectionsPage />} />
                </Routes>
      {/* <Footer/>           */}
    </div>
    </Router>
  );
}

export default App;
