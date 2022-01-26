// import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import {LandingPage, AuthPage, RawPage} from './pages/'
import LandingPage from './pages/landing.js'
import AuthPage from './pages/auth.js'
import RawPage from './pages/raw.js'

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path='/' exact element={<LandingPage/>}></Route>
          <Route path='/auth' element={<AuthPage/>}></Route>
          <Route path='/raw-can' element={<RawPage/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
