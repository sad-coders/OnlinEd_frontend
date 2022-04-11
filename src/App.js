// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<Home />} />
        <Route path="/faculty" element={<Home />} />
        <Route path="/upload" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
