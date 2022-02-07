import React from 'react';
import {connect} from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Row, Col, Form,  Button, Container} from 'react-bootstrap';
import './providerRequestStyle.css';


class ProviderRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      phone: '',
    }
  }
  handleFormSubmit( event ) {
    event.preventDefault();
    
  }
  render() {

    return (
        <div style = {{textAlign : "center", marginBottom : "5%"}}>
        <div className = "providerRequestHeader">
            <img src="logo.svg" alt="logo"/>
          <h1> Ambulans firman Sağlık 360'da yer alsın </h1>
        </div>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email:'',
            phone: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Doldurulması Zorunlu Alan'),
            surname: Yup.string().required('Doldurulması Zorunlu Alan'),
            email:Yup.string().required('Doldurulması Zorunlu Alan').email(),
            phone: Yup.string().required('Doldurulması Zorunlu Alan'),
          })}

          render= {({errors, touched})=>(

          <Container className = "formContainer">
              <Form >
              <Row className="form-row">
                <Col xs="12" sm="6" md = {{offset : 1, span : 9}} className="form-col">
                <div className="mb-3">
                    <Field name="name" type="text" placeholder="İsim"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    className={'form-control formInputArea' + (errors.name && touched.name ? ' is-invalid' : '')} />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="12" sm="6" md = {{offset : 1, span : 9}} className="form-col">
                <div className="mb-3">
                    <Field name="surname" type="text" placeholder="Soyisim"
                    value={this.state.surname}
                    onChange={e => this.setState({ surname: e.target.value })}
                    className={'form-control formInputArea' + (errors.surname && touched.surname ? ' is-invalid' : '')} />
                    <ErrorMessage name="surname" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="12" sm="6" md = {{offset : 1, span : 9}} className="form-col">
                <div className="mb-3">
                    <Field name="email" type="text" placeholder="Mail "
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    className={'form-control formInputArea' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs="12" sm="6" md = {{offset : 1, span : 9}} className="form-col">
                <div className="mb-3">
                    <Field name="phone" type="text" placeholder="Telefon Numarası"
                    value={this.state.phone}
                    onChange={e => this.setState({ phone: e.target.value })}
                    className={'form-control formInputArea' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                  </div>
                </Col>
              </Row>
                <Button className = "orangeButton" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit">
                  Gönder
                </Button>
              </Form>
          </Container>
        )}
          />
          <Button className = "orangeButton" type="submit">
            Neden Sağlık 360 Platformuna Kaydolmalısınız?
          </Button>

  </div>
    )
  }
}
const mapStateToProps = state => ({
  })

export default connect(mapStateToProps, {})(ProviderRequest)
