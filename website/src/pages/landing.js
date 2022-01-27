import React from 'react'
import {useState, useEffect} from 'react'
import Fade from "react-bootstrap/Fade"
import { Navigate } from 'react-router-dom';
const auth = true

const LandingPage = () => {

    const [fadeState, setFadeState] = useState(false)
    useEffect(()=>{
        setFadeState(true)
    }, [])
    
    if (auth){
        return (
            <Navigate to="/auth"/>
        )
    } else {
        return (
            <Fade in={fadeState}>
            <div>
                landing
            </div>  
            </Fade>
            
        )
    }
    
}

export default LandingPage