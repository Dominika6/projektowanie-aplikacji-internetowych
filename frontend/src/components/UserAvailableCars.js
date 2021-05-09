import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {Button, Form} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import DayPicker, { DateUtils } from 'react-day-picker';
import Helmet from 'react-helmet';
import 'react-day-picker/lib/style.css';
import axios from "axios";
import {Link, Table} from "@material-ui/core";
import {getCurrentUser1} from "./Login";
import img1 from "./img/01_mini_white.png"
import img2 from "./img/02_economy_coolgrey.png"
import img3 from "./img/03_standard_black.png"
import img4 from "./img/05_suv-small_white.png"
import img5 from "./img/10_station-wagon_blue.png"
import img6 from "./img/14_commercial_white.png"


export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default class UserAvailableCars extends Component{

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleAvailableCarClick = this.handleAvailableCarClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.chooseCar = this.chooseCar.bind(this);
        this.splitSpecifications = this.splitSpecifications.bind(this);
        this.getAvailableCarList = this.getAvailableCarList.bind(this);
        this.state = {collisionList:[], cars:[]}
        this.state = {from: undefined, to: undefined, table:undefined, cardAvailableCars: undefined, cars:[], collisionList:[], carsToShow: []};
    }

    static defaultProps = {
        numberOfMonths: 2,
    };

    user = getCurrentUser1();

    getRandomImg(){
        const imgs = [img1, img2, img3, img4, img5, img6];
        const random = Math.floor(Math.random() * imgs.length)
        return imgs[random]
    }

    getInitialState() {
        return {
            from: undefined,
            to: undefined,
            carsToShow: [],
        };
    }

    splitSpecifications = (specifications) => {
        let table =[];
        table = specifications.split(",")
        return table;
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick() {
        this.setState(this.getInitialState());
    }

    handleAvailableCarClick(){
        this.setState(this.cardAvailableCars)
    }


    componentDidMount() {
        this.getAvailableCarList();
    }

    removeConflicting = (allCars, busyCars) => {
        const availableCars = []
        for(let l = 0; l < allCars.length; l++){
            availableCars.push(allCars[l])
        }

        for(let i = 0; i < availableCars.length; i++){
            for(let j = 0; j < busyCars.length; j++)
                if(busyCars[j].carId === availableCars[i].carId){
                    availableCars.splice(i, 1);
            }
        }
        return availableCars;
    }

    getAvailableCarList = datas => {
        axios.get("http://localhost:8080/api/v1/cars/getAvailableCarList")
            .then(response => response.data)
            .then((data) => {
                this.setState({cars : data});
            });
    }

    checkDate = datas => {
        datas.preventDefault();
        this.handleAvailableCarClick()
        if(this.state.to === undefined){
            alert("Najpierw wybierz termin wypożyczenia samochodu")
            return;
        }
        axios.post("http://localhost:8080/api/v1/rents/checkDate/" + formatDate(this.state.to) + "/" + formatDate(this.state.from))
            .then(response => response.data)
            .then((data) => {
                if(data !== ""){
                    const carsToShow = this.removeConflicting(this.state.cars, data);
                    this.setState({carsToShow:carsToShow})
                }else{
                    this.setState({carsToShow:this.state.cars})
                }
            }
        );
    }

    chooseCar = (datas, chosenCar) => {
        datas.preventDefault();
        let Difference_In_Time = this.state.to.getTime() - this.state.from.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        const datass ={"userId":this.user.userId,
            "carId":chosenCar.carId,
            "fullPrice":(chosenCar.price * Difference_In_Days),
            "rentFrom": formatDate(this.state.from),
            "rentTo": formatDate(this.state.to)
        }
        axios.post("http://localhost:8080/api/v1/rents/rent", datass)
            .then(response => response.data)
            .then(data => {
                alert(data)
                window.location.reload()
            })
        }


    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to};

        return(
            <>
                <Card className={"card bg-dark text-white p-5"}  >
                    <Form onSubmit={this.checkDate && this.handleAvailableCarClick} id="checkDate">
                        <Card.Header style={{"textAlign":"left"}}>
                            <h3>Witaj! Znajdź samochód dostosowany do Twoich potrzeb.</h3>
                            Wybierz interesujący Cię termin, a pokażemy Ci dostępne samochody.<br/><br/>
                        </Card.Header>
                        <Card.Body style={{"textAlign":"center"}}>
                            <div className="RangeExample">
                                <p>
                                    {!from && !to && 'Wybierz datę wypożyczenia (odbiór w godzinach 11-12):'}
                                    {from && !to && 'Wybierz datę zwrotu samochodu (zwrot w godzinach 9-10):'}
                                    {from &&
                                    to &&
                                    `Wybrany przedział: od ${from.toLocaleDateString()}, do ${to.toLocaleDateString()}`}{' '}
                                </p>
                                <DayPicker
                                    className="Selectable"
                                    numberOfMonths={this.props.numberOfMonths}
                                    selectedDays={[from, { from, to }]}
                                    modifiers={modifiers}
                                    onDayClick={this.handleDayClick}
                                />
                                <Helmet>
                                    <style>{`
                                      .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                                        background-color: #f0f8ff !important;
                                        color: #4a90e2;
                                      }
                                      .Selectable .DayPicker-Day {
                                        border-radius: 0 !important;
                                      }
                                      .Selectable .DayPicker-Day--start {
                                        border-top-left-radius: 50% !important;
                                        border-bottom-left-radius: 50% !important;
                                      }
                                      .Selectable .DayPicker-Day--end {
                                        border-top-right-radius: 50% !important;
                                        border-bottom-right-radius: 50% !important;
                                      }
                                    `}</style>
                                </Helmet>
                            </div>
                        </Card.Body>

                        <Card.Footer style={{"textAlign":"center"}}>
                            <br/>
                            <Link to={{pathname:'/modify', state: {collisionList : this.state.collisionList}} }>
                                <Button className="App-button" variant="success" onClick={this.checkDate} type="submit">
                                    Szukaj pojazdów&nbsp;&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button>
                            </Link>
                        </Card.Footer>
                    </Form>
                </Card>
                <Card className={"card bg-dark text-white p-5"}  style={{"textAlign":"left"}}>
                    <Card.Header>
                        <div className="RangeExample">
                            <h3>Samochody dostępne w wybranym terminie:</h3><br/>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th> </th>
                                <th>Model</th>
                                <th>Cena za dzień</th>
                                <th>Szczegóły</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.carsToShow.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"> <br/>Niestety brak dostępnych samochodów w danym terminie.</td>
                                </tr> :
                                this.state.carsToShow.map((carsToShow) => (
                                    <tr key={carsToShow.carId}>
                                        <td><img src={this.getRandomImg()} alt={"  "}/> </td>
                                        <td>{carsToShow.carName}</td>
                                        <td>{Math.round(carsToShow.price)} zł</td>
                                        <td>{
                                            <ul>
                                                {this.splitSpecifications(carsToShow.specifications).map((item, index)=>{
                                                    return <li key={index}>{item}</li>
                                                })}
                                            </ul>
                                        }</td>
                                        <td>
                                            <Button size="sm" variant="success" type="submit" onClick={event => this.chooseCar(event, carsToShow)}>
                                                Rezerwuj
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
