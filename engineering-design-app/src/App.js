import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";	
import Aboutus from "./pages/Aboutus";
import NoPage from "./pages/NoPage";
//import Homepage from "./pages/Homepage";
import Lamp from './pages/Lamp';
import LampSettings from './pages/LampSettings';
import Homepage from './pages/Homepage';
import Statistics from './pages/Statistics';
import AddLight from './pages/AddLight';
import Debug from './pages/Debug';


export default function App() {
  //get window url
  //assign url to variable
  //check whether the url is eaqual to the url of the tab you are on
  //if it is, then set the tab to active
  //if not, then set the tab to inactive
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="lampsettings" element={<LampSettings />} />
          <Route path="lamp" element={<Lamp />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="addlight" element={<AddLight />} />
          <Route path="debug" element={<Debug />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
