import React from 'react';
import './FaqPage.css';
import {connect} from 'react-redux';
import { Col, Card, Accordion,Button,Container } from 'react-bootstrap';

class FaqPage extends React.Component{

  render() {
    return(

  <div className = "main-container">

  <Col md={{span:9, offset :3}} style = {{marginTop: "3%"}} >
  <h6 className="title-col"> Sık Sorulan Sorular </h6>
  <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-header">
        İyileş uygulaması nedir?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body className="accordion-body" >İyileş, özel ambulans firmalarını hızlı ve güvenilir bir şekilde müşterilerle buluşturan bir platformdur.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="1" className="accordion-header">
        İyileş platformuna nasıl kaydolabilirim?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body className="accordion-body" >Anasayfamızda bulunan ‘Üye Ol’ butonuna tıklayarak, istenilen bilgiler doldurduğunuzdan sonra danışmanlarımız sizinle iletişime geçecektir.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="2" className="accordion-header">
        İyileş Müşteri tarafı Nasıl Çalışır?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body className="accordion-body" >Bulunduğunuz adresi, ambulansı talep ettiğiniz tarihi ve ihtiyacınız olan ambulans tipini seçtikten sonra seçtikten sonra sana en uygun ambulanslar listelenir. Fiyat/Kalite/Zamanlama kriterlerinde sıralama yapabilir, diğer kullanıcıların yorumlarını görebilirsin.
Seçtiğin özel ambulans firmasıyla rezervasyonu tamamlamak için gerekli olan bilgileri eksiksiz girdikten sonra talebin firmanın onayına gönderilir.
Özel ambulans firması oluşturduğunuz rezervasyonu uygunluk durumuna göre onaylarsa iletişim bilgileri karşılıklı paylaşılır ve firma sizi arar.
Reddederse eğer sizin başta girdiğiniz seçimlere göre yeni ambulans firmaları karşınıza çıkar ve tekrar bilgilerinizi girmeden rezervasyon oluşturmanız sağlanır.
</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="3" className="accordion-header">
        İyileş Kurumsal sayfası nasıl çalışır?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body className="accordion-body" >Kurumsal sayfanızın bilgisayarınızda her zaman açık olması önerilir. Bildirim iznini her zaman açık yaptığınız zaman randevu talep edildiği anda tarayıcınız üzerinden sesli ve pop-up bildirimler gelecektir.
Sayfanızın sol tarafında her zaman sabit olarak Bekleyen, Gelecek ve Geçmiş Rezervasyonlarını görebilirsin ve yeni gelecek rezervasyon taleplerini takip edebilirsin.
Menülerden ise firman ile ilgili yer alan tüm bilgileri kolaylıkla değiştirebilirsin.
</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="4" className="accordion-header">
        Müşteri ile ne zaman iletişime geçebileceğim?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="4">
      <Card.Body className="accordion-body" >Müşteri tarafında rezervasyon talebi sisteminize gelip onayladıktan sonra direk müşterinin iletişim bilgilerine ulaşabilirsiniz.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="5" className="accordion-header">
        Ödemelerimi ne zaman alabileceğim?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="5">
      <Card.Body className="accordion-body" >Ödemelerin her ayın sonunda sisteme girdiğin banka hesabına, otomatik olarak aktarılacaktır. Ödemelerini ‘Ödemeler’ sayfasından takip edebilirsin.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="6" className="accordion-header">
        Ambulans sıralamalarında listesinde daha üst sırada çıkmam için nelere dikkat etmeliyim?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="6">
      <Card.Body className="accordion-body" >İyileş platformu ambulans firmalarını belirli kriterlere ve algoritmalara göre sıralamaktadır. Müşteriler tarafından verilen değerlendirme puanları, yorumlar en önemli sıralama ölçütüdür. Aynı zamanda diğer rakip firmalara göre uygun fiyat veren ve rezervasyon taleplerini hızı onaylayan firmalar daha üst sıralarda çıkma olasılığı artmaktadır.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header className="accordion-back">
      <Accordion.Toggle as={Button} variant="link" eventKey="7" className="accordion-header">
         Tarafıma gelen talepleri reddetmem veya iptal etmemin bir sonucu var mı?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="7">
      <Card.Body className="accordion-body" >Yüksek oranda talep reddetme veya iptal yaparsan sistem otomatik olarak firmanı listede daha geri sıraya atabilir, geçici süreliğine veya kalıcı olarak sistemden çıkarabilir.</Card.Body>
    </Accordion.Collapse>
  </Card>

</Accordion>
</Col>
     </div>


    )
  }
}
const mapStatetoProps = state => ({
    profileProviderData : state.business.providerProfile.providerProfileInformation
})
export default connect(mapStatetoProps) (FaqPage);
