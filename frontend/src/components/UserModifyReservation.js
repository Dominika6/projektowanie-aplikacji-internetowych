import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {Table} from "@material-ui/core";
import {Button} from "react-bootstrap";
import axios from "axios";
import {formatDate} from "./UserAvailableCars";
import placeh from "./img/01_mini_white.png"

export default class UserModifyReservation extends Component{

    constructor(props) {
        super(props);
        this.findOneRent = this.findOneRent.bind(this);
        this.findOneCar = this.findOneCar.bind(this);
        this.findRentId = this.findRentId.bind(this);
        this.goToMyRents = this.goToMyRents.bind(this);
        this.state = {rentId:undefined, carId:undefined, table:undefined, rentDetails:undefined, carDetails:undefined}
    }

    componentDidMount() {
        this.findRentId()
    }

    goToMyRents() {
        window.location = "http://localhost:3000/myReservations"
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
                this.goToMyRents()
            })
    }

    findRentId(){
        let param_array = window.location.href.split('/');
        const rentId = param_array[param_array.length-1]
        this.setState({rentId: rentId});
        this.findOneRent(rentId);
    };

    findOneRent = (rentId) => {
        axios.get("http://localhost:8080/api/v1/rents/findRent/" + rentId)
            .then(response =>{
                this.setState({rentDetails : response.data})
                let carId = response.data.carId
                this.setState({carId:carId})
                this.findOneCar(carId)
            })
    }

    findOneCar =(carId) => {
        axios.get("http://localhost:8080/api/v1/cars/carSpecifications/" + carId)
            .then(response => {
                this.setState({carDetails: response.data})
                this.splitSpecifications(response.data.specifications)
            })
    }

    splitSpecifications = (specifications) => {
        let table =[];
        table = specifications.split(",")
        this.setState({table:table})
        return table;
    }

    render() {
        return(
            <Card>
                <Card.Header>
                    <h3>Termin rezerwacji: <b>{this.state.rentDetails === undefined ? "" : (formatDate(this.state.rentDetails.rentFrom) + " - " + formatDate(this.state.rentDetails.rentTo))}</b>
                </h3></Card.Header>
                <br/>
                <Card.Body>
                    <Table bordered hover variant="dark">
                        <thead>
                        <br/>
                        <tr>
                            <th>{this.state.carDetails === undefined ? "" : (this.state.carDetails.carName)}</th>
                            <th>Specyfikacja</th>
                            <th>Cena</th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                            <td><img src={placeh} alt={"  "}/></td>
                            <td>{this.state.table === undefined ? "brak" : (
                                <ul>
                                    {this.state.table.map((item, index)=>{
                                        return <li key={index}>{item}</li>
                                    })}
                                </ul>
                            )}</td>
                            <td>{this.state.carDetails === undefined ? "" : Math.round(this.state.carDetails.price)} zł</td>
                            <td>
                                <Button size="sm" variant="danger" onClick={event => this.deleteReservation(event, this.state.rentId)}>Usuń</Button>
                            </td>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}