import API from '../../api.js';

import { GET_COMMENT, GET_COMMENT_READY } from '../types';

export const getHomeComment = () => dispatch => {
   dispatch ({ type: GET_COMMENT_READY });
  API.get('comments/home', {
 params: {
   limit: 5
 }})
  .then(res => {
    dispatch({
      type: GET_COMMENT,
      payload: res.data.data
    });
  })
  .catch(err => {
  })
}
