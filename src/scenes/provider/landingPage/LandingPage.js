import React from 'react';
import {Row, Col} from 'react-bootstrap';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import './landingPageStyle.css';

class  LandingPage extends React.Component {
  render (){
    return (
      <div>
      <HeaderComponent/>
      <div className = "landingTitle">
          <img src="logo.svg" alt="logo"/>
        <h1>Ambulans firman Sağlık 360'da yer alsın</h1>
      </div>
      <div  className = "landingInformationCard">
        <Row>
          <Col md = {{span : 1, offset: 1}}>
          <i style = {{float:"left"}} className="fas fa-calendar-alt fa-4x"></i></Col>
          <Col md = {{span : 6, offset : 1}}>
          <h3>Güvenilir ve Kaliteli Hizmeti Bul</h3>
          <p>Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.</p>
          </Col>
        </Row>
        <Row>
          <Col md = {{span : 6, offset : 2}}>
          <h3>Diğer Kullanıcılara Kulak Ver</h3>
          <p>Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.</p>
          </Col>
          <Col md = {{span : 1, offset: 1}}>
          <i style = {{float:"right"}} className="fas fa-calendar-alt fa-4x"></i>
          </Col>
        </Row>
        <Row>
          <Col md = {{span : 1, offset: 1}}>
          <i style = {{float:"left"}} className="fas fa-calendar-alt fa-4x"></i></Col>
          <Col md = {{span : 6, offset : 1}}>
          <h3>İhtiyaca Yönelik Hizmetleri Gör</h3>

          <p>Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.</p>
          </Col>
        </Row>
        <Row>
          <Col md = {{span : 6, offset : 2}}>
          <h3>Zaman Kazan!</h3>
          <p>Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.Tanıdıklara sorarak firmaların sitelerine bakarak sağlığını şansa bırakma. Kalite standartlarımız ve güvenlik regülasyonlarımıza uygun firmaları bul.</p>
          </Col>
          <Col md = {{span : 1, offset: 1}}>
          <i style = {{float:"right"}} className="fas fa-calendar-alt fa-4x"></i>
          </Col>
        </Row>
      </div>
      </div>
    )
  }
}
export default LandingPage;
