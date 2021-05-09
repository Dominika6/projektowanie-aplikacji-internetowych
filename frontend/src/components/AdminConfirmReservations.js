import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {Table} from "@material-ui/core";
import axios from "axios";
import {Button} from "react-bootstrap";
import {formatDate} from "./UserAvailableCars";


export default class AdminConfirmReservations extends Component{

    constructor(props) {
        super(props);
        this.getUnconfirmedRents = this.getUnconfirmedRents.bind(this);
        this.getAvailableCarList = this.getAvailableCarList.bind(this);
        this.state={unconfirmedRentsList:undefined, carList:undefined, userList:undefined, outputList:undefined}
    }

    componentDidMount() {
        this.getUnconfirmedRents();
        this.getAvailableCarList();
        this.getUsersList();
    }

    makeOutputList = (rentsList, carList, userList) => {
        let outputList = rentsList;
        if(rentsList !== undefined && carList !== undefined && userList !== undefined) {
            for (let p = 0; p < outputList.length; p++) {
                for (let h = 0; h < carList.length; h++) {
                    if (carList[h].carId === outputList[p].carId) {
                        outputList[p]["carName"] = carList[h].carName;
                    }
                }
            }
            for (let g = 0; g < outputList.length; g++) {
                for (let a = 0; a < userList.length; a++) {
                    if (userList[a].userId === outputList[g].userId) {
                        outputList[g]["email"] = userList[a].email;
                    }
                }
            }
        }
        return outputList
    }

    getUnconfirmedRents(){
        axios.get("http://localhost:8080/api/v1/rents/getUnconfirmedRentsList")
            .then(response => {
                if(response.data.length !== 0) {
                    this.setState({unconfirmedRentsList: response.data})
                }
            })
    }

    getAvailableCarList = datas => {
        axios.get("http://localhost:8080/api/v1/cars/getAvailableCarList")
            .then(response => response.data)
            .then((data) => {
                this.setState({carList : data});
            });
    }

    getUsersList = datas => {
        axios.get("http://localhost:8080/api/v1/users/getUsersList")
            .then(response => response.data)
            .then((data) => {
                this.setState({userList : data});
            });
    }

    confirm =(rentId) => {
        if(rentId === undefined){return}
        axios.post("http://localhost:8080/api/v1/rents/confirmRent/" + rentId)
            .then(response => {
                window.location.reload()
            })
    }

    deleteRent =(rentId) => {
        if(rentId === undefined){return}
        let confirmation = window.confirm("Are you sure?");
        if(!confirmation){
            return;
        }
        axios.delete("http://localhost:8080/api/v1/rents/cancelRent/" + rentId)
            .then(response => {
                window.location.reload()
            })
    }

    render() {
        return(
            <Card className={"bg-dark text-white p-5"}>
                <Card.Header>
                    <h3>Lista zapytań od klientów:</h3>
                </Card.Header>
                <Card.Body><br/>
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID usera</th>
                                <th>Email</th>
                                <th>ID auta</th>
                                <th>Nazwa</th>
                                <th>Termin</th>
                                <th>Cena</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                        {(this.state.outputList === undefined) &&
                        !(this.state.unconfirmedRentsList === undefined) &&
                        !(this.state.carList === undefined) &&
                        !(this.state.userList === undefined) ? this.setState({outputList : this.makeOutputList(this.state.unconfirmedRentsList, this.state.carList, this.state.userList)}) : ""}

                        {!(this.state.outputList === undefined) &&
                            !(this.state.unconfirmedRentsList === undefined) &&
                            !(this.state.carList === undefined) &&
                            !(this.state.userList === undefined) ?

                            this.state.outputList.map((outputList) => (
                                <tr>
                                    <td>{outputList.userId}</td>
                                    <td>{outputList.email}</td>
                                    <td>{outputList.carId}</td>
                                    <td>{outputList.carName}</td>
                                    <td>od: <b>{formatDate(outputList.rentFrom)}</b> &nbsp; do: <b>{formatDate(outputList.rentTo)}</b></td>
                                    <td><b>{Math.round(outputList.fullPrice)}</b> zł</td>
                                    <td><Button size="sm" variant="success" onClick={event => this.confirm(outputList.rentId)}>Potwierdź rezerwację</Button></td>
                                    <td><Button size="sm" variant="danger" onClick={event => this.deleteRent(outputList.rentId)}>Usuń rezerwację</Button></td>
                                </tr>
                            ))
                             :
                            <tr align="center">
                                <td colSpan="6"> <br/>Wszystko aktualne. </td>
                            </tr> }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}