import React, { Component } from 'react'
import { Button} from 'react-bootstrap'



const style = {
  backgroundColor: '#f68b25'
}
export default class ButtonCall extends Component {
  render() {
    return (
      
        <Button style={style} className="search-result-button search-result-button--call ">Çağır</Button>
      
    )
  }
}
