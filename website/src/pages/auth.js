import React from 'react'
import {useState, useEffect} from 'react'
import Fade from "react-bootstrap/Fade"
import Card from "react-bootstrap/Card"
import ListGroup from  "react-bootstrap/ListGroup"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useContext } from 'react';

const AuthPage = () => {
    const [fadeState, setFadeState] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        setFadeState(true)
    }, [])

    const googleSuccess = (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        const user = {
            profileObj: res?.profileObj,
            token: res?.tokenId,
            tokenObj: res?.tokenObj
        }
        try {
            localStorage.setItem('user', JSON.stringify(user))
            axios.post('http://localhost:5000/user/auth', {tokenId: token}).then((res)=>{
                console.log(res)
                navigate('/raw-can')
            }).catch((res)=>{
                console.log(res)
            })
        } catch (err) {
            console.log(err)
        }
        // console.log(res)
    }

    const googleFailure = (res) => {
        console.log(res)
    }

    return (
        
        <Fade in={fadeState}>
            
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
            <Card style={{width: '18rem'}}>
                <Card.Header>Getting Started...</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <GoogleLogin
                            clientId={`${"469403570539-fnk4vhg7v5eb9ta1no0lr5fc24gco4b8.apps.googleusercontent.com"}`}
                            buttonText="Login with Google"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                        />  
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <GoogleLogout
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={()=> {localStorage.removeItem('user')}}
                    >
                    </GoogleLogout>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            

        </div>  
        
        </Fade>
        
    )
}

export default AuthPage