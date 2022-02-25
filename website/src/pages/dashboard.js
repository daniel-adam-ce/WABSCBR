import React from 'react'
import { useNavigate, } from 'react-router-dom'
const DashboardPage = () => {
    const navigate = useNavigate()

    return (
        <div style={{marginTop:'10%'}}>
            dashboard
            <div> 
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
            </div>
        </div>
        
    )
}

export default DashboardPage

