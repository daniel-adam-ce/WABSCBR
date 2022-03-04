import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../App';
// import Table from 'react-bootstrap/Table'
import axios from 'axios'
import {useNavigate, useSearchParams } from 'react-router-dom'
// import Pagination from 'react-bootstrap/Pagination'
// import Container from 'react-bootstrap/esm/Container'
import "../styles/raw.css"
import rawImg from '../images/raw.jpg'

import Spinner from 'react-bootstrap/Spinner'

import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Pagination from '@mui/material/Pagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const StyledTable = styled(Table)(({ theme }) => ({
    '.css-1ex1afd-MuiTableCell-root': {
        fontSize: '0.7rem',
        padding: '0px',
    },
    '.css-1ygcj2i-MuiTableCell-root' : {
        fontSize: '0.7rem',
        padding: '0px',
    }
}));


const RawPage = () => {
    const [authState, setAuthState] = useContext(AuthContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const [table, setTable] = useState([])
    const [pages, setPages] = useState(1)
    const [pageSelected, setPageSelected] = useState(parseInt(searchParams.get('p')))
    const [loadState, setLoadState] = useState(false)
    const [numDisplayHex, setNumDisplayHex] = useState(false)
    const navigate = useNavigate()
    const numPerPage = 10;
    const [deviceSerialSelected, setDeviceSerialSelected] = useState(searchParams.get('device') === 'All Devices' ? '' : searchParams.get('device') )
    const [vehicleNameSelected, setVehicleNameSelected] = useState(searchParams.get('vehicle') === 'All Vehicles' ? '' : searchParams.get('vehicle'))
    const [deviceArray, setDeviceArray] = useState([])
    const [vehicleArray, setVehicleArray] = useState([])
    const url = 'https://can-connect-server.herokuapp.com'
    // const url = 'http://localhost:5000'

    const displayTable = () => {

        const formatDate = (date) => {
            const d = new Date(date)
            return (("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2))
        }
        return  table.map((item) => (
            <tr key={item._id}>
                <td>{formatDate(item.dateReceived)}</td>
                <td>{numDisplayHex ? item.arbId.toString(16) : item.arbId}</td>
                <td>{numDisplayHex ? item.payload.toString(16) : item.payload}</td>
                <td>{item.deviceSerial}</td>
                <td>{item.vehicleName}</td>
            </tr>
        ))
    }

    const displayVehicleOptions = () => {
        let ids = vehicleArray
        return ids.map((item)=>(
            <MenuItem key={item} value={item}>{item}</MenuItem>
        ))
    }

    const displayDeviceOptions = () => {
        let ids = deviceArray
        return ids.map((item)=>(
            <MenuItem key={item} value={item}>{item}</MenuItem>
        ))
    }

    
    useEffect(()=>{
        if (pageSelected !== searchParams.get('p')-1 ) {
            setPageSelected(parseInt(searchParams.get('p')))
        }
        setVehicleNameSelected(searchParams.get('vehicle') === 'All Vehicles' ? '' : searchParams.get('vehicle'))
        setDeviceSerialSelected(searchParams.get('device') === 'All Devices' ? '' : searchParams.get('device'))
        const user = JSON.parse(localStorage.getItem('user'))
        const source = axios.CancelToken.source()
        if (user === null) {
            console.log('user is null')
            navigate('/auth')
        } else {
            const retrieveData = async () => {
        
                const user = JSON.parse(localStorage.getItem('user'))
                try {
                    let res = await axios.get(`${url}/can/?num=${numPerPage}&sort=-1&vehicleName=${vehicleNameSelected}&deviceSerial=${deviceSerialSelected}&skip=${numPerPage*(pageSelected-1)}`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    setTable(res.data)
                    setLoadState(true)
                    res = await axios.get(`${url}/can/count?deviceSerial=${deviceSerialSelected}&vehicleName=${vehicleNameSelected}`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    setPages(Math.ceil(res.data/numPerPage))
                    res = await axios.get(`${url}/user/vehicles-devices`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    setVehicleArray(res.data[0])
                    setDeviceArray(res.data[1])
                } catch (error) {
                    // if (error.response.data.message === "Email is not verified" || error.response.data.message.search(/late/i) > -1) {
                    // need to finish error checking here
                    navigate('/auth')
                    setAuthState(false)
                    // }
                    console.log(error.response)
                }
            }
            retrieveData()
            setLoadState(false)
        }
        return () => {
            source.cancel()
        }
    }, [vehicleNameSelected, deviceSerialSelected, pageSelected, navigate, searchParams])

    return (
        <div className="raw-body">
            
            <FormControl>
                <FormControlLabel className='hex-button' control={<Checkbox onChange={()=>{
                    setNumDisplayHex(!(numDisplayHex))
                }}/>} label="Display as Hex" />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="device-dropdown-label">Device</InputLabel>
            <Select
                className="dropdown"
                labelId="device-dropdown-label"
                id="device-dropdown"
                value={deviceSerialSelected}
                label="Device"
                onChange={(event)=>{
                    setDeviceSerialSelected(event.target.value === "All Devices" ? '' : event.target.value)
                    navigate(`/raw-can?p=${1}&device=${event.target.value}&vehicle=${vehicleNameSelected}`)
                }}
            >
                <MenuItem value={'All Devices'}>All Devices</MenuItem>
                {displayDeviceOptions()}
            </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="vehicle-dropdown-label">Vehicle Name</InputLabel>
            <Select
                className="dropdown"
                labelId="vehicle-dropdown-label"
                id="vehicle-dropdown"
                value={vehicleNameSelected}
                label="Vehicle Name"
                onChange={(event)=>{
                    setVehicleNameSelected(event.target.value === "All Vehicles" ? '' : event.target.value)
                    navigate(`/raw-can?p=${1}&device=${deviceSerialSelected}&vehicle=${event.target.value}`)
                }}
            >
                <MenuItem value={'All Vehicles'}>All Vehicles</MenuItem>
                {displayVehicleOptions()}
            </Select>
            </FormControl>
            
            {loadState ? 
                <Container className="table-container" fixed>
                    <Paper elevation={8}>
                        <table className='raw-can-table'>
                            <tr>
                                <th>Date Received</th>
                                <th>Arbitration ID</th>
                                <th>Payload Data</th>
                                <th>Device Serial #</th>
                                <th>Vehicle Name</th>
                            </tr>
                            {displayTable()}
                        </table>
                    </Paper>

                </Container>
            : <div className='loading'><Spinner animation="border" size='lg'/></div>}
            
            <Stack spacing={2}>
                <Pagination color="primary" className='pagination' count={pages} page={pageSelected} onChange={(event, value) => {
                        setPageSelected(value)
                        let v  =  vehicleNameSelected === '' ? 'All Vehicles' : vehicleNameSelected
                        let d  =  deviceSerialSelected === '' ? 'All Devices' : deviceSerialSelected
                        navigate(`/raw-can?p=${value}&device=${d}&vehicle=${v}`)
                    }}></Pagination>
            </Stack>
        </div>
        
    )
}

export default RawPage