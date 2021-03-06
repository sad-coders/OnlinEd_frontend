// import logo from './logo.svg';
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UploadFile from "./components/UploadFile/UploadFile.js";

import { GlobalProvider } from "./context/GlobalState";
import Assignment from "./components/student/Assignment/Assignment";
import AssignmentMarks from "./components/student/Assignment/AssignmentMarks";

import Verify from "./components/verify/Verify";

import Discussion from "./components/Discussion/Discussion";
import QuestionPage from "./components/Discussion/QuestionPage";
import Classrooms from "./components/student/classrooms/Classrooms";
import AssignmentStream from "./components/student/AssignmentStream/AssignmentStream";
import Login from "./components/auth/Login";
import Loader from "./components/Loader";
import SignUp from "./components/auth/SignUp";
import ClassroomCreation from "./components/student/classrooms/ClassroomCreation";
import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";
// import Footer from "./components/HeaderFooter/Footer";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/classrooms" element={<Classrooms />} />

            <Route path="/faculty" element={<Classrooms />} />
            <Route path="/upload" element={<UploadFile />} />

            <Route
              path="/classroom/:classRoomId/discussion"
              element={<Discussion />}
            />
            <Route
              path="/classroom/:classRoomId/discussion/question"
              element={<QuestionPage />}
            />
            <Route
              path="/classroom/:classroomId"
              element={<AssignmentStream />}
            />
            <Route path="/assignment/:assignmentId" element={<Assignment />} />
          </Route>
          <Route path="/student" element={<Classrooms />} />
          <Route
            path="/assignmentmarks/:assignmentId"
            element={<AssignmentMarks />}
          />
          <Route path="/classrooms" element={<Classrooms />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify/:userId" element={<Verify />} />
          <Route path="/" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
