import axios from 'axios';
import { put } from 'redux-saga/effects';

function* deleteGroupSaga(action) {
  console.log('in deleteGroupSaga', action.payload)
    try {
      const list =  yield axios.delete(`/api/group/${action.payload}`)
        yield put({type:"GET_GROUP", payload: {id: action.payload}});
    } catch (error) {
      console.log('delete group request failed', error);
    }
  }

  export default deleteGroupSaga;
  