import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltDown);

export default class SidebarAppointment extends Component {
  constructor(props){
      super(props)
      console.log(this.props.seen);
  }

    render() {
        return (
            <div className={this.props.seen ? "single-appointment-container border--orange" :"single-appointment-container-not-seen border--orange" }
                onClick={ this.props.clicked}
            >
                <div>
                    <p>{this.props.service}</p>
                    <p>{this.props.status}</p>
                </div>
                <div>
                    <p>{this.props.from}</p>
                    <FontAwesomeIcon icon="long-arrow-alt-down" />
                    <p>{this.props.to}</p>
                </div>

                <div>
                    <p>{this.props.date}</p>
                </div>
            </div>

        )
    }
}
