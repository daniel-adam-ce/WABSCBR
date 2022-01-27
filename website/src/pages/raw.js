import React from 'react'
import {useState} from 'react'
import Table from 'react-bootstrap/Table'

const RawPage = () => {
    const [table, setTable] = useState([])
    const displayTable = () => {
        return table.map((item, index) => (
            <tr key={index}>
                <td>{item.dateReceived}</td>
                <td>{item.arbId}</td>
                <td>{item.payload}</td>
            </tr>
        ))
    }
    return (
        <div style={{paddingTop:'1rem'}}>
            <Table striped bordered hover variant="dark">
                
                <thead>
                    <tr>
                        <th>Date Received</th>
                        <th>Arbitration ID</th>
                        <th>Payload Data</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTable()}
                </tbody>
                
            </Table>
        </div>
        
    )
}

export default RawPage