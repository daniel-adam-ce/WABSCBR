import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../App';

const NavBar = () => {
    const [authState, setAuthState] = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={NavLink} to="/">CAN Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/raw-can?p=1&device=All Devices&vehicle=All Vehicles">CAN Data</Nav.Link>
                <Nav.Link as={NavLink} to="/trouble-codes">Trouble Codes</Nav.Link>
                <Nav.Link as={NavLink} to="/vehicle-data">Vehicle Data</Nav.Link>
                <Nav.Link as={NavLink} to="/device">Device</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={NavLink} to="/auth">{authState ? "Logout" : "Login"}</Nav.Link>
                {authState && <Navbar.Brand>
                <img
                    src={user.profileObj.imageUrl}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="profile"
                    style={{borderRadius: '10rem'}}
                />
                </Navbar.Brand>}
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavBar
