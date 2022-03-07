import React from 'react'
import {useEffect, useContext, useState} from 'react'
import { AuthContext } from '../App'
import axios from 'axios'
import { useNavigate, } from 'react-router-dom'
const DashboardPage = () => {
    const [authState, setAuthState] = useContext(AuthContext)
    const [loadState, setLoadState] = useState(false)
    const navigate = useNavigate()
    const url = 'https://can-connect-server.herokuapp.com'
    useEffect(()=>{ 
        setLoadState(true)
        const user = JSON.parse(localStorage.getItem('user'))
        const source = axios.CancelToken.source()
        if (user === null) {
            console.log('user is null')
            setAuthState(false)
            navigate('/auth')
        } else {
            console.log(user.token)
            axios.post(`${url}/user/auth`, {}, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res)=>{
                console.log(res.data)
                setAuthState(true)
                setLoadState(false)
            }).catch((res)=>{
                console.log(res.response)
                setAuthState(false)
                navigate('/auth')
            })
        }
        return () => {
            source.cancel()
        }

    }, [navigate, setAuthState])

    return (
        <div style={{marginTop:'10%'}}>
            dashboard
            {!loadState && <div> 
                <button onClick={()=>{
                    navigate('/raw-can?p=1&device=All Devices&vehicle=All Vehicles')
                }}>
                raw can data
                </button>
                <button onClick={()=>{
                    navigate('/vehicle-data')
                }}>
                vehicle codes
                </button>
                <button onClick={()=>{
                    navigate('/trouble-codes')
                }}>
                trouble codes
                </button>
                <button onClick={()=>{
                    navigate('/device')
                }}>
                Configure Vehicles and Devices
                </button>
            </div>}
        </div>
        
    )
}

export default DashboardPage

