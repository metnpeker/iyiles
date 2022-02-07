import {COMMENT_LIST, COMMENT_LIST_READY } from '../types';

const rateCommentData = {
  commentListInfo : []
}
export default function (state = rateCommentData, action){
 switch(action.type){
   case COMMENT_LIST_READY:
    return {
      ...state,
      loading: true };
   case COMMENT_LIST:
    return{
      ...state,
      commentListInfo: action.payload,
      loading: false
    };
   default:
    return state;
   }
 }
