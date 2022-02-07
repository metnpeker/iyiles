import { INFO_CARD, INFO_CARD_READY, COMPANY_DETAIL, COMPANY_DETAIL_READY, COMMENT_CAROUSEL_READY, COMMENT_CAROUSEL} from '../types';

const companyData = {
  loading : false,
  company : {},
  commentData: {}
};

export default function (state = companyData, action){
  switch(action.type){
    case COMPANY_DETAIL_READY:
      return {
        ...state,
        loading : true
      }
    case COMPANY_DETAIL:
      return {
        ...state,
        company: action.payload,
        loading : false
      };
      case COMMENT_CAROUSEL_READY:
        return { ...state,
           loading:true };
      case COMMENT_CAROUSEL:
        return {
          ...state,
          commentData: action.payload,
          loading:false };
      case INFO_CARD_READY:
           return { ...state,
           loading:true };
      case INFO_CARD:
            return {
            ...state,
            commentData : action.payload,
            loading:false };
    default:
     return state;
  }
}
