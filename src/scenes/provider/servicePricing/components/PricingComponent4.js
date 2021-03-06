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
      //get ??ehiri??i prices
      //set prices to variables
      //return variables
    }else{
      //get ??ehird?????? prices
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
        <h2 style = {{color : "#F68A25"}}>Sabit Nokta Ambulans??</h2>
        <Row>
          <Col md = {{span : 8}}>
            <Row className = "fixed-amb-row">
              <Col className = "labelStyle" style={{marginLeft:'42%',marginRight:'8%'}} md = {{span:2}}>Saatlik ??creti</Col>
              <Col className = "labelStyle" md = {{span:4}}>??stasyon ile Ba??lang???? Aras?? KM ??creti*</Col>
            </Row>
            <Formik
            initialValues={{
              //out = ??ehird??????, in = ??ehiri??i
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
                    <Col className = "labelStyle" md ={{span :4}}>??ehiri??i Tarife</Col>
                    <Col  md = {{span : 4 }}><Field name="in_starting_fee" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                    <Col  md = {{span : 4}}><Field name="in_station_to_address_fee"className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                  </Row>
                  <Row className = "fixed-amb-row">
                     <Col className = "labelStyle" md ={{span :4}}>??ehird?????? Tarife</Col>
                      <Col  md = {{span : 4}}><Field name="out_starting_fee" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                      <Col  md = {{span : 4}}><Field name="out_station_to_address_fee" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                  </Row>
              <Button type="submit" className="update-button"> G??NCELLE </Button>
              </Form>
            )}
          />
          </Col>
          <Col className = "pricingInformation" md ={{offset:1,span:3}}>
              <h5>??stasyon ile M????teri Aras?? KM ??creti Nedir?</h5>
              <p>M????teri, ba??lang???? ve biti?? noktas??n?? belirledi??inde g??sterilecek fiyat??n??za isterseniz istasyonunuzdan m????teriye gidilecek mesafe i??inde bir KM ??creti belirleyebilirsiniz. Buradaki amac??m??z uzak mesafelerdeki m????terileriniz sizi se??mek isterse ma??duriyet ya??amam??n??z ve hizmet verebilmenizdir. ??rne??in: ??e??me???den Urla???ya gitmek i??in talep olu??turan m????terinize en yak??n istasyonunuz Alsancak???ta ise m????teri ??e??me-Urla fiyat??n??z??n i??inde Alsancak-??e??me aras?? belirledi??iniz KM ??cretini de eklenmi?? g??recektir.</p><p>A????l???? ??creti + (??stasyon-Ba??lang???? Aras?? KM) x KM ??creti + (Ba??lang????-Biti?? Aras?? KM) x KM ??creti = G??sterilen Fiyat</p>
          </Col>
        </Row>
        <Row>
        <Col md ={{span:2}}><h2 style = {{color : "#F68A25"}}>Hesap Makinesi</h2></Col>
        <Col md={{span:6}}><p style = {{color : "#03002D",fontSize:"10px"}}>* Se??ti??iniz il??elerdeki fiyatlar??n??z?? KM???ye g??re denemek i??in hesap makinesini kullanabilirsiniz.</p></Col>
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
