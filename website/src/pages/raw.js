import React from 'react'
import {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

const RawPage = () => {
    const [table, setTable] = useState([])
    const [loadState, setLoadState] = useState(false)
    const [numDisplayHex, setNumDisplayHex] = useState(false)
    const navigate = useNavigate()
    // temp for now until auth is configured
    const deviceSerial = 123
    
    const displayTable = () => {

        const formatDate = (date) => {
            const d = new Date(date)
            return (("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2))
        }

        return table.map((item) => (
            
            <tr key={item._id}>
                <td>{formatDate(item.dateReceived)}</td>
                <td>{numDisplayHex ? item.arbId.toString(16) : item.arbId}</td>
                <td>{numDisplayHex ? item.payload.toString(16) : item.payload}</td>
            </tr>
        ))
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user)
        if (user == null) {
            console.log('user is null')
            navigate('/auth')
        } else {
            axios.post('http://localhost:5000/user/auth', {tokenId: user.token}).then((res)=>{
                // console.log(res)
                axios.get(`http://localhost:5000/can/?num=15&sort=-1&deviceSerial=${deviceSerial}`).then((res)=>{
                    setTable(res.data)
                    setLoadState(true)
                }).catch((res)=>{
                    console.log(res)
            })
            }).catch((res)=>{
                navigate('/auth')
                console.log(res)
            })
        }
        
        
    }, [])

    return (
        <div style={{paddingTop:'1rem'}}>
            <label>
                Display as Hex <input 
                type="checkbox"
                onChange={()=>{setNumDisplayHex(!(numDisplayHex))}}
                />
            </label>
            
            {loadState ? <Table striped bordered hover variant="dark">
                
                <thead key={'theader'}>
                    <tr key = {'headers'}>
                        <th key={'date'}>Date Received</th>
                        <th key='arbId'>Arbitration ID</th>
                        <th key={'payload'}>Payload Data</th>
                    </tr>
                </thead>
                <tbody key={'tbody'}>
                    {displayTable()}
                </tbody>
                
            </Table> : <div>Loading...</div>}
        </div>
        
    )
}

export default RawPage