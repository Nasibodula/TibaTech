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



function App() {
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

                </Routes>
      <Footer/>          
    </div>
    </Router>
  );
}

export default App;
