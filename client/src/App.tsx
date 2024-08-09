import { SocketComp } from "./component/SocketComp";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <div>
      <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navbar />} />

      </Routes>
    </Router>
    </div>
  )
}
