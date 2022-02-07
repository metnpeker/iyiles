import { GET_COMMENT, GET_COMMENT_READY } from '../types';

const initialState = {
  loading: false,
  commentsData : {},
};


export default function (state = initialState, action){
  switch(action.type){
    case GET_COMMENT:
      return {
        ...state,
        loading: false,
        commentsData: action.payload
      };
    case GET_COMMENT_READY:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
}
