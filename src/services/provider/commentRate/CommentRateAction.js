import API from '../../../api.js';

import {COMMENT_LIST_READY, COMMENT_LIST} from '../types';

export const getCommentList = () => dispatch => {
  dispatch ({type: COMMENT_LIST_READY});
  API.get('comments')
  .then(res=>{
    dispatch({
      type: COMMENT_LIST,
      payload: res.data.data
    });
  })
  .catch(err => {
  })
}
