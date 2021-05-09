import React, {Component} from "react";
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default class Registration extends Component{

    constructor(props) {
        super(props);
        this.state = { changeEmail:[], selectedOption:"" };
        this.emailChange = this.emailChange.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
    }

    initialState = {
        email:'', username:'', surname:'', password:'', role:''
    }

    submitEmail = event => {
        event.preventDefault()
        const datass = {
            username: this.state.username,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password,
            role: "SuperUser"
        }
        axios.post("http://localhost:8080/api/v1/users/registration", datass)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    emailChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    render(){
        const {email, username, surname, password} = this.state;
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onSubmit={this.submitEmail} id="emailFormId">
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare}/> &nbsp; Rejestracja
                    </Card.Header>
                    <br/>
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Imię:</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="username" onChange={this.emailChange}
                                          value={username}
                                          className="bg-dark text-white"
                                          placeholder="imię" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Nazwisko:</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="surname" onChange={this.emailChange}
                                          value={surname}
                                          className="bg-dark text-white"
                                          placeholder="nazwisko " />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Adres email:</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="email" onChange={this.emailChange}
                                          value={email}
                                          className="bg-dark text-white"
                                          placeholder="adres email"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPasswword">
                            <Form.Label>Hasło: </Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="password" onChange={this.emailChange}
                                          value={password} type={"password"}
                                          className="bg-dark text-white"
                                          placeholder="hasło" />
                        </Form.Group>
                    </Card.Body>
                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} />&nbsp; Zarejestruj
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}