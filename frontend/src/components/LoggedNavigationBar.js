import React, {Component} from "react";

import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getIsLoggedAsAdmin, getIsLoggedAsUser, logout} from "./Login";
import logo from "./img/logo2.png"

export default class NavigationBar extends Component{

    render(){
        const isAdmin = getIsLoggedAsAdmin();
        const isUser = getIsLoggedAsUser();

        return(
            <Navbar className="App-header" bg="dark" variant="dark">

                {isUser && <Nav className="mr-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b><Link to={"/"} className="App-link">
                        <img src={logo} alt={"Rent a Car"}/>
                    </Link></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/myAccount"} className="App-link">Moje konto</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/availableCars"} className="App-link">Dostępne samochody</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/myReservations"} className="App-link">Moje rezerwacje</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className="App-button" variant="danger" onClick={() => logout()}>Wyloguj</Button>
                </Nav>}

                {isAdmin && <Nav className="mr-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/"} className="App-link">
                        <img src={logo} alt={"Rent a Car"}/>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/confirm"} className="App-link">Oczekujące rezerwacje</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={"/delete"} className="App-link">Aktualne rezerwacje</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button align="right" variant="danger" onClick={() => logout()}>Wyloguj</Button>
                </Nav>}
            </Navbar>
        );
    }
}