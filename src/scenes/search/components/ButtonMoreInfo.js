import React, { Component } from 'react'
import { Button} from 'react-bootstrap'

const style = {
  backgroundColor: '#bfbfbf'
}
export default class ButtonMoreInfo extends Component {
  render() {
    return (
        <Button style={style} className="search-result-button search-result-button--more ">Daha Fazla Bilgi Al</Button>
    )
  }
}
