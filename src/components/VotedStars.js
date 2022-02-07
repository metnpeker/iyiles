import React from 'react';
import Rater from 'react-rater';
import './stars.css';

class VotedStars extends React.Component {

  render() {
    return (
      <Rater total={5} rating = {this.props.rating}  interactive={false}/>
    );
  }
}

export default VotedStars
