import React from 'react'
import {useState, useEffect} from 'react'
import Fade from "react-bootstrap/Fade"

const AuthPage = () => {
    const [fadeState, setFadeState] = useState(false)
    useEffect(()=>{
        setFadeState(true)
    }, [])

    return (
        <Fade in={fadeState}>
        <div>
            Auth Page
        </div>  
        </Fade>
        
    )
}

export default AuthPage