// import logo from './logo.svg';
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UploadFile from "./components/UploadFile/UploadFile.js";

import { GlobalProvider } from "./context/GlobalState";
import Assignment from "./components/student/Assignment";

import Verify from "./components/verify/Verify";

import Classrooms from "./components/student/Classrooms";
import AssignmentStream from "./components/student/AssignmentStream";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<AssignmentStream />} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/verify/:userId" element={<Verify />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
