import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reservationResultData } from '../../services/reservationStatus/ReservationStatusAction';
import { Container, Col, Button } from 'react-bootstrap';

import ReservationResult from './components/ReservationResult';
import ReservationStatusMessage from './components/ReservationStatusMessage';
import ReservationResultConfirmed from './components/ReservationResultConfirmed';
import AppCard from './components/AppCard';
import CarouselCompany from './components/CarouselCompany.js';
import RejectedMessageWithoutLogin from './components/RejectedMessageWithoutLogin.js';

class ReservationStatusPage extends Component {
    constructor(props) {
        super(props);
        const app_id = Number(this.props.match.params.app_id);
        this.props.reservationResultData(app_id);
    }
    render() {
        let StatusComponents = null;
        const isAuth = this.props.auth.isAuthenticated;
        switch (this.props.appData.app_status) {
            case 1:
                //pending
                if (isAuth) {
                    StatusComponents = <React.Fragment>

                        <ReservationStatusMessage appData={this.props.appData} />
                        <ReservationResult appData={this.props.appData} loading={this.props.status.loading} />
                    </React.Fragment>;
                    return StatusComponents;
                } else {
                    StatusComponents = <div className="smsConfirmDiv">SMS ve Mail olarak gönderdiğimiz “linke tıklayarak” şifrenizi belirleyiniz.</div>;
                    return StatusComponents;
                }
            case 2:
                //confirmed
                if (isAuth) {
                    StatusComponents = <React.Fragment>
                        <ReservationStatusMessage appData={this.props.appData} />
                        <ReservationResultConfirmed appData={this.props.appData} />
                        <AppCard /> {/* neden bir tek bu sayfada var? */}
                    </React.Fragment>
                    return StatusComponents;
                } else {
                    //what returns here??
                    StatusComponents = <p>unregistered confirmed components</p>;
                    return StatusComponents;
                }
            case 3:
                //rejected
                if (isAuth) {
                    StatusComponents = <React.Fragment>

                        <ReservationStatusMessage appData={this.props.appData} />
                        <CarouselCompany />
                        <Col style={{ marginTop: "5%" }} md={{ offset: 5, span: 12 }}>
                            <Link to='/providers'>
                                <Button style={{ color: 'white', backgroundColor: '#F68A25', borderColor: '#F68A25' }}>
                                    <b>Tüm Ambulansları Gör</b>
                                </Button>
                            </Link>
                        </Col>
                    </React.Fragment>
                    return StatusComponents;

                } else {
                    StatusComponents = <React.Fragment><RejectedMessageWithoutLogin />
                        <CarouselCompany />
                        <Col style={{ marginTop: "5%" }} md={{ offset: 5, span: 12 }}>
                            <Button className="orangeButton"><b>Tüm Ambulansları Gör</b></Button>
                        </Col>
                    </React.Fragment>
                    return StatusComponents;
                }

            default:
                StatusComponents = 'there is an error';
        }
        const { loading } = this.props.status;
        if (loading) {
            return (
                <Container>
                    <p>loading...</p>
                </Container>
            )
        } else {
            return (
                <Container>
                    <ReservationStatusMessage appData={this.props.appData} />
                    {StatusComponents}
                </Container>
            )
        }

    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    status: state.reservation,
    appData: state.reservation.appointmentsData
})

export default connect(mapStateToProps, { reservationResultData })(ReservationStatusPage);
