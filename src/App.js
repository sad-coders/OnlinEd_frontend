// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import UploadFile from './components/UploadFile/UploadFile.js';


import {GlobalProvider} from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student" element={<Home />} />
          <Route path="/faculty" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  ); 
}

export default App;
