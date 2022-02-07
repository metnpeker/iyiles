import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Row} from 'react-bootstrap';
import '../reservationStatus.css';
import pending from '../images/pending.png';
import confirmed from '../images/done.png';
import rejected from '../images/rejected.png';


class PendingMessage extends React.Component {

  render (){
    let textComponent= null;
    let boldTextComponent = null;
    let img = null;
    switch(1){
      case 1:
      //pending
        textComponent = <React.Fragment><h6>Sayın {this.props.appData.client.user.u_name+' '+this.props.appData.client.user.u_surname},</h6>
          <h6> Rezervasyon talebiniz başarıyla oluşturulmuştur.</h6>
          </React.Fragment>;
        boldTextComponent = <React.Fragment>
          <h6>Ambulans firması randevu talebinizi onayladığında SMS ile bilgilendirileceksiniz.</h6>
        </React.Fragment>
        img = <img alt="pending" src= {pending}/>;
        break;
      case 2:
      //confirmed
        textComponent = <React.Fragment><h6>Sayın {this.props.appData.client.user.u_name+' '+this.props.appData.client.user.u_surname},</h6>
          <h6> Rezervasyonunuz başarıyla oluşturulmuştur</h6>
          </React.Fragment>;
        boldTextComponent = <React.Fragment> <h6>
              {this.props.appData.provider.pro_name} sizi en kısa zamanda arayacaktır. Her türlü sorunuz için aşağıdaki ara butonuyla firmaya ulaşabilirsiniz.
              </h6>
            </React.Fragment>
        img = <img alt="confirmed" src= {confirmed}/>;
        break;
      case 3:
        textComponent = <React.Fragment><h6>Sayın {this.props.appData.client.user.u_name+' '+this.props.appData.client.user.u_surname},</h6><h6> Talebiniz ambulans firması tarafından <b>İPTAL EDİLMİŞTİR.</b></h6>
          </React.Fragment>;
        boldTextComponent = <React.Fragment><h6><b>Talep ettiğiniz gün ve saatte diğer ambulanslara hızlıca rezervasyon oluşturmak aşağıdaki tablodan Çağır’a basabilir veya tüm ambulansların listelerine ulaşabilirsiniz.</b></h6>
            </React.Fragment>
        img = <img alt="rejected" src= {rejected}/>;
        break;
      case 4:

    }
    return (
      <div className ="containerWithMessage">
      <Row className="justify-content-md-center">
          <Col md={{ span:1 }}>{img}</Col>
          <Col md={{ span:8 }}>
           {textComponent}
          </Col>
      </Row>
      <Row className="justify-content-md-center">
          <Col md={{ span:11 }}> {boldTextComponent} </Col>
      </Row >
       </div>
    )

  }
}
export default PendingMessage;
