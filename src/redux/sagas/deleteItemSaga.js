import axios from 'axios';
import { put } from 'redux-saga/effects';

function* deleteItemSaga(action) {
    try {
        yield axios.delete(`/api/item/${action.payload}`)
        yield put({type:"GET_ITEM"});
    } catch (error) {
      console.log('delete item request failed', error);
    }
  }

  export default deleteItemSaga;
  