import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate, } from 'react-router-dom'
import landingImg from "../landing1.png"
import '../styles/landing.css'

const LandingPage = () => {

    // const [fadeState, setFadeState] = useState(false)
    const [fadeState, setFadeState] = useState('fade-out')
    const [fadeState1, setFadeState1] = useState('fade-out')
    const [fadeState2, setFadeState2] = useState('fade-out')
    // const fontSize1 = (useWindowSize()[1]/480)
    useEffect(()=>{
        // setFadeState(true)
        // let el = document.querySelector('figcaption-1')
        // el.classList.add('fade-in')
        setFadeState("fade-in")
        const timeout = setInterval(()=>{
            setFadeState1("fade-in")
        }, 1000)
        const timeout2 = setInterval(()=>{
            setFadeState2("fade-in")
        }, 1500)
    }, [])
    const navigate = useNavigate()

    return (
        
            <div style={{backgroundColor:"#212529"}}>
            {/* <Container > */}
                <figure className="position-relative">
                    <img src={landingImg} alt="phone" width="100%"></img>
                </figure>
                {/* <Fade in={fadeState} timeout={10000}> */}
                <div>
                <figcaption className={`figcaption-1 content-body ${fadeState}`}>
                    {"CAN Connect."}
                </figcaption>

                <figcaption className={`figcaption-2 content-body ${fadeState1}`}>
                    {"Access your car's data any time, any place."}
                </figcaption>

                <figcaption className={`figcaption-3 content-body ${fadeState2}`}>
                    <button className="start-button" onClick={()=>{
                            navigate('/auth')
                        }}>
                            Get Started with Google
                        </button>
                </figcaption>   
                </div>
                {/* </Fade>       */}
            {/* </Container> */}
            </div>
            
        
       
        
    )
    
}

export default LandingPage