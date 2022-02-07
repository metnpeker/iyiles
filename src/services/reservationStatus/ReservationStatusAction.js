import API from '../../api.js';
import {  CAROUSEL_PROVIDER, CAROUSEL_PROVIDER_READY, RESERVATION_DATA_LOADING, RESERVATION_DATA} from '../types';

export const getProviderCarousel = () => dispatch => {
  dispatch ({ type: CAROUSEL_PROVIDER_READY });
  API.get('providers', {
  params: {
    limit: 5
  }}) //sadece providers demek yeterli değil benzer firmalar çıkmalı
  .then(res =>{
    dispatch ({
      type: CAROUSEL_PROVIDER,
      payload: res.data.data
    });
  })
  .catch(err => {

  })
}

export const reservationResultData = (appointmentId) => dispatch => {
  dispatch({
    type: RESERVATION_DATA_LOADING
  })
    API.get('appointments/'+appointmentId)
    .then(res => {

      dispatch({
        type: RESERVATION_DATA,
        payload: res.data.data
      });
    })
    .catch(err => {

    })
  }
