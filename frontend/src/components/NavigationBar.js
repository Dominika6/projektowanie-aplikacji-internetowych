import React, {Component} from "react";

import { Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from "./img/logo2.png"

export default class NavigationBar extends Component{

    render(){
        return(
            <Navbar className="App-header" bg="dark" variant="dark">
                <Nav className="mr-auto">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={""} className="App-link">
                        <img src={logo} alt={"Rent a Car"}/>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/login"} className="App-link">Logowanie</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/registration"} className="App-link">Rejestracja</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Nav>
            </Navbar>
        );
    }
}