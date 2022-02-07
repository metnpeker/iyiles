import API from '../../../api.js';
import {PROVIDER_PROFILE_READY, PROVIDER_PROFILE, RESET_PRICE_COMPONENT, UPDATE_PROVIDER_PROFILE,UPDATE_PROVIDER_PROFILE_FAIL,UPDATE_PRICE, UPDATE_PRICE_FAIL} from '../types';

export const providerProfile = () => dispatch => {

  dispatch({type : PROVIDER_PROFILE_READY});
  API.get('providers/business' )
    .then(res => {
      dispatch({
        type : PROVIDER_PROFILE,
        payload : res.data.data,
      });
    })
    .catch(err => {

   })
}
export const resetPriceComponent = () => dispatch =>{
      dispatch({
        type: RESET_PRICE_COMPONENT
      });
}
export const updateProviderProfile = updateProviderProfileData => dispatch => {

  const id = updateProviderProfileData.pro_id;
  API.put('providers/'+id, updateProviderProfileData)
  .then(res=>{
    dispatch({
      type: UPDATE_PROVIDER_PROFILE,
      payload: res.data.data
    });
  })
  .catch(err => {
    dispatch ({
      type: UPDATE_PROVIDER_PROFILE_FAIL
    });
  })
}
  export const updatePrices = (newPrices,id) => dispatch => {
    API.put('providers/services/'+id, newPrices)
    .then(res=>{
      dispatch({
      type: UPDATE_PRICE,
      payload:res.data.data
    });
        providerProfile()
    })
    .catch(err => {
      dispatch ({
        type: UPDATE_PRICE_FAIL
      });
        providerProfile()
    })
}
