import React from 'react'
import {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import Container from 'react-bootstrap/esm/Container'
import "../styles/raw.css"

const RawPage = () => {
    const [table, setTable] = useState([])
    // const [displayTable, setDisplayTable] = useState
    const [pages, setPages] = useState(1)
    const [pageSelected, setPageSelected] = useState(0)
    const [loadState, setLoadState] = useState(false)
    const [numDisplayHex, setNumDisplayHex] = useState(false)
    const navigate = useNavigate()
    const numPerPage = 18;
    const [deviceSerial, setDeviceSerial] = useState('')
    
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
            </tr>
        ))
    }

    const displayPages = () => {
        let pagesElement = []
        for (let i = 0; i < pages; i++){
            pagesElement.push (
                <Pagination.Item active={pageSelected===i+341234}className='pagination active-a' key={i+1} onClick={()=>{setPageSelected(i)}}>{i+1}</Pagination.Item>
            )
        }
        return pagesElement
    }

    const displayOptions = () => {
        let ids = []
        if (table.length > 0) {
            ids = table[table.length-1].devices
            return ids.map((item)=>(
                <option key={item} value={item}>{item}</option>
            ))
        }
    }


    useEffect(()=>{
        setLoadState(false)
        const user = JSON.parse(localStorage.getItem('user'))
        const source = axios.CancelToken.source()
        if (user === null) {
            console.log('user is null')
            navigate('/auth')
        } else {
            axios.post('http://localhost:5000/user/auth', {tokenId: user.token}).then((res)=>{
                axios.get(`http://localhost:5000/can/?num=${numPerPage}&sort=-1&deviceSerial=${deviceSerial}&email=${user.profileObj.email}&devices=all&skip=${numPerPage*pageSelected}`).then((res)=>{
                    setTable(res.data)
                    setLoadState(true)
                    axios.get(`http://localhost:5000/can/count?deviceSerial=${deviceSerial}&email=${user.profileObj.email}`).then((res)=>{
                        setPages(Math.ceil(res.data/numPerPage))
                    })
                }).catch((res)=>{
                    console.log(res)
                })
            }).catch((res)=>{
                navigate('/auth')
                console.log(res)
            })
        }
        
        return () => {
            source.cancel()
        }
    }, [deviceSerial, pageSelected, navigate])

    return (
        <div className="body">
            <label key='num-display' className='hex-button'>
                Display as Hex <input 
                type="checkbox"
                onChange={()=>{setNumDisplayHex(!(numDisplayHex))}}
                />
            </label>

            <select
                key='device-dropdown'
                id="tag_deviceSerial"
                className='device-dropdown'
                onChange={(event)=>{
                    setDeviceSerial(event.target.value)
                }}
            >
                <option key="default" value="">All Devices</option>
                {displayOptions()}
            </select>
            
            {loadState ? <Container>
                <Table className='can-table' striped bordered hover variant="dark">
                
                <thead key={'theader'}>
                    <tr key = {'headers'}>
                        <th key={'date'}>Date Received</th>
                        <th key='arbId'>Arbitration ID</th>
                        <th key={'payload'}>Payload Data</th>
                        <th key='deviceSerial'>Device Serial #</th>
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
        </div>
        
    )
}

export default RawPage