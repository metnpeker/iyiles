import API from '../../api.js';
import {SEND_FILTER_DATA,GET_FILTER_PROVIDERS,FILTER_PROVIDERS,FILTER_PROVIDERS_FAIL,GET_SERVICES,GET_SERVICES_FAIL,UPDATE_PROVIDERS_PRICE  } from '../types';

export const sendFilterAddressData = (userFilterData) => dispatch => {
  dispatch({type:SEND_FILTER_DATA, payload: userFilterData});
}

export const sortProviders = (providersData, sorting) => dispatch => {
  switch (sorting) {
    // En düşük fiyat
    case '0':
      providersData = providersData.sort((a,b) =>
        a.totalPrice === null || b.totalPrice === null ? 0:
          a.totalPrice<b.totalPrice ? -1 : 1,
      );
    break;
    //En yüksek fiyat
    case '1':
      providersData = providersData.sort((a,b) =>
        a.totalPrice === null || b.totalPrice === null ? 0:
          a.totalPrice>b.totalPrice ? -1 : 1,
      );
    break;
    // Genel Puan
    case '2':
      providersData = providersData.sort((a,b) =>
        !(a.provider_rate.length>0 && b.provider_rate.length>0)  ? 0:
          a.provider_rate[0].avarage_rate > b.provider_rate[0].avarage_rate ? -1 : 1,
      );
    break;
    // Zamanlama
    case '3':
      providersData = providersData.sort((a,b) =>
        !(a.avarage_rate.length>0 && b.avarage_rate.length>0)  ? 0:
          a.avarage_rate[0].avarage_rate > b.avarage_rate[0].avarage_rate ? -1 : 1,
      );
    break;
    // İlgi
    case '4':
      providersData = providersData.sort((a,b) =>
        !(a.avarage_rate.length>1 && b.avarage_rate.length>1)  ? 0:
          a.avarage_rate[1].avarage_rate > b.avarage_rate[1].avarage_rate ? -1 : 1,
      );
    break;
    //Temizlik
    case '5':
      providersData = providersData.sort((a,b) =>
        !(a.avarage_rate.length>2 && b.avarage_rate.length>2)  ? 0:
          a.avarage_rate[2].avarage_rate < b.avarage_rate[2].avarage_rate ? -1 : 1,
      );
    break;
    // Yorum sayısı
    case '6':
      providersData = providersData.sort((a,b) =>
        !(a.total_comment.length>0 && b.total_comment.length>0)  ? 0:
          a.total_comment[0].total_comment > b.total_comment[0].total_comment ? -1 : 1,
      );
    break;
    default :
      providersData = providersData.sort((a,b) =>
        a.totalPrice === null || b.totalPrice === null ? 0:
          a.totalPrice<b.totalPrice ? -1 : 1,
      );
    break;
  }

  dispatch({
    type: UPDATE_PROVIDERS_PRICE,
    payload: providersData,
  });
}

export const filterProviders = (starting_point,service) => dispatch => {
 dispatch({type: GET_FILTER_PROVIDERS});

 API.get('providers',{
   params:{
     start_point: starting_point,
     service_type: service
   }
 })
    .then(res => {
      dispatch({
        type: FILTER_PROVIDERS,
        payload: res.data.data
      });
    })
    .catch(err =>{
      dispatch({type: FILTER_PROVIDERS_FAIL});
    })
}

export const getServices = () => dispatch => {
  API.get('services') //hastane, adres, ambulans bilgilerinin olduğu bir apiden çekmem lazım
    .then(res => {
      dispatch({
        type: GET_SERVICES,
        payload: res.data.data
      });
    })
    .catch(err =>{
      dispatch({
        type: GET_SERVICES_FAIL ,
      });
    })
}
export const updateProvidersPrice = (pricesData) => dispatch =>  {
    dispatch({
      type: UPDATE_PROVIDERS_PRICE,
      payload: pricesData,
    });
};
