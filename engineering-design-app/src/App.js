import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";	
import Aboutus from "./pages/Aboutus";
import NoPage from "./pages/NoPage";
//import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Lamp from './pages/Lamp';
import LampSettings from './pages/LampSettings';
import Homepage from './pages/Homepage';
import Statistics from './pages/Statistics';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="lampsettings" element={<LampSettings />} />
          <Route path="lamp" element={<Lamp />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
