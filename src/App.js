// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';


import {GlobalProvider} from './context/GlobalState';
import Classmates from './components/student/Classmates';
import Assignment from './components/student/Assignment';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<Assignment/>} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  ); 
}

export default App;
