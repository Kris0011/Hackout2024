import Navbar from "./components/Navbar";
import CropDetection from "./pages/CropDetection";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantDiseaseDetction from "./pages/PlantDiseaseDetction";
import Auction from "./pages/Auction";

export default function App() {

  return (
    <div>
      <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/detection/crop" element={<CropDetection />}/>
        <Route path="/detection/plant-disease" element={<PlantDiseaseDetction />}/>
        <Route path="/auction" element={<Auction />}/>
      </Routes>
    </Router>
    </div>
  )
}
