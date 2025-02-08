import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import SymptomChecker from "./pages/SymtomsCheck";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Viewmore from "./pages/Viewmore";
import NearbyHealthFacilities from "./pages/NearbyClinics";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import TelemedicinePage from "./pages/Consultation";



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
                    <Route path="/clinics" element={<NearbyHealthFacilities/>} /> 
                    {/* <Route path="/directions/:clinicId" element={<DirectionsPage />} /> */}
                    <Route path="/consult" element={<TelemedicinePage/>}/>
                </Routes>
      {/* <Footer/>           */}
    </div>
    </Router>
  );
}

export default App;
