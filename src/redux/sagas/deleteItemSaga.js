import axios from 'axios';
import { put } from 'redux-saga/effects';

function* deleteItemSaga(action) {
    try {
      const item =  yield axios.delete(`/api/item/${action.payload}`)
        yield put({type:"GET_ITEM", payload: item.data});
    } catch (error) {
      console.log('delete item request failed', error);
    }
  }

  export default deleteItemSaga;
  