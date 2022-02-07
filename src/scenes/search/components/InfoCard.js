import React, { Component } from 'react'
import {Col} from 'react-bootstrap';

const outerStyle = {
    border: '2px solid #89F5FF',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '250px',
    marginTop: '5%',
    marginLeft: '1em',
    height: '300px',
    padding: '0.5rem',
    paddingBottom: '25px',
    paddingTop: '10px',
    fontSize: '20px',
    textAlign: 'center',
    textTransform: 'capitalize'
}
const innerStyle = {
    border: '2px solid #F68A25',
    borderRadius: '10px',
    height: '80%',
    maxWidth: '280px',
    fontSize: '16px',
}

export default class InfoCard extends Component {
    render() {
        return (
            <Col md="3" lg="2" className="d-none d-sm-none d-md-block" style={outerStyle}>
                <p style={{ fontWeight: 'bold', marginBottom: '0px'}}>hasta nakil ambulansı</p>
                <Col style={innerStyle} >
                    <p style={{ overflowWrap: 'break-word',paddingTop: '5px'}}>ambulans info </p>
                </Col>
            </Col>
        )
    }
}
