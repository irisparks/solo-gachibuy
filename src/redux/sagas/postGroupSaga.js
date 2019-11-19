import { put } from 'redux-saga/effects';
import axios from 'axios';


function* postGroupSaga(action) {
  console.log('inpost')
    try {
        yield axios.post("/api/group", action.payload)
        yield put({type:"GET_GROUP"});
    } catch (error) {
      console.log('Add group request failed', error);
    }
  }

  export default postGroupSaga;
  