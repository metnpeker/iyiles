import API from '../../api.js';

import {  COMPANY_DETAIL,COMPANY_DETAIL_READY, COMMENT_CAROUSEL, COMMENT_CAROUSEL_READY} from '../types';

export const ambulanceCompany = (providerId) => dispatch => {

  dispatch ({ type: COMPANY_DETAIL_READY });
  API.get('providers/'+providerId)
    .then(res =>{
      dispatch ({
        type: COMPANY_DETAIL,
        payload: res.data.data
      });
    })
    .catch(err => {
    })
}

export const getCommentCarousel = () => dispatch => {
  dispatch ({ type: COMMENT_CAROUSEL_READY });
  API.get('comments', {
  params: {
    limit: 3
  }})
  .then(res =>{
    dispatch ({
      type: COMMENT_CAROUSEL,
      payload: res.data.data
    });
  })
  .catch(err => {
  })
}
