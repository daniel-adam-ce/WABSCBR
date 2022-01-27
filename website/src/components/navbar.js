import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { NavLink } from 'react-router-dom'
const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={NavLink} to="/">CAN Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/raw-can">CAN Data</Nav.Link>
            <Nav.Link as={NavLink} to="/trouble-codes">Trouble Codes</Nav.Link>
            <Nav.Link as={NavLink} to="/vehicle-data">Vehicle Data</Nav.Link>
            <Nav.Link as={NavLink} to="/device">Device</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavBar
