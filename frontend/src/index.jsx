import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import Login from "./login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./register/Register"; 
import DistancePage from "./distancePage/DistancePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/distancePage" element={<DistancePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
