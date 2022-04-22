// import logo from './logo.svg';
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UploadFile from "./components/UploadFile/UploadFile.js";

import { GlobalProvider } from "./context/GlobalState";
import Assignment from "./components/student/Assignment/Assignment";

import Verify from "./components/verify/Verify";

import Classrooms from "./components/student/classrooms/Classrooms";
import AssignmentStream from "./components/student/AssignmentStream/AssignmentStream";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ClassroomCreation from "./components/student/classrooms/ClassroomCreation";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<Assignment />} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/verify/:userId" element={<Verify />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
