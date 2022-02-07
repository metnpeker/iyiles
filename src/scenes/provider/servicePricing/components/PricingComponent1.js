import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Alert} from 'react-bootstrap';
import {Formik, Form, Field} from 'formik';
import {updatePrices,providerProfile, resetPriceComponent} from '../../../../services/provider/ProfilePage/ProfilePageAction';
import Script from 'react-load-script';
import '../servicePricing.css';
import {getDistance} from './Map.js'

class PricingComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      originQuery: '',
      destQuery: '',
      oLatLng: '',
      dLatLng: '',
      oCity: '',
      dCity: '',
      actualDist: 0,
      startingDist: 0,
      fee: 0
    }

    this.props.resetPriceComponent();
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handlePlaceSelectDest = this.handlePlaceSelectDest.bind(this);
    this.getFromToDistance = this.getFromToDistance.bind(this);
    this.isSameCity = this.isSameCity.bind(this);
    this.mapStationsCoord = this.mapStationsCoord.bind(this);
    this.getStationFromDistance = this.getStationFromDistance.bind(this);
    this.calculateFee = this.calculateFee.bind(this);
    this.getFee = this.getFee.bind(this);
    this.showDistance = this.showDistance.bind(this);
    this.showMinDistance = this.showMinDistance.bind(this);
  }
  isSameCity(oCity, dCity){
    if(oCity === dCity){
      return true;
    }else{
      return false;
    }
  }

  handleScriptLoad() {
    /*global google*/
    this.originInput = new google.maps.places.Autocomplete(document.getElementById(this.props.service.service_id+"org"));
    this.originInput.setFields(['address_component', 'formatted_address','geometry']);
    this.originInput.setComponentRestrictions({ 'country': ['tur'] });
    this.originInput.addListener('place_changed', this.handlePlaceSelect);
    this.destInput = new google.maps.places.Autocomplete(document.getElementById(this.props.service.service_id+"des"));
    this.destInput.setFields(['address_component', 'formatted_address','geometry']);
    this.destInput.setComponentRestrictions({ 'country': ['tur'] });
    this.destInput.addListener('place_changed', this.handlePlaceSelectDest);
  }

  handlePlaceSelect() {
    let addressObjectOrigin = this.originInput.getPlace();
    let oLat = addressObjectOrigin.geometry.location.lat();
    let oLng = addressObjectOrigin.geometry.location.lng();
    let oLatLng = {lat: oLat, lng: oLng}
    let address= addressObjectOrigin.address_components.filter(address =>{
      if(address.types[0] === 'administrative_area_level_1'){
        return address;
      }else{
        return null;
      }
    })
    let city = address[0].long_name
    this.setState({
        originQuery: addressObjectOrigin.formatted_address,
        oLatLng: oLatLng,
        oCity: city
      }, () => {});
  }

  handlePlaceSelectDest(){
    let addressObjectDest = this.destInput.getPlace();
    let dLat = addressObjectDest.geometry.location.lat();
    let dLng = addressObjectDest.geometry.location.lng();
    let dLatLng = {lat: dLat, lng: dLng};
    let address= addressObjectDest.address_components.filter(address =>{
      if(address.types[0] === 'administrative_area_level_1'){
        return address;
      }else{
        return null;
      }
    })
    let city = address[0].long_name
    this.setState({
        destQuery: addressObjectDest.formatted_address,
        dLatLng : dLatLng,
        dCity: city
      }, () => {});
  }
  mapStationsCoord = stations =>{
    const allStationCoord = stations.map(station=>{
      return {
        lat: station.sta_latitude,
        lng: station.sta_longitude
      }
    })
    return allStationCoord;
  }

  getStationFromDistance(){
    const stationCoordinates = this.mapStationsCoord(this.props.stations);
    const dService = new google.maps.DistanceMatrixService();
    dService.getDistanceMatrix({
      origins: stationCoordinates,
      destinations: [this.state.oLatLng],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
    },this.showMinDistance);
  }

  showMinDistance=(response, status)=>{
    if(status!=='OK'){
      alert('an error occured');
    }else{
      let distanceValuesArray= response.rows.map(function(a){
        if(a.elements[0].status !== 'OK'){
          return null;
        }else{
          return a.elements[0].distance.value/1000;
        }
      })
        const minDistanceFromStation = Math.min.apply(Math,distanceValuesArray.filter((val)=>val));
        this.setState({
          startingDist: minDistanceFromStation
        }, ()=>{})
      // var originList = response.originAddresses;
      // var destinationList = response.destinationAddresses;
      // console.log(originList);
      // console.log(destinationList);
  }}

  getFromToDistance(callback){
    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [this.state.oLatLng],
      destinations: [this.state.dLatLng],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
    }, this.showDistance);
  }

  showDistance=(response, status)=>{
    let distance = null;
    if(status !== 'OK'){
      alert('an error occured');
    } else {
      const temp = (response.rows[0].elements[0].distance.value);
      distance = temp/1000;
    }
    this.setState({
      actualDist: distance
    }, ()=>{})
  }

  calculateFee(prices, actualDist, startingDist){
    const startingFee = Number(prices[0]);
    const perKmFee = Number(prices[1]);
    const stationStartFee = Number(prices[2]);
    const Fee = (startingFee +(actualDist*perKmFee)+(startingDist*stationStartFee)).toFixed(2);
    return Fee;
  }


  getFee(){ //to, from, stations must be object that have properties like lat, lnd, city
    const originQuery = this.state.originQuery;
    const destQuery = this.state.destQuery;
    const sameCity = this.isSameCity(this.state.oCity, this.state.dCity);
    const dService = new google.maps.DistanceMatrixService();

   getDistance(dService, originQuery, destQuery, [this.props.providersProfile.providerProfileInformation], this.props.service.service_id, sameCity)
        .then(res => {
          this.setState({
            fee: res
          });
        })
        .catch(err => {
          this.setState({
            fee: err[0]
          });
        });
     }

  alertRender() {
    if(this.props.isPriceUpdated&&(this.props.providersProfile.updatedPriceID===this.props.service.ps_id)){
      return(

        <Alert variant="success" >
                  <p>
                  Bilgileriniz başarıyla güncellenmiştir.
                  </p>
        </Alert>
      )
    }
    if(this.props.isPriceUpdatedFail&&(this.props.providersProfile.updatedPriceID===this.props.priceUpdateCheck.provider_service.ps_id)){
      return(
        <Alert variant="danger">
            <p>
              Bilgileriniz güncellenemedi. Lütfen tekrar deneyiniz.
            </p>
          </Alert>
      )
   }
}

  render(){
 return(

      <div className = "pricingDiv">
    <h2 style = {{color : "#F68A25"}}>{this.props.service.service.s_name}</h2>
        <Row>
          <Col md = {{span : 8}}>
            <Row className = "pricingRow">
              <Col className = "labelStyle" md = {{offset : 3, span :3}}>Açılış Ücreti</Col>
              <Col className = "labelStyle" md = {{span :3}}>Km Ücreti</Col>
              <Col className = "labelStyle" md = {{span:3}}>İstasyon ile Başlangıç Arası KM Ücreti*</Col>
            </Row>
            <Formik
            initialValues={{
              //out = şehirdışı, in = şehiriçi
              ps_in_fixed_price: this.props.service.ps_in_fixed_price,
              ps_in_actual_distance_price: this.props.service.ps_in_actual_distance_price,
              ps_in_starting_distance_price: this.props.service.ps_in_starting_distance_price,
              ps_out_fixed_price: this.props.service.ps_out_fixed_price,
              ps_out_actual_distance_price: this.props.service.ps_out_actual_distance_price,
              ps_out_starting_distance_price: this.props.service.ps_out_starting_distance_price
            }}

            onSubmit={(fields) => {
            fields.ps_id = this.props.service.ps_id;
            const newPrices = fields;
            this.props.updatePrices(newPrices, this.props.service.ps_id);
            }}
            render={({errors})=>(
              <Form>
                 <Row className = "pricingRow">
                    <Col className = "labelStyle" md ={{span :3}}>Şehiriçi Tarife</Col>
                    <Col  md = {{span : 3}}><Field name="ps_in_fixed_price" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                    <Col  md = {{span : 3}}><Field name="ps_in_actual_distance_price" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                    <Col  md = {{span : 3}}><Field name="ps_in_starting_distance_price"className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                  </Row>
                  <Row className = "pricingRow">
                     <Col className = "labelStyle" md ={{span :3}}>Şehirdışı Tarife</Col>
                      <Col  md = {{span : 3}}><Field name="ps_out_fixed_price" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                      <Col  md = {{span : 3}}><Field name="ps_out_actual_distance_price" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                      <Col  md = {{span : 3}}><Field name="ps_out_starting_distance_price" className="form-control pricingForm" type="text" placeholder="Tutar Giriniz" /></Col>
                  </Row>
                  <div style={{marginTop:'2%'}}>
                  {this.alertRender()}
                  </div>
              <Button type="submit" className="update-button"  onSubmit = {this.updatePrices}> GÜNCELLE </Button>
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
          <Col  md = {{span : 4}}><input className ="form-control pricingForm" id={this.props.service.service_id+"org"}  placeholder="Nereden..." /></Col>
          {this.destId}
          <Col  md = {{span : 4}}><input className ="form-control pricingForm" id={this.props.service.service_id+"des"}  placeholder="Nereye..." /></Col>
          <Col  md = {{span : 1}}><h1>=</h1></Col> {/*H1 OLMAMALIIIIIII*/}
          <Col  md = {{span : 3}}><input className ="priceCalculator" disabled  placeholder={Math.round(this.state.fee) + ' TL'}/></Col>
          <Button type="button" className="get-distance ml-auto" onClick={()=>this.getFee()}>Hesapla</Button>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  stations: state.stationInfo.stationsLocationInformation,
  priceUpdateCheck : state.business.providerProfile.providerProfileInformation,
  isPriceUpdated:state.business.providerProfile.isPriceUpdated,
  isPriceUpdatedFail: state.business.providerProfile.isPriceUpdatedFail,
  providersProfile: state.business.providerProfile
})
export default connect(mapStateToProps, {updatePrices, providerProfile, resetPriceComponent, getDistance})(PricingComponent);
