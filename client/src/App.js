import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import 'bootstrap/dist/js/bootstrap.bundle';
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginLandlord from './components/Auth/Login/landlord';
import Homepage from './components/Pages/homePage.jsx';
// import LoginUser from './components/Auth/Login/tenant';
import LoginPage from './components/Auth/Login/Login.js';
import RegisterUser from './components/Auth/Register/Register.js'; 
// import RegisterLandlord from './components/Auth/Register/landlordRegister';
import RoomSearch from './components/Pages/RoomSearch.js'
import UserProfile from './components/Auth/Profile/tenantProfile.js';
import LandlordDashboard from './components/Auth/Profile/landlordProfile.js';
import UpdateRoom from './components/Pages/updateRoom.jsx';
import RoomRequests from './components/Pages/roomRequests.jsx';
import AddRoom from './components/Pages/addRoom.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<RegisterUser />} /> 

        {/* Protected Routes */}
        <Route path="/tenantProfile" element={<UserProfile />} />
        <Route path="/landlordProfile" element={<LandlordDashboard />} />
        <Route path="/search" element={<RoomSearch />} />
        <Route path="/updateRoom" element={<UpdateRoom />} />
        <Route path="/roomRequests" element={<RoomRequests />} />
        <Route path="/addRoom" element={<AddRoom />} />
        {/* 654fd173ab76d6a714ad8527 */}
        
      </Routes>
    </Router>
  );
}

export default App;
