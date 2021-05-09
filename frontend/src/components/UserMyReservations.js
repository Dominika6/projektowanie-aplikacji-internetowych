import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {getCurrentUser1} from "./Login";
import axios from "axios";
import {Table} from "@material-ui/core";
import {Button} from "react-bootstrap";
import {formatDate} from "./UserAvailableCars";


export default class UserMyReservations extends Component{

    constructor(props) {
        super(props);
        this.state = {allReservationsList:[], carsDetails: []};
        this.getReservations = this.getReservations.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }

    componentDidMount() {
        this.getReservations();
    }

    user = getCurrentUser1();

    getCarDetails = (carId) => {
        axios.get("http://localhost:8080/api/v1/cars/carSpecifications/" + carId)
            .then(response => response.data)
            .then(data => {
                this.setState({carsDetails : data})
            })
    }

    goToEdit = rentId => {
        window.location = "./modifyRent/" + rentId
    }

    getReservations = datas =>{
        axios.get("http://localhost:8080/api/v1/rents/reservationsList")
            .then(response => response.data)
            .then(data => {
                this.setState({allReservationsList : data});
            });
    }

    deleteReservation = (event, rentId) => {
        let confirmation = window.confirm("Are you sure?");
        if(!confirmation){
            return;
        }
        event.preventDefault();
        axios.delete("http://localhost:8080/api/v1/rents/cancelRent/" + rentId)
            .then(response => {
                if(response.data !== null){
                    alert(response.data)
                }
                window.location.reload()
            })
    }

    render() {
        return(
            <Card className={"bg-dark text-white p-5"}>
                <Card.Header>
                    <h3>Lista Twoich rezerwacji:</h3>
                </Card.Header>
                <Card.Body><br/>
                    <Table bordered hover variant="dark">
                        <thead>
                        <tr>
                            {/*<th> </th>*/}
                            <th>Termin</th>
                            <th>Cena</th>
                            <th>Status</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                        </thead>
                        <br/>
                        <tbody style={{align:"right"}}>
                        {this.state.allReservationsList.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"> Brak rezerwacji.</td>
                            </tr> :
                            this.state.allReservationsList.map((allReservationsList) => (
                                (allReservationsList.userId === this.user.userId) ?
                                    <tr key={allReservationsList.rentId}>
                                        <td>od: <b>{formatDate(allReservationsList.rentFrom)}</b> &nbsp; do: <b>{formatDate(allReservationsList.rentTo)}</b></td>
                                        <td><b>{Math.round(allReservationsList.fullPrice)}</b> zł</td>
                                        <td >{(allReservationsList.confirm ? "Zatwierdzona":"Oczekuje na potwierdzenie")}</td>
                                        <td><Button size="sm" onClick={event => this.goToEdit(allReservationsList.rentId)}>Dane auta</Button></td>
                                        <td><Button size="sm" variant="danger" onClick={event => this.deleteReservation(event, allReservationsList.rentId)}>Usuń</Button></td>
                                    </tr> : ""
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}