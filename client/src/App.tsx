import Navbar from "./components/Navbar";
import CropDetection from "./pages/CropDetection";
import FireDetection from "./pages/FireDetection";  
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantDiseaseDetction from "./pages/PlantDiseaseDetction";
import Auction from "./pages/Auction";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import i18 from "i18next";

interface Description {
  line1: string;
  line2: string;
}

import Footer from "./components/Footersection";

export default function App() {

  const dispatch = useDispatch();
  
  const findUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getuser" , { withCredentials: true });

      console.log(res.data);

      if(!res.data.loggedIn){
        console.log("No user found");
        dispatch({
          type: "CLEAR_USER",
        });
        return;
      }    

      dispatch({
        type: "SET_USER",
        payload: res.data,
      });

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/detection/crop" element={<CropDetection />} />
          <Route path="/detection/plant-disease" element={<PlantDiseaseDetction />} />
          {/* <Route path="/auction" element={<Auction />} /> */}
          <Route path="/fire-predictor" element={<FireDetection />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}
