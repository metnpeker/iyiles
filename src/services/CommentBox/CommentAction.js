import API from '../../api.js';

import {ADD_NEW_COMMENT, ADD_NEW_COMMENT_FAIL, RESET_COMMENT_BOX} from '../types';

export const resetCommentBox = () => dispatch =>{
  dispatch({
    type: RESET_COMMENT_BOX
  });
}
export const addNewComment = newCommentForm => dispatch => {
  API.post('comments', newCommentForm)
    .then(res=>{

      dispatch({
          type: ADD_NEW_COMMENT
      });
    })
    .catch(err=>{
      dispatch({
          type: ADD_NEW_COMMENT_FAIL
      });
    })
}
