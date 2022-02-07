import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';
import {Formik, Form, Field } from 'formik';
import {connect} from 'react-redux';

import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {rejectReason} from '../../../../services/provider/showAppointment/showAppointmentAction'
const wrapperStyle ={
    textAlign: 'center',
    marginBottom: "10%"
}

const inputStyle={
    margin: '1em',
    border: '1px solid #FF6961',
}
const lolStyle={
    height: '127px',
    outline: 'none',
    resize: 'none',
}

//event handler to call function that accepts this.props.acceptAppointment(id) id'yi prop olarak alabilirim?
//event handler to call function that accepts
//event handler to send feedback

 class AcceptRejectButtons extends Component {

    constructor(props){
        super(props);
        this.state={
            isOpen: false
        };
        this.toggleForm = this.toggleForm.bind(this)
    }

    toggleForm(){
        this.setState(prevState =>({
            isOpen: !prevState.isOpen
        }));
    }

    sendReqhandler(status, reason_reject){
      if(status === "reject"){
        console.log('sendReqhandler', reason_reject);
          this.props.acceptButton(status, reason_reject);
      }else{
          this.props.acceptButton(status);
      }
    }

    render() {
        return (
            <div style={wrapperStyle}>
                <button className="buttons accept" onClick={()=>this.sendReqhandler("accept", "")} style={this.state.isOpen ? {display:'none'}: null}>kabul et</button>
                <button className="buttons reject" onClick={this.toggleForm} style={this.state.isOpen ? {display:'none'} : null}>reddet</button>
                 <div className="feedback-form" style={this.state.isOpen ? null : {display:'none'}}>
                 <FontAwesomeIcon onClick={this.toggleForm} className="close-button" icon={faTimesCircle} size="2x" />
                    <Formik
                    initialValues={{
                        reason_reject: '',
                        text: ''
                    }}
                    validationSchema={Yup.object().shape({
                        reason_reject: Yup.string().required('Doldurulması zorunlu alan'),
                        text:  Yup.string().required('Doldurulması zorunlu alan')
                    })}
                    onSubmit={fields=>{
                      console.log(fields.text);
                        this.sendReqhandler("reject", fields.text);
                    }}
                    render={({errors, touched})=>(
                        <Form style={{display: 'flex'}} >
                            <Field name="reason_reject"  component="select" placeholder="Reddetme sebebinizi seçiniz." style={inputStyle} className={'form-control ' + (errors.reason_reject && touched.reason_reject ? ' is-invalid' : '')}>
                                <option value="1"> Rezervasyonlarımız Doludur. </option>
                                <option value="2"> Hizmet Vermediğim İlçe. </option>
                                <option value="3"> Diğer </option>
                            </Field>
                            <Field name="text" component="textarea" placeholder="Eklemek istedikleriniz..." style={Object.assign({}, inputStyle, lolStyle)} className={'form-control ' + (errors.text&& touched.text ? ' is-invalid' : '')} />
                            <button type="submit"  className="buttons reject">reddet</button>
                        </Form>
                    )}
                    />
                    </div>
            </div>
        )
    }
}
const mapStatetoProps = state => ({
   status: state.business.appointments,
})
export default connect(mapStatetoProps,{rejectReason})(AcceptRejectButtons);
