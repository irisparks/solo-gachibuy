import axios from 'axios';
import { put } from 'redux-saga/effects';

function* editListSaga(action) {
    console.log('in edit list saga',action.payload)
    try {
        yield axios.put(`/api/list/${action.payload.id}`, action.payload)
        yield put({type:"GET_LIST", payload: {id: action.payload.id}});
    } catch (error) {
      console.log('Edit item request failed', error);
    }
  }

  export default editListSaga;
  