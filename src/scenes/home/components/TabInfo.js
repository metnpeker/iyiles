import React, { Component } from 'react';
import {Tab, Row, Col, Nav,Button} from 'react-bootstrap';



export default class TabInfo extends Component {
  render() {
    return (
      <div className="tab-wrapper">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={4} className="tab-nav-col">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Özel Ambulans Nedir?</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                             <Nav.Link eventKey="second">Acil Yardım Ambulansı Nedir?</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                             <Nav.Link eventKey="third">Hasta Nakil Ambulansı Nedir?</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                             <Nav.Link eventKey="fourth"> Sabit Nokta Ambulansı Nedir?</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={8} className="tab-content-col">
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                             <div className="sonnet">
                             <p>Sağlık Bakanlığı denetiminde, 112 ambulanslarıyla aynı standarttaki ambulanslardır. Temel amaç hastanın ihtiyacı anında kendi istediği iki nokta arasında hızlı ve güvenilir şekilde transferini gerçekleştirmektir. </p>
                             </div>
                               <Button className="button-cta button-cta--tab " type="submit"> <a  style={{color:'#707070', display: "table-cell"}} target="_blank" href="http://blog.iyiles.com/ozel-ambulans-nedir-2/"> Daha Fazla Bilgi Al </a> </Button>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div className="sonnet">
                          <p>Acil müdahale gerektiren durumlarda gerekli tüm malzeme ve ilaçları barındıran yoğun bakıma uygun özel ambulans tipidir. Monitör, defibrilatör, Transport ventilatör, Pulse oksimetre, infüzyon pompası gibi malzemeleri bulunur.</p>
                            </div>
                            <Button className="button-cta button-cta--tab" type="submit"><a  style={{color:'#707070', display: "table-cell"}} target="_blank" href="http://blog.iyiles.com/ozel-ambulans-nedir-2/"> Daha Fazla Bilgi Al </a> </Button>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <div className="sonnet">
                            <p> Bir hastanın en uygun ve güvenli şekilde herhangi iki nokta arasında taşınmasını sağlamak için tüm tıbbı cihazlara sahip olup hastaya eşlik etmesi için bir sağlık personelini bulunduran özel ambulans tipidir.</p>
                            </div>
                            <Button className="button-cta button-cta--tab" type="submit"><a  style={{color:'#707070', display: "table-cell"}} target="_blank" href="http://blog.iyiles.com/ozel-ambulans-nedir-2/"> Daha Fazla Bilgi Al </a> </Button>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                            <div className="sonnet">
                            <p>Toplantı, organizasyon, maç gibi özel etkinliklerde karşılaşılabilecek sağlık durumları için önlem amaçlı kullanılan bir ambulans tipidir. Bir noktada düzenli veya tek sefer bulunur ve gerekli durumlarda müdahale edebilir.</p>
                            </div>
                            <Button className="button-cta button-cta--tab" type="submit"><a  style={{color:'#707070', display: "table-cell"}} target="_blank" href="http://blog.iyiles.com/ozel-ambulans-nedir-2/"> Daha Fazla Bilgi Al </a> </Button>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
      </div>
    )
  }
}
