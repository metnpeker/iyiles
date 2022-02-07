import {ADD_NEW_COMMENT,ADD_NEW_COMMENT_FAIL,RESET_COMMENT_BOX} from '../types';


const initialState = {
  loading: false,
  isCommentFailed : false,
  isCommentSuccess : false,
};

export default function(state = initialState, action) {
 switch (action.type) {
   case RESET_COMMENT_BOX:
    return initialState;

   case ADD_NEW_COMMENT:
     return{
       ...state,
       loading:true,
       isCommentSuccess : true,
       isCommentFailed:false
     };
    case ADD_NEW_COMMENT_FAIL :
      return {
        ...state,
        loading:false,
        isCommentSuccess : false,
        isCommentFailed: true
      }
default:
return state;
  }
}
