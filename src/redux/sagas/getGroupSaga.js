import { put } from 'redux-saga/effects';
import axios from 'axios';


function* getGroupSaga() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
      console.log('hitting get group saga with user id')
        const group = yield axios.get(`/api/group/`, config);
        yield put({type:"SET_GROUP", payload: group.data});
    } catch (error) {
      console.log('Group get request failed', error);
    }
  }

  export default getGroupSaga;
  
