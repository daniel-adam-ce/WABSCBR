import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/landing.js'
import AuthPage from './pages/auth.js'
import RawPage from './pages/raw.js'
import TroublePage from './pages/trouble.js'
import VehiclePage from './pages/vehicle.js'
import DevicePage from './pages/device.js'
import NotFoundPage from './pages/notFound.js'
import NavBar from './components/navbar'
import Container from "react-bootstrap/Container"
import NotFoundRedirect from './components/notFoundRedirect.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      
      <Router>
          <NavBar/>
          <Routes>
            <Route path='/' exact element={<LandingPage/>}></Route>
            <Route path='/auth' element={<AuthPage/>}></Route>
            <Route path='/raw-can' element={<RawPage/>}></Route>
            <Route path='/trouble-codes' element={<TroublePage/>}></Route>
            <Route path='/vehicle-data' element={<VehiclePage/>}></Route>
            <Route path='/device' element={<DevicePage/>}></Route>
            <Route path='/not-found' element={<NotFoundPage/>}></Route>
            <Route path='*' element={<NotFoundRedirect/>}></Route>
          </Routes>
      </Router> 
      
      
    </div>
  );
}

export default App;
