import axios from 'axios';
import { put } from 'redux-saga/effects';

function* editItemSaga(action) {
    try {
        yield axios.put(`/api/item/${action.payload.id}`, action.payload)
        yield put({type:"GET_ITEM"});
    } catch (error) {
      console.log('Edit item request failed', error);
    }
  }

  export default editItemSaga;
  