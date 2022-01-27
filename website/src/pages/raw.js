import React from 'react'
import {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

const RawPage = () => {
    const [table, setTable] = useState([])
    const [loadState, setLoadState] = useState(false)
    const [numDisplayHex, setNumDisplayHex] = useState(false)

    const displayTable = () => {
        return table.map((item) => (
            
            <tr key={item._id}>
                <td>{item.dateReceived}</td>
                <td>{numDisplayHex ? item.arbId.toString(16) : item.arbId}</td>
                <td>{numDisplayHex ? item.payload.toString(16) : item.payload}</td>
            </tr>
        ))
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/can/?num=10&sort=1').then((res)=>{
            setTable(res.data)
            setLoadState(true)
        }).catch((res)=>{
            console.log(res.error)
        })
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