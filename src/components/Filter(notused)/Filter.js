import React from 'react';
import  './filter.css';
import Script from 'react-load-script';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Col, Row, Button, Form} from 'react-bootstrap';
import {faSync, faChevronRight} from  "@fortawesome/free-solid-svg-icons";

class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      from:'',
      to:'',
      errors: {from:'',to:''},
      toValid:'',
      fromValid:'',
      formValid:''
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleFromSelect = this.handleFromSelect.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      ()=>{this.validateField(name, value)});
  }
  validateField(field, value){
    let fieldValidationErrors = this.state.errors;
    let fromValid = this.state.fromValid;
    let toValid = this.state.toValid;
    switch(field){
      case 'from':
        fromValid = value.length>=10;
        fieldValidationErrors.from = fromValid ? '' : 'Adres bilgisi en az 10 karakter içermelidir.';
        break;
      case 'to':
        toValid = value.length>=10;
        fieldValidationErrors.to = toValid ? '' : 'Adres bilgisi en az 10 karakter içermelidir.';
        break;

      default:
        break;
    }
    this.setState({errors: fieldValidationErrors,
      fromValid: fromValid,
      toValid: toValid,
    }, this.validateForm);
  }
  validateForm() {
    let fieldValidationErrors = this.state.errors;
    let fromValid = this.state.fromValid;
    fromValid = this.state.from.length>=10;
    fieldValidationErrors.from = fromValid ? '' : 'Adresi seçeneklerden seçiniz';
    this.setState({errors: fieldValidationErrors,
      fromValid: fromValid
    });
    let toValid = this.state.toValid;
    toValid = this.state.from.length>=10;
    fieldValidationErrors.to = toValid ? '' : 'Adresi seçeneklerden seçiniz';
    this.setState({errors: fieldValidationErrors,
      toValid: toValid
    });
    this.setState({formValid: this.state.fromValid && this.state.toValid });

  }
    handleScriptLoad() {
      /*global google*/
      this.fromInput = new google.maps.places.Autocomplete(document.getElementById('from-input'));
      this.fromInput.setFields(['address_component', 'formatted_address','place_id']);
      this.fromInput.setComponentRestrictions({ 'country': ['tur'] });
      this.fromInput.addListener('place_changed', this.handleFromSelect);
      this.toInput = new google.maps.places.Autocomplete(document.getElementById('to-input'));
      this.toInput.setFields(['address_component', 'formatted_address','place_id']);
      this.toInput.setComponentRestrictions({ 'country': ['tur'] });
      this.toInput.addListener('place_changed', this.handlePlaceSelect);
    }
  handleFromSelect() {
        let addressObjectFrom = this.fromInput.getPlace();
        this.setState({
          from: addressObjectFrom.formatted_address
           });
  }
  handlePlaceSelect() {
    let addressObjectTo = this.toInput.getPlace();
    this.setState({
      to: addressObjectTo.formatted_address
       });
     }
  render() {
    return (
      <Container className="filter-container">
      <Row>
          <Col>
          <Form className="form-style">
            <div key={`custom-inline-radio`} >
              <Form.Check
                custom
                inline
                label="Sadece Gidiş"
                type="radio"
                id={`custom-inline-1`}
                onChange={this.onChanged}
                value="option1"
                name="oneway"
              />

              <Form.Check
                custom
                inline
                label="Gidiş - Dönüş"
                type="radio"
                id={`custom-inline-2`}
                name="oneway"
                onChange={this.onChanged}
              />
            </div>
          </Form>
          <p className="header-collapse"> Ambulans Tipi </p>
          <Form.Control  as="select" className="option-handler" value = {this.props.s_id}>
            <option>Seçiniz</option>
            {this.props.servicesList.map((data,id) => {
                return(<option key= {data.s_id} value ={id}> {data.s_name}</option>)
            })}
            <option>Hasta Nakil</option>
            <option>Cenaze</option>
          </Form.Control>
          </Col>
          <Col>
          <div>
            <p className="header-collapse">
              Nereden
            </p>
            <input name="from" id="from-input" type="text" placeholder="Detaylı olarak giriniz..." className={'form-control fromForm option-handler  ' +(this.state.fromValid ? '': 'is-invalid')} />
            {this.state.fromValid ? null : <p  className="invalid-feedback">{this.state.errors.from}</p>}
           </div>
           <FontAwesomeIcon icon={faSync} size="2x" style={{marginTop:"10%"}} />
           <div>
             <p className="header-collapse">
               Nereye
             </p>
               <input name="to" id="to-input" type="text" placeholder="Detaylı olarak giriniz..." className={'form-control toForm option-handler ' +(this.state.toValid ? '': 'is-invalid')} />
               {this.state.toValid ? null : <p  className="invalid-feedback">{this.state.errors.to}</p>}
            </div>
           </Col>
          <Col>
          <Link to ="/providers">
          <Button className = "font-button"> <FontAwesomeIcon icon={faChevronRight} size="3x" style={{marginTop:"7%"}} /></Button>
          </Link>
          </Col>
      </Row>

      </Container>
    )
  }
}
const mapStateToProps = state => ({
 servicesList : state.provider.servicesData
})
export default connect(mapStateToProps)(Filter)
