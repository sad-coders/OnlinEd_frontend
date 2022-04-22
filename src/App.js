// import logo from './logo.svg';
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UploadFile from "./components/UploadFile/UploadFile.js";

import { GlobalProvider } from "./context/GlobalState";
import Assignment from "./components/student/Assignment/Assignment";

import Verify from "./components/verify/Verify";

<<<<<<< HEAD
import Classrooms from "./components/student/Classrooms";
import AssignmentStream from "./components/student/AssignmentStream";
import Discussion from "./components/Discussion/Discussion";
import QuestionPage from "./components/Discussion/QuestionPage";
=======
import Classrooms from "./components/student/classrooms/Classrooms";
import AssignmentStream from "./components/student/AssignmentStream/AssignmentStream";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ClassroomCreation from "./components/student/classrooms/ClassroomCreation";
>>>>>>> 6c7ee0cb1a60a926a2f1294a88542dfd10e2fbdb

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<Assignment />} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/verify/:userId" element={<Verify />} />
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
          <Route
            path="/classroom/:classRoomId/discussion"
            element={<Discussion />}
          />
          <Route
            path="/classroom/:classRoomId/discussion/question"
            element={<QuestionPage />}
          />
=======
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
>>>>>>> 6c7ee0cb1a60a926a2f1294a88542dfd10e2fbdb
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
