import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap';
import support from '../img/support.png';
import target from '../img/target.png';
import clock from '../img/clock.png';
import comment from '../img/comment.png';

 class StepsInfo extends Component {
  render() {
    return (
      <div className= "main-info-detailed">
        <Row >
            <Col className="main-info-left" md = {{span :2}}>
              <i> <img src={support} alt="KaliteliHizmet" width={90} height={90}  /> </i>
            </Col>
            <Col  md = {{span :4}}>
              <h3>Kaliteli Hizmet!</h3>
              <p> Bilmediğin yerlerde arama, sağlığını emanet edebileceğin en güvenilir ambulans firmalarını İyileş ile karşılaştır.</p>
            </Col>
            <Col className="main-info-left"  md = {{span :2}}>
              <i> <img src={comment} alt="MüşteriYorumları" width={90} height={90}  /> </i>
            </Col>
            <Col md= {{span:4}}>
              <h3>Gerçek Müşteri Yorumları!</h3>
              <p> Ambulansın sana en iyi hizmeti veriyor mu? Bilemezsin. Daha önce o ambulansları kullanmış kişilerin yorumlarını bak. </p>
            </Col>
        </Row>
        <Row>
            <Col className="main-info-right" md= {{span:2}}>
              <i> <img src={target} alt="NoktaAtışıHizmet" width={90} height={90}  /> </i>
            </Col>
             <Col>
              <h3>Nokta Atışı Hizmet!</h3>
              <p>Ambulansını gerçekten tanıyor musun? Detaylı açıklamalar ve fiyat, hız, kaliteye göre sıralama imkanı İyileş’te. </p>
            </Col>
            <Col className="main-info-right" md= {{span:2}}>
              <i> <img src={clock} alt="HızlıGeriDönüş" width={90} height={90}  /> </i>
            </Col>
            <Col>
              <h3>Hızlı Geri Dönüşler!</h3>
              <p>Sana en uygun ambulansı bulurken kolayca seçim yap, hızlıca rezervasyonunu yap, zaman kazan!</p>
            </Col>
        </Row>
      </div>
    )
  }
}

export default StepsInfo;
