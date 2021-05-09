import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import {getCurrentUser1} from "./Login";

export default class UserAccount extends Component{
    _isMounted = false;
    user = getCurrentUser1();

    constructor(props) {
        super(props);
        this.state = { users:[] };
    }

    componentDidMount() {
        this._isMounted = true;
        const user = getCurrentUser1();
        if (!user) {
            alert('niezalogowany');
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header ><h3>
                    <FontAwesomeIcon icon={faAddressBook}/> &nbsp; Twoje dane </h3>
                </Card.Header>

                <Card.Body>
                    <div>
                        <ul key={this.user.id}>
                            <li>Imię:
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.user.username}</li>
                            <li>Nazwisko: &nbsp;&nbsp;&nbsp;&nbsp;{this.user.surname}</li>
                            <li>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.user.email}</li>
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        );
    };
}