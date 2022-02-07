
import React, { Component } from 'react'
import SearchResult from './SearchResult'
import {connect} from 'react-redux';


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'start'
    };
  }
  resultRender(){
      return  (this.props.provider.providersData.map((data, index) => {
        return <SearchResult showPrice={data.totalPrice} key={data.pro_id} data={data} id={data.pro_id} loading={this.props.loading}  />
      }))
  }
  render() {
    return (
      <div className="result-container">
        {this.resultRender()}
      </div>
    )
  }
 }

const mapStateToProps = state => ({
 provider: state.provider,
 userFilterData: state.provider.providersData,
})

export default connect(mapStateToProps, {})(SearchResults)
