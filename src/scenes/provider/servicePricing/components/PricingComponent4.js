import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {Formik, Form, Field} from 'formik';
import Script from 'react-load-script';
import '../servicePricing.css';
//import { getDefaultSettings } from 'http2';

class PricingComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      originQuery: '',
      destQuery: '',
      oLatLng: '',
      dLatLng: ''
    }
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handlePlaceSelectDest = this.handlePlaceSelectDest.bind(this);
    this.getFromToDistance = this.getFromToDistance.bind(this);
  }
  handleScriptLoad() {
    /*global google*/
    this.originInput = new google.maps.places.Autocomplete(document.getElementById('origin'));
    this.originInput.setFields(['address_component', 'formatted_address','geometry']);
    this.originInput.setComponentRestrictions({ 'country': ['tur'] });
    this.originInput.addListener('place_changed', this.handlePlaceSelect);
    this.destInput = new google.maps.places.Autocomplete(document.getElementById('dest'));
    this.destInput.setFields(['address_component', 'formatted_address','geometry']);
    this.destInput.setComponentRestrictions({ 'country': ['tur'] });
    this.destInput.addListener('place_changed', this.handlePlaceSelectDest);
  }
  handlePlaceSelect() {
    let addressObjectOrigin = this.originInput.getPlace();
    let oLat = addressObjectOrigin.geometry.location.lat();
    let oLng = addressObjectOrigin.geometry.location.lng();
    let oLatLng = {lat: oLat, lng: oLng}

    this.setState(
      {
        oLatLng: oLatLng
      }, () => {},
    );
  }
  handlePlaceSelectDest(){
    let addressObjectDest = this.destInput.getPlace();
    let dLat = addressObjectDest.geometry.location.lat();
    let dLng = addressObjectDest.geometry.location.lng();
    let dLatLng = {lat: dLat, lng: dLng}
    this.setState(
      {
        destQuery: addressObjectDest.formatted_address,
        dLatLng : dLatLng
      }, () => {},
    );
  }
  getFromToDistance(to, from){

    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [this.state.oLatLng],
      destinations: [this.state.dLatLng],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
    }, function(response, status){
      if(status !== 'OK'){
        alert('an errors occured');
      } else {

        var distance = response.rows[0].elements[0].distance.text;


        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;

      }
    })
  }
  /*
  getStationFromDistance(from, stations){
    //distance matrix service
    //origins will be stations
    //destination wil be origin
    //google returns every combination of origins and destinations.
    //get and return the min distance
  }

  isSameCity(toCity, fromCity){
    if(toCity === fromCity){
      return true;
    }else{
      return false;
    }
  }
  calculateFee(startingFee, perKmFee, stationStartFee, distance1, distance2){
    const Fee = startingFee +(distance1*perKmFee)+(distance2*stationStartFee);
    return Fee;
  }
  getFee(to, from, stations){ //to, from, stations must be object that have properties like lat, lnd, city
    const startingFee, perKmFee, stationStartFee;
    const same = isSameCity(to.city, from.city);
    if(same){
      //get şehiriçi prices
      //set prices to variables
      //return variables
    }else{
      //get şehirdışı prices
      //set prices to variables
      //return variables
    }
   const distanceToFrom = getFromToDistance(to, from);
   const distanceStationFrom = getSationFromDistance(station, from);

   const Fee = calculateFee(startingFee, perKmFee, stationStartFee,distanceToFrom,distanceStationFrom);
    return Fee
  }*/
  render(){
    return(
      <div className = "pricingDiv">
        <h2 style = {{color : "#F68A25"}}>Sabit Nokta Ambulansı</h2>
        <Row>
          <Col md = {{span : 8}}>
            <Row className = "fixed-amb-row">
              <Col className = "labelStyle" style={{marginLeft:'42%',marginRight:'8%'}} md = {{span:2}}>Saatlik Ücreti</Col>
              <Col className = "labelStyle" md = {{span:4}}>İstasyon ile Başlangıç Arası KM Ücreti*</Col>
            </Row>
            <Formik
            initialValues={{
              //out = şehirdışı, in = şehiriçi
              in_starting_fee: '',
              in_per_km_fee: '',
              in_station_to_address_fee: '',
              out_starting_fee: '',
              out_per_km_fee:'',
              out_station_to_address_fee:''
            }}
            onSubmit={fields => {

            }}
            render={({errors})=>(
              <Form>
                 <Row className = "fixed-amb-row">
                    <Col className = "labelStyle" md ={{span :4}}>Şehiriçi Tarife</Col>
                    <Col  md = {{span : 4 }}><Field name="in_starting_fee" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                    <Col  md = {{span : 4}}><Field name="in_station_to_address_fee"className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                  </Row>
                  <Row className = "fixed-amb-row">
                     <Col className = "labelStyle" md ={{span :4}}>Şehirdışı Tarife</Col>
                      <Col  md = {{span : 4}}><Field name="out_starting_fee" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                      <Col  md = {{span : 4}}><Field name="out_station_to_address_fee" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                  </Row>
              <Button type="submit" className="update-button"> GÜNCELLE </Button>
              </Form>
            )}
          />
          </Col>
          <Col className = "pricingInformation" md ={{offset:1,span:3}}>
              <h5>İstasyon ile Müşteri Arası KM Ücreti Nedir?</h5>
              <p>Müşteri, başlangıç ve bitiş noktasını belirlediğinde gösterilecek fiyatınıza isterseniz istasyonunuzdan müşteriye gidilecek mesafe içinde bir KM ücreti belirleyebilirsiniz. Buradaki amacımız uzak mesafelerdeki müşterileriniz sizi seçmek isterse mağduriyet yaşamamınız ve hizmet verebilmenizdir. Örneğin: Çeşme’den Urla’ya gitmek için talep oluşturan müşterinize en yakın istasyonunuz Alsancak’ta ise müşteri Çeşme-Urla fiyatınızın içinde Alsancak-Çeşme arası belirlediğiniz KM ücretini de eklenmiş görecektir.</p><p>Açılış Ücreti + (İstasyon-Başlangıç Arası KM) x KM Ücreti + (Başlangıç-Bitiş Arası KM) x KM Ücreti = Gösterilen Fiyat</p>
          </Col>
        </Row>
        <Row>
        <Col md ={{span:2}}><h2 style = {{color : "#F68A25"}}>Hesap Makinesi</h2></Col>
        <Col md={{span:6}}><p style = {{color : "#03002D",fontSize:"10px"}}>* Seçtiğiniz ilçelerdeki fiyatlarınızı KM’ye göre denemek için hesap makinesini kullanabilirsiniz.</p></Col>
        </Row>

        <Row className="priceCalculator">
          <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk9rtXITPUibY0DDBWkB4eDQOQJv70LXg&libraries=places" onLoad={this.handleScriptLoad} />
          <Col  md = {{span : 4}}><input className ="form-control pricingForm" id="origin" placeholder="Nereden..." /></Col>
          <Col  md = {{span : 4}}><input className ="form-control pricingForm" id="dest"  placeholder="Nereye..." /></Col>
          <Col  md = {{span : 1}}><h1>=</h1></Col> {/*H1 OLMAMALIIIIIII*/}
          <Col  md = {{span : 3}}><input className ="priceCalculator"  placeholder="...TL" /></Col>
          <Button type="button" className="get-distance ml-auto" onClick={()=>this.getFromToDistance()}>Hesapla</Button>
        </Row>
      </div>
    )
  }
}
export default PricingComponent;
