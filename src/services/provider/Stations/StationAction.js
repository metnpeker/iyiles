import API from '../../../api.js';
import {STATION_INFORMATION_READY,STATION_INFORMATION,RESET_STATION_BOX, ADD_NEW_STATION,ADD_NEW_STATION_FAIL, UPDATE_STATION, UPDATE_STATION_FAIL} from '../types';

export const stationInformation = () => dispatch => {
  dispatch({type : STATION_INFORMATION_READY});
  API.get('stations')
    .then(res=>{
        dispatch({
          type : STATION_INFORMATION,
          payload : res.data.data,
        });

    })
    .catch(err => {

    })
}
export const resetStationBox = () => dispatch =>{
  dispatch({
    type: RESET_STATION_BOX
  });
}

export const addNewStation = addNewStationData => dispatch => {
  API.post('stations', addNewStationData)
  .then(res=>{
    dispatch({type : ADD_NEW_STATION});

  })
  .catch(err => {
    dispatch({
      type: ADD_NEW_STATION_FAIL
    });
  })
}
export const updateStation = (updateStationData, id) => dispatch => {
  API.put('stations/'+id, updateStationData)
  .then(res=>{
    dispatch({
      type : UPDATE_STATION,
      payload: res.data.data
    });

  })
  .catch(err => {
    dispatch({
      type: UPDATE_STATION_FAIL
    });
  })
}
