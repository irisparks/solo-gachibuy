import axios from 'axios';
import { put } from 'redux-saga/effects';

function* editGroupSaga(action) {
    console.log('in edit group saga',action.payload)
    try {
        yield axios.put(`/api/group/${action.payload.id}`, action.payload)
        yield put({type:"GET_GROUP", payload: {id: action.payload.id}});
    } catch (error) {
      console.log('Edit group request failed', error);
    }
  }

  export default editGroupSaga;
  