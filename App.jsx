import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ProgressCircle from "./Components/ProgressCircle";
import PrivateRoute from "./Components/PrivateRoute"; // Import PrivateRoute
import Progress from "./Components/Progress";
import Ranks from "./Components/Ranks";
import DareClicked from "./Components/DareClicked";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Public Route */}
      {/* Protected Routes wrapped with PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<ProgressCircle />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/dareclicked" element={<DareClicked />} />
      </Route>
    </Routes>
  );
}

export default App;
