import axios from 'axios';

export default axios.create({
  baseURL:  'https://api.iyiles.com/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

});
