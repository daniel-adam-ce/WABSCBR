import React from 'react'
import {useContext} from 'react'
import Card from "react-bootstrap/Card"
import ListGroup from  "react-bootstrap/ListGroup"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App';
import '../styles/auth.css'

import Paper from '@mui/material/Paper';
import TextField  from '@mui/material/TextField'

import {Link} from 'react-router-dom'

const AuthPage = () => {
    const [authState, setAuthState] = useContext(AuthContext)
    const navigate = useNavigate()
    const url = 'https://can-connect-server.herokuapp.com'
    const googleSuccess = (res) => {
        const token = res?.tokenId
        const user = {
            profileObj: res?.profileObj,
            token: res?.tokenId,
            tokenObj: res?.tokenObj
        }
        try {
            localStorage.setItem('user', JSON.stringify(user))
            axios.post(`${url}/user/auth`, {tokenId: token}).then((res)=>{
                console.log(res)
                setAuthState(true)
                navigate('/dashboard')
                // navigate('/raw-can?p=1&device=All Devices&vehicle=All Vehicles')
            }).catch((res)=>{
                console.log(res)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const googleFailure = (res) => {
        console.log(res)
    }

    return (
        
        // <div className="auth-body">
        //     <Card style={{width: '18rem'}}>
        //         <Card.Header>Getting Started...</Card.Header>
        //         <ListGroup variant="flush">
        //             <ListGroup.Item>
        //             <GoogleLogin
        //                     clientId="469403570539-fnk4vhg7v5eb9ta1no0lr5fc24gco4b8.apps.googleusercontent.com"
        //                     buttonText="Login with Google"
        //                     onSuccess={googleSuccess}
        //                     onFailure={googleFailure}
        //                     cookiePolicy={'single_host_origin'}
        //                 />  
        //             </ListGroup.Item>
        //             <ListGroup.Item>
        //             <GoogleLogout
        //                 clientId="469403570539-fnk4vhg7v5eb9ta1no0lr5fc24gco4b8.apps.googleusercontent.com"
        //                 buttonText="Logout"
        //                 onLogoutSuccess={()=> {localStorage.removeItem('user'); setAuthState(false)}}
        //             >
        //             </GoogleLogout>
        //             </ListGroup.Item>
        //         </ListGroup>
        //     </Card> 
        // </div>  

        <div className='auth-body'>
            <Paper className='paper-auth-bg' key={1} elevation={12}>
                <div className="login-text">Login</div>
                <div className="auth-text-field">
                    <TextField fullWidth label="Email"></TextField>
                </div>
                <div className="auth-text-field">
                    <TextField fullWidth label="Password"></TextField>
                </div>
                <div >
                    <button className="login-button">
                        Login
                    </button>
                </div>
                <Link to="/auth/register">Don't have an ac</Link>
                <div style={{marginBottom:'2%'}}>
                    or
                </div>

                <GoogleLogin
                    clientId="469403570539-fnk4vhg7v5eb9ta1no0lr5fc24gco4b8.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                />  
                
            </Paper>
        </div>

        
    )
}

export default AuthPage