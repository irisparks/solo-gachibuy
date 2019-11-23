import axios from 'axios';
import { put } from 'redux-saga/effects';

function* deleteItemSaga(action) {
  console.log('in deleteItemSaga', action.payload)
    try {
      const item =  yield axios.delete(`/api/item/${action.payload}`)
        yield put({type:"GET_ITEM", payload: {id: action.payload}});
    } catch (error) {
      console.log('delete item request failed', error);
    }
  }

  export default deleteItemSaga;
  