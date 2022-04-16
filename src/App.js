// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';


import {GlobalProvider} from './context/GlobalState';
import Assignment from './components/student/Assignment';
import Classrooms from './components/student/Classrooms';
import AssignmentStream from './components/student/AssignmentStream';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<AssignmentStream/>} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  ); 
}

export default App;
