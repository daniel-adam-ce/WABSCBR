import React from 'react'
import {useState, useEffect} from 'react'
import Fade from "react-bootstrap/Fade"
import { useNavigate, } from 'react-router-dom';

const LandingPage = () => {

    const [fadeState, setFadeState] = useState(false)
    useEffect(()=>{
        setFadeState(true)
    }, [])
    const navigate = useNavigate()

    return (
        <Fade in={fadeState}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
            <button style={{backgroundColor: "#1394F9", color: 'white',borderRadius: 10, border: 'none', padding: '0.5rem', }} onClick={()=>{
                navigate('/auth')
            }}>
                Get Started with Google
            </button>
        </div>
        </Fade>
        
    )
    
}

export default LandingPage