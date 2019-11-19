import { put } from 'redux-saga/effects';
import axios from 'axios';


function* groupSaga() {
    try {
        const group = yield axios.get("/api/group");
        yield put({type:"SET_GROUP", payload: group.data});
    } catch (error) {
      console.log('Group get request failed', error);
    }
  }

  export default groupSaga;
  