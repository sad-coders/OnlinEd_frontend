// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';


import {GlobalProvider} from './context/GlobalState';
import Classmates from './components/student/Classmates';
import Assignment from './components/student/Assignment';
import Classrooms from './components/student/Classrooms';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<Classrooms/>} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  ); 
}

export default App;
