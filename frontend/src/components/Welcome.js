import React, {Component} from "react";
import Card from "react-bootstrap/Card";

export default class Welcome extends Component{
    render() {
        return(
            <Card className={"bg-dark text-white p-5"}>
                <Card.Header>
                    <h2>Nasza firma to rzetelna firma. Jedyna taka w Krakowie!</h2><br/>
                    Znajdziesz u nas samochód dostosowany do Twoich potrzeb.
                </Card.Header>
                <br/>
                <Card.Body>
                    <h3>Masz jakieś pytania? Zapraszamy do kontaktu:</h3>
                    <ul>
                        <li><p>rentacar@krakow.pl</p></li>
                        <li><p>123 456 789</p></li>
                    </ul>
                </Card.Body>
            </Card>
        );
    }

}