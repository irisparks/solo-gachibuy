import axios from 'axios';
import { put } from 'redux-saga/effects';

function* deleteListSaga(action) {
  console.log('in deleteListSaga', action.payload)
    try {
      const list =  yield axios.delete(`/api/list/${action.payload}`)
        yield put({type:"GET_LIST", payload: list});
        // {id: action.payload}
    } catch (error) {
      console.log('delete item request failed', error);
    }
  }

  export default deleteListSaga;
  