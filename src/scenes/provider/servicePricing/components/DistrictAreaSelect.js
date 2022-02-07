import React from 'react';
import {connect} from 'react-redux'
import {Col} from 'react-bootstrap';

import Select from 'react-select';
import '../servicePricing.css';


class DistrictAreaSelect extends React.Component {



  render(){
    return(
      <div>
      <Col md = {{offset : 4, span :6}}>
      <Select
        isMulti
        options={this.props.towns.cities[0].town.map((data,id) =>{
          return {  id:data.town_id, value:data.town_name, label:data.town_name }
          })}
        className="districtSelectBox"
        placeholder="Hizmet Verilen İlçeleri Seçiniz"
      />
      </Col>
      </div>

    )
  }
}
const mapStateToProps = state => ({
towns : state.business.providerProfile.providerProfileInformation
})
export default connect (mapStateToProps,{})(DistrictAreaSelect);
