import { put } from 'redux-saga/effects';
import axios from 'axios';


function* getAllUsersSaga() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
      console.log('hitting get all users saga')
        const allUsers = yield axios.get(`/api/allusers/`, config);
        yield put({type:"SET_ALL_USERS", payload: allUsers.data});
    } catch (error) {
      console.log('Group get request failed', error);
    }
  }

  export default getAllUsersSaga;
  
