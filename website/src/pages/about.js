import React from 'react'
import {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper';
import '../styles/about.css'
import { useNavigate } from 'react-router-dom'

const AboutPage = () => {
    
    const [fadeState, setFadeState] = useState('fade-out')
    const navigate = useNavigate()
    useEffect(()=>{
        setFadeState("fade-in")
        return () => {

        }
    })

    return (
        <div className='body'>
            <Paper className='paper-bg' key={1} elevation={24}>
                <div className={`${fadeState}`}>
                    <h1>something awesome about</h1>
                    <div>can connect</div>
                    <div>
                    <button className="google-button" onClick={()=>{
                            navigate('/auth')
                        }}>
                            Get Started with Google
                        </button>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default AboutPage