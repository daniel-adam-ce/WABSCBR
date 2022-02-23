import React from 'react'
import {useContext, useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App';
import '../styles/auth.css'

import Paper from '@mui/material/Paper';
import TextField  from '@mui/material/TextField'

import {Link} from 'react-router-dom'

const AuthPage = () => {
    const [authState, setAuthState] = useContext(AuthContext)
    const [passwordError, setPasswordError] = useState({state: false, message: ''})
    const [emailError, setEmailError] = useState({state: false, message: ''})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const url = 'https://can-connect-server.herokuapp.com'
    // const url = 'http://localhost:5000'
    const googleSuccess = async (res) => {
        const token = res?.tokenId
        const user = {
            profileObj: res?.profileObj,
            token: res?.tokenId,
            tokenObj: res?.tokenObj,
            isGoogle: true
        }
        try {
            const res = await axios.post(`${url}/user/auth/google`, {tokenId: token})
            localStorage.setItem('user', JSON.stringify(user))
            setAuthState(true)
            console.log(res)
            navigate('/dashboard')
        } catch (err) {
            console.log(err.response)
        }
    }

    const googleFailure = (res) => {
        console.log(res)
    }

    const nativeLoginSubmit = async () => {
        try {
            setEmailError({state:false, message: ''})
            setPasswordError({state:false, message: ''})
            const res = await axios.post(`${url}/user/auth/login?email=${email}&password=${password}`)
            localStorage.setItem('user', JSON.stringify(res.data))
            setAuthState(true)
            navigate('/dashboard')
        } catch (error) {
            if (error.response.data.message.type === 'email') {
                setEmailError({state: true, message: error.response.data.message.error})
            }
            if (error.response.data.message.type === 'password') {
                setPasswordError({state: true, message: error.response.data.message.error})
            }
            console.log(error.response)
        }
    }

    return (
        <div className='auth-body'>
            <Paper className='paper-auth-bg' key={1} elevation={12}>
                <div className="login-text">{"Login"}</div>
                <div className="auth-text-field">
                    <TextField value={email} fullWidth label="Email" onChange={(event)=>{
                        setEmail(event.target.value)
                    }} error={emailError.state} helperText={emailError.state && emailError.message}></TextField>
                </div>
                <div className="auth-text-field">
                    <TextField value={password} type='password' fullWidth label="Password" onChange={(event)=>{
                        setPassword(event.target.value)
                    }} error={passwordError.state} helperText={passwordError.state && passwordError.message} ></TextField>
                </div>
                <div >
                    <button className="login-button" onClick={nativeLoginSubmit}>
                        {"Login"}
                    </button>
                </div>
                <Link to="/auth/register">Don't have an account?</Link>

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