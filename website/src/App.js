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
import NotFoundRedirect from './components/notFoundRedirect.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

export const AuthContext = React.createContext()

function useTokenVerify() {
  const [authState, setAuthState] = useState(false)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const source = axios.CancelToken.source()
    if (user === null) {
        console.log('user is null')
    } else {
        axios.post('http://localhost:5000/user/auth', {tokenId: user.token}).then((res)=>{
            setAuthState(true)
        }).catch((res)=>{
            console.log(res)
        })
    }
    
    console.log(authState)
    return () => {
        source.cancel()
    }
  }, [])
  return [authState, setAuthState]
}

function App() {
  
  const [authState, setAuthState] = useTokenVerify()
  
  return (
    <div>
      
      <Router>
      <AuthContext.Provider value={[authState, setAuthState]}>
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
        </AuthContext.Provider>
      </Router> 
      
      
    </div>
  );
}

export default App;
