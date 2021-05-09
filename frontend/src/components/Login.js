import React, {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";


export function getCurrentUser() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    const savedUser = JSON.parse(savedUserJson);

    if (!savedUser) {
        return null;
    }
    return savedUser;
}

export function getCurrentUserId() {
    const user = getCurrentUser();
    if (!user) {
        return null;
    }
    return user.id;
}

export function getCurrentUser1() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    return JSON.parse(savedUserJson);
}

export function getIsLoggedIn() {
    return !!getCurrentUser();
}

export function getIsLoggedAsAdmin() {
    const user = getCurrentUser();
    return !!user && user.role === 'Admin';
}

export function getIsLoggedAsUser() {
    const user = getCurrentUser();
    return !!user && user.role === 'SuperUser';
}

export function logout() {
    window.localStorage.removeItem('currentUser');
    window.location.href = '/';
}

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = { email:'', password:'', userid:'', changeEmail:[]};
        this.changeId = this.changeId.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.login = this.login.bind(this);
    }

    changeId = userid => {
        this.setState({userid: userid})
    }

    changeEmail = email => {
        this.setState({email: email})
    }

    changePassword = password => {
        this.setState({password: password})
    }

    login = event => {
        event.preventDefault()
        console.log(this.state.email, this.state.password)
        const datass = {
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://localhost:8080/api/v1/users/login/", datass)
            .then(response => {
                console.log("resp: ",response)
                if(response.data === null){
                    alert("Nieprawidłowe dane")
                }
                if(response.data !== null) {
                    console.log("response: ", response)
                    window.localStorage.setItem('currentUser', JSON.stringify(response.data));
                    console.log('Zalogowano!', response)
                    console.log('is user', getIsLoggedAsUser())
                    console.log('is admin', getIsLoggedAsAdmin())
                    window.location.reload()
                }
            });
    }

    emailChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        console.log('is logged?',getIsLoggedIn())
        return(
            <Card className={"card border border-dark bg-dark text-white"} style={{"align":"center"}}>
                <Form onSubmit={this.login} id="loginFormId">
                    <Card.Header style={{"textAlign":"left"}}>
                        <FontAwesomeIcon icon={faLock} /> &nbsp; Logowanie
                    </Card.Header>
                    <br/>
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridNewEmail">
                            <Form.Label>Adres email: </Form.Label>
                            <Form.Control required autoComplete="off" type="email"
                                          name="email" onChange={this.emailChange}
                                          value={this.state.email}
                                          className="bg-dark text-white"
                                          placeholder="Adres email" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNewPassword">
                            <Form.Label>Hasło: </Form.Label>
                            <Form.Control required autoComplete="off" type="password"
                                          name="password" onChange={this.emailChange}
                                          value={this.state.password}
                                          className="bg-dark text-white"
                                          placeholder="Hasło" />
                        </Form.Group>
                    </Card.Body>
                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            &nbsp;Zaloguj
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}