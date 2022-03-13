import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../App';
import { Navigate, useNavigate, } from 'react-router-dom'
import { Container } from '@mui/material';


import '../styles/config.css'
import { textAlign } from '@mui/system';
const ConfigPage = () => {

    const [tables, setTable] = useState({devices: [], vehicles: []})
    const [newItem, setNewItem] = useState('')
    const [itemType, setItemType] = useState('vehicles')
    const url = 'https://can-connect-server.herokuapp.com'

    const navigate = useNavigate()
    const displayTable = (key) => {
        return tables[key].map((item, index)=> {
            return (
                <tr key={item}>
                    <td>{index+1}</td>
                    <td>{item} </td>
                    <td style={{textAlign:'right'}}><button className='row-button remove-button'>-</button></td>
                </tr>
            )
        })
    }

    const addNewItem = async () => {
        try {
            
        } catch (error) {
            
        }
    }
    const retrieveData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user === null) {
                console.log('user is null')
                navigate('/auth')
            } else {
                const res = await axios.get(`${url}/user/vehicles-devices`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                setTable({devices: res.data[0], vehicles: res.data[1]})
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(()=> {
        
        retrieveData()
        
    }, [])


    // this is WIP, very dirty
    return (
        <div className="raw-body">
            <div style={{margin: '0 auto', width: '50%', textAlign:'center'}}> 
            <Container fixed>
                <FormControl>
                    
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={'vehicles'}
                        onChange={(event)=>{
                            setItemType(event.target.value)
                        }}
                    >
                        <FormControlLabel value="vehicles" control={<Radio />} label="Vehicle" />
                        <FormControlLabel value="devices" control={<Radio />} label="Device" />
                    </RadioGroup>
                </FormControl>
                <Paper elevation={8}>
                    <table className='raw-can-table' style={{fontSize: 'calc(4px + 2vmin)',}}>
                        <tbody>
                            <tr style={{textAlign:"left"}}>
                                <th>#</th>
                                <th>{itemType === 'vehicles' ? 'Vehicle Name' : 'Device Serial #'}</th>
                            </tr>
                            {displayTable(itemType)}
                            <tr>
                                <td>New</td>
                                <td><input type='text' style={{width:"110%"}}></input></td>
                                <td style={{textAlign:'right'}}><button className='row-button add-button'>+</button></td>
                            </tr>
                            </tbody>
                        </table>
                </Paper>
            </Container>
            </div>
            
            
        </div>
    )
}

export default ConfigPage