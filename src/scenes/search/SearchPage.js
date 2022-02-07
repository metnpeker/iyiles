import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServices,filterProviders } from './../../services/Providers/ProviderAction';
import SearchResults from './components/SearchResults'
import AddressPicker from './components/AddressPicker'
import b2cimage from '../search/components/images/b2cimage.png';
import b2cmobile from '../search/components/images/b2cmobile.png';
import './searchStyle.css';


 class SearchPage extends Component {
   constructor(props){
     super(props)
     this.state = {
       serviceType:'',
       isFiltered: '',
       isLoading: false,
       width: window.innerWidth
     }
     this.props.getServices();
     this.filteredHandler = this.filteredHandler.bind(this);
     this.filterLoadingHandler = this.filterLoadingHandler.bind(this);
   }

  setOptionState = (val, type) => {
    switch(type){
      case 'serviceType':
        this.setState({serviceT: val },
          ()=>{
          });
        break;
      default:
        break;
    }
  }

  filteredHandler(isFiltered){
    this.setState({
      isFiltered: isFiltered
    })
}

filterLoadingHandler(isLoading){
  this.setState({
   isLoading: isLoading
  })
}
//
componentDidUpdate() {
   this.SearchResult();
 }

 SearchResult(){
     return <SearchResults loading={this.state.isLoading}/>;
 }

  handleWindowSizeChange = () =>{
    this.setState({width: window.innerWidth});
  };


  render() {
    const {loading} = this.props.auth;
    const {providersData, servicesData} = this.props.provider;
    const { width } = this.state;
    const isMobile = width <= 800;
    if (loading && !providersData && !servicesData){
      return <p> loading... </p>;
    } else {
      const servicesTypeArray= servicesData.map(service =>({id: service.s_id,name: service.s_name}));
    return (
       <div>
         <div className="header--beige">
      </div>
         <AddressPicker
            serviceTypeOptions={ servicesTypeArray }
            changeOption={this.setOptionState.bind(this)}
            filteredHandler={this.filteredHandler}
            filterLoadingHandler={this.filterLoadingHandler}
         />
         <div className="flex-image">
            {isMobile ? <img style={{ width:'100%'}} className={this.state.isFiltered ? 'no-display': ''} src={b2cmobile} alt='b2cmobile'  />: <img style={{ width:'100%'}} className={this.state.isFiltered ? 'no-display': ''} src={b2cimage} alt='b2cimage'  />}
      </div>
         <div className="flex-container">
         {this.SearchResult()}
              {/*   <InfoCard/> */}
         </div>
      </div>

       )
    }


  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  provider: state.provider
})

export default connect(mapStateToProps, {getServices, filterProviders})(SearchPage)
