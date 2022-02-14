import React from 'react'
import {useState, useEffect} from 'react'
// import Table from 'react-bootstrap/Table'
import axios from 'axios'
import {useNavigate, useSearchParams } from 'react-router-dom'
// import Pagination from 'react-bootstrap/Pagination'
// import Container from 'react-bootstrap/esm/Container'
import "../styles/raw.css"
import rawImg from '../raw.jpg'

import Spinner from 'react-bootstrap/Spinner'

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


const RawPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    
    // console.log(searchParams.get('p'))
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

    const displayTable = () => {

        const formatDate = (date) => {
            const d = new Date(date)
            return (("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2))
        }

        // return  table.slice(0, table.length-1).map((item) => (
        //     <tr className='table-row' key={item._id}>
        //         <td className='table-row-data'>{formatDate(item.dateReceived)}</td>
        //         <td>{numDisplayHex ? item.arbId.toString(16) : item.arbId}</td>
        //         <td>{numDisplayHex ? item.payload.toString(16) : item.payload}</td>
        //         <td>{item.deviceSerial}</td>
        //         <td>{item.vehicleName}</td>
        //     </tr>
        // ))
        return  table.map((item) => (
            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{formatDate(item.dateReceived)}</TableCell>
                <TableCell>{numDisplayHex ? item.arbId.toString(16) : item.arbId}</TableCell>
                <TableCell>{numDisplayHex ? item.payload.toString(16) : item.payload}</TableCell>
                <TableCell>{item.deviceSerial}</TableCell>
                <TableCell>{item.vehicleName}</TableCell>
            </TableRow>
        ))
    }

    // const displayPages = () => {
    //     let pagesElement = []
    //     for (let i = 0; i < pages; i++){
    //         pagesElement.push (
    //             <Pagination.Item active={pageSelected===i}className='pagination active-a' key={i+1} onClick={()=>{
    //                 setPageSelected(i)
    //                 let v  =  vehicleNameSelected === '' ? 'All Vehicles' : vehicleNameSelected
    //                 let d  =  deviceSerialSelected === '' ? 'All Devices' : deviceSerialSelected
                    
    //                 // setSearchParams({p: i+1, device:d, vehicle:v})
    //                 navigate(`/raw-can?p=${i+1}&device=${d}&vehicle=${v}`)
    //             }}>{i+1}</Pagination.Item>
    //         )
    //     }
    //     return pagesElement
    // }

    const displayVehicleOptions = () => {
        let ids = vehicleArray
        // return ids.map((item)=>(
        //     <option key={item} value={item}>{item}</option>
        // ))
        return ids.map((item)=>(
            <MenuItem key={item} value={item}>{item}</MenuItem>
        ))
    }

    const displayDeviceOptions = () => {
        let ids = deviceArray
        // return ids.map((item)=>(
        //     <option key={item} value={item}>{item}</option>
        // ))
        return ids.map((item)=>(
            <MenuItem key={item} value={item}>{item}</MenuItem>
        ))
    }

    
    useEffect(()=>{
        // console.log('effect', pageSelected)
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
                    await axios.post(`${url}/user/auth`, {tokenId: user.token})
                    let res = await axios.get(`${url}/can/?num=${numPerPage}&sort=-1&vehicleName=${vehicleNameSelected}&deviceSerial=${deviceSerialSelected}&email=${user.profileObj.email}&skip=${numPerPage*(pageSelected-1)}`)
                    setTable(res.data)
                    setLoadState(true)
                    res = await axios.get(`${url}/can/count?deviceSerial=${deviceSerialSelected}&email=${user.profileObj.email}&vehicleName=${vehicleNameSelected}`)
                    setPages(Math.ceil(res.data/numPerPage))
                    res = await axios.get(`${url}/user/vehicles-devices?email=${user.profileObj.email}`)
                    setVehicleArray(res.data[0])
                    setDeviceArray(res.data[1])
                } catch (error) {
                    if (error.response.data.message === "Email is not verified" || error.response.data.message.search(/late/i) > -1) {
                        navigate('/auth')
                    }
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
        <div className="body">
            
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
                <Container fixed>
                    <Paper>
                        <Table size='medium' sx={{ minWidth: 650, border: 0.5 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Date Received</TableCell>
                                <TableCell>Arbitration ID</TableCell>
                                <TableCell>Payload Data</TableCell>
                                <TableCell>Device Serial #</TableCell>
                                <TableCell>Vehicle Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayTable()}
                            </TableBody>
                        </Table>
                    </Paper>

                </Container>
                // <TableContainer sx={{ maxWidth: 800, justifyContent='center' }} component={Paper}>
                
                //</TableContainer>
            //     <Table className='can-table' striped bordered hover variant="dark" size="lg">
                
            //     <thead key={'theader'}>
            //         <tr key = {'headers'}>
            //             <th key={'date'}>Date Received</th>
            //             <th key='arbId'>Arbitration ID</th>
            //             <th key={'payload'}>Payload Data</th>
            //             <th key='deviceSerial'>Device Serial #</th>
            //             <th key='vehicleName'>Vehicle Name</th>
            //         </tr>
            //     </thead>
            //     <tbody key={'tbody'}>
            //         {displayTable()}
            //     </tbody>
                
            // </Table> 
            : <div className='loading'><Spinner animation="border" size='lg'/></div>}

            {/* <Pagination style={{justifyContent: 'center', paddingBottom:'1rem'}}>
                <Pagination.First style={{color: '#212529'}} onClick={()=>{
                    setPageSelected(0)
                }}></Pagination.First>
                <Pagination.Prev onClick={()=>{
                    setPageSelected(pageSelected > 0 ? pageSelected-1 : 0)
                }}></Pagination.Prev>
                {displayPages()}
                <Pagination.Next onClick={()=>{
                    setPageSelected(pageSelected < pages-1 ? pageSelected+1 : pages-1)
                }}></Pagination.Next>
                <Pagination.Last onClick={()=>{
                    setPageSelected(pages-1)
                }}></Pagination.Last>
            </Pagination> */}

            <Stack spacing={2}>
                <Pagination color="primary" className='pagination' count={pages} page={pageSelected} onChange={(event, value) => {
                        setPageSelected(value)
                        let v  =  vehicleNameSelected === '' ? 'All Vehicles' : vehicleNameSelected
                        let d  =  deviceSerialSelected === '' ? 'All Devices' : deviceSerialSelected
                        
                        // setSearchParams({p: i+1, device:d, vehicle:v})
                        navigate(`/raw-can?p=${value}&device=${d}&vehicle=${v}`)
                    }}></Pagination>
            </Stack>
        </div>
        
    )
}

export default RawPage