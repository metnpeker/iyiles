import {RESET_PRICE_COMPONENT, PROVIDER_PROFILE_READY, PROVIDER_PROFILE, UPDATE_PROVIDER_PROFILE,UPDATE_PRICE, UPDATE_PRICE_FAIL, UPDATE_PROVIDER_PROFILE_FAIL} from '../types';

 const providerProfileData = {
   providerProfileInformation: {},
   isPriceUpdated : false,
   isPriceUpdatedFail : false,
   updatedPriceID: null,
   isProfileUpdateSuccess : false,
   isProfileUpdateFail : false

 }
 export default function (state = providerProfileData, action){
   switch(action.type){
     case RESET_PRICE_COMPONENT:
      return {
        ...state,
        isUpdatedSuccess: false,
        isUpdatedFailed: false
      };
     case PROVIDER_PROFILE_READY:
       return {
         ...state,
         loading : true,
         isProfileUpdateSuccess : false,
         isProfileUpdateFail : false
       };
     case PROVIDER_PROFILE:
       return {
         ...state,
         loading : false,
         providerProfileInformation: action.payload,
         isPriceUpdated : false,
         isPriceUpdatedFail : false,
       };
       case UPDATE_PROVIDER_PROFILE :
       return {
           ...state,
           loading : false,
           providerProfileInformation: action.payload,
           isProfileUpdateSuccess: true,
           isProfileUpdateFail: false,
         };
       case UPDATE_PROVIDER_PROFILE_FAIL :
         return {
           ...state,
           loading : false,
           isProfileUpdateSuccess: false,
           isProfileUpdateFail: true,
         };
       case UPDATE_PRICE:
         return {
           ...state,
           loading : false,
           isPriceUpdated : true,
           isPriceUpdatedFail : false,
           updatedPriceID : action.payload.ps_id,
           providerProfileInformation: action.payload
         }
       case UPDATE_PRICE_FAIL:
        return {
          ...state,
          loading : false,
          isPriceUpdated : false,
          isPriceUpdatedFail :true,
          updatedPriceID : action.payload.ps_id
        };
       default:
       return state;
    }
 }
