import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom';
import Welcome from "./components/Welcome";
import Login, {getIsLoggedAsAdmin, getIsLoggedAsUser, getIsLoggedIn} from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import LoggedNavigationBar from "./components/LoggedNavigationBar";
import Registration from "./components/Registration";
import AdminConfirmReservations from "./components/AdminConfirmReservations";
import AdminCurrentReservations from "./components/AdminCurrentReservations";
import UserAvailableCars from "./components/UserAvailableCars";
import UserModifyReservation from "./components/UserModifyReservation";
import UserMyReservations from "./components/UserMyReservations";
import UserWelcome from "./components/UserWelcome";
import Switch from "react-bootstrap/Switch";
import UserAccount from "./components/UserAccount";
import Footer from "./components/Footer";
import 'react-calendar/dist/Calendar.css';

export default function App() {

  const margin = {
    marginTop:"20px"
  };

  const isLoggedIn= getIsLoggedIn();
  const isAdmin = getIsLoggedAsAdmin();
  const isUser= getIsLoggedAsUser();

  return (
    <Router>
      {isLoggedIn && <LoggedNavigationBar/>}
      {!isLoggedIn && <NavigationBar/>}
      <Container>
        <Row>
          <Col lg={12} style={margin}>
            <Switch>
              {!isLoggedIn &&<>
                <Route path="/" exact component={Welcome}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/registration" exact component={Registration}/>
              </>}

              {isAdmin && <>
                <Route path="/" exact component={Welcome}/>
                <Route path="/login" exact component={Welcome}/>
                <Route path="/confirm" exact component={AdminConfirmReservations}/>
                <Route path="/delete" exact component={AdminCurrentReservations}/>
             </>}

              {isUser && <>
                <Route path="/" exact component={Welcome}/>
                <Route path="/login" exact component={UserWelcome}/>
                <Route path="/availableCars" exact component={UserAvailableCars}/>
                <Route path="/modifyRent/:id" exact component={UserModifyReservation}/>
                <Route path="/myReservations" exact component={UserMyReservations}/>
                <Route path="/home" exact component={UserWelcome}/>
                <Route path="/myAccount" exact component={UserAccount}/>
              </>}
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

