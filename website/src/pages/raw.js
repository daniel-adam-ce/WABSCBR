import React from 'react'
import {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import Container from 'react-bootstrap/esm/Container'
import "../styles/raw.css"
import rawImg from '../raw.jpg'

const RawPage = () => {
    const [table, setTable] = useState([])
    const [pages, setPages] = useState(1)
    const [pageSelected, setPageSelected] = useState(0)
    const [loadState, setLoadState] = useState(false)
    const [numDisplayHex, setNumDisplayHex] = useState(false)
    const navigate = useNavigate()
    const numPerPage = 18;
    const [deviceSerialSelected, setDeviceSerialSelected] = useState('')
    const [vehicleNameSelected, setVehicleNameSelected] = useState('')
    const [deviceArray, setDeviceArray] = useState([])
    const [vehicleArray, setVehicleArray] = useState([])
    const url = 'http://localhost:5000'
    const displayTable = () => {

        const formatDate = (date) => {
            const d = new Date(date)
            return (("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2))
        }

        return  table.slice(0, table.length-1).map((item) => (
            <tr className='table-row' key={item._id}>
                <td className='table-row-data'>{formatDate(item.dateReceived)}</td>
                <td>{numDisplayHex ? item.arbId.toString(16) : item.arbId}</td>
                <td>{numDisplayHex ? item.payload.toString(16) : item.payload}</td>
                <td>{item.deviceSerial}</td>
                <td>{item.vehicleName}</td>
            </tr>
        ))
    }

    const displayPages = () => {
        let pagesElement = []
        for (let i = 0; i < pages; i++){
            pagesElement.push (
                <Pagination.Item active={pageSelected===i}className='pagination active-a' key={i+1} onClick={()=>{setPageSelected(i)}}>{i+1}</Pagination.Item>
            )
        }
        return pagesElement
    }

    const displayVehicleOptions = () => {
        let ids = vehicleArray
        return ids.map((item)=>(
            <option key={item} value={item}>{item}</option>
        ))
    }

    const displayDeviceOptions = () => {
        let ids = deviceArray
        return ids.map((item)=>(
            <option key={item} value={item}>{item}</option>
        ))
    }

    
    useEffect(()=>{
        setLoadState(false)
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
                    let res = await axios.get(`${url}/can/?num=${numPerPage}&sort=-1&vehicleName=${vehicleNameSelected}&deviceSerial=${deviceSerialSelected}&email=${user.profileObj.email}&skip=${numPerPage*pageSelected}`)
                    setTable(res.data)
                    setLoadState(true)
                    res = await axios.get(`${url}/can/count?deviceSerial=${deviceSerialSelected}&email=${user.profileObj.email}`)
                    setPages(Math.ceil(res.data/numPerPage))
                    res = await axios.get(`${url}/user/vehicles-devices?email=${user.profileObj.email}`)
                    setVehicleArray(res.data[0])
                    setDeviceArray(res.data[1])
                } catch (error) {
                    if (error.response.data.message === "Email is not verified") {
                        navigate('/auth')
                    }
                    // console.log(error)
                }
            }
            retrieveData()
        }
        return () => {
            source.cancel()
        }
    }, [vehicleNameSelected, deviceSerialSelected, pageSelected, navigate])

    return (
        <div className="body">
            <figure className="position-relative">
                <img src={rawImg} alt="phone" width="100%"></img>
            </figure>
            <figcaption className="figcaption">
            <label key='num-display' className='hex-button'>
                Display as Hex <input 
                type="checkbox"
                onChange={()=>{setNumDisplayHex(!(numDisplayHex))}}
                />
            </label>

            <select
                key='device-dropdown'
                id="tag-deviceSerial"
                className='dropdown device-dropdown'
                onChange={(event)=>{
                    setDeviceSerialSelected(event.target.value)
                }}
            >
                <option key="default" value="">All Devices</option>
                {displayDeviceOptions()}
            </select>

            <select
                key='vehicle-dropdown'
                id="tag-vehicle"
                className='dropdown vehicle-dropdown'
                onChange={(event)=>{
                    setVehicleNameSelected(event.target.value)
                }}
            >
                <option key="default" value="">All Vehicles</option>
                {displayVehicleOptions()}
            </select>
            
            {loadState ? <Container>
                <Table className='can-table' striped bordered hover variant="dark" size="lg">
                
                <thead key={'theader'}>
                    <tr key = {'headers'}>
                        <th key={'date'}>Date Received</th>
                        <th key='arbId'>Arbitration ID</th>
                        <th key={'payload'}>Payload Data</th>
                        <th key='deviceSerial'>Device Serial #</th>
                        <th key='vehicleName'>Vehicle Name</th>
                    </tr>
                </thead>
                <tbody key={'tbody'}>
                    {displayTable()}
                </tbody>
                
            </Table>
            </Container> : <div className='loading'>Loading...</div>}

            <Pagination style={{justifyContent: 'center', paddingBottom:'1rem'}}>
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
            </Pagination>
            </figcaption>
        </div>
        
    )
}

export default RawPage