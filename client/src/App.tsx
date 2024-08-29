import Navbar from "./components/Navbar";
import CropDetection from "./pages/CropDetection";
import FireDetection from "./pages/FireDetection";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auction from "./pages/Auction";
import  { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footersection";
import AuctionRoom from "./pages/AuctionRoom";


export default function App() {
  const dispatch = useDispatch();

  const findUser = async () => {
    try {
      const res = await axios.get("https://hackout2024-1.onrender.com/getuser", { withCredentials: true });

      console.log(res.data);
      if (!res.data.isAuthenticated) {
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

      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-primary">
      <Router>
        <Toaster />
        <Navbar />
        <main className="flex-1 mt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DashBoard />} />
            <Route path="/detection/crop" element={<CropDetection />} />
            <Route path="/market" element={<Auction />} />
            <Route path="/market/:id" element={<AuctionRoom />} />
            <Route path="/fire-predictor" element={<FireDetection />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
