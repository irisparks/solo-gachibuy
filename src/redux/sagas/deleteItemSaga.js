import axios from 'axios';
import { put } from 'redux-saga/effects';

function* deleteItemSaga(action) {
  console.log('in deleteItemSaga', action.payload.setId)
  try {
    yield axios.delete(`/api/item/${action.payload.item}`)
    yield put({ type: "GET_ITEM", payload: action.payload.setId});
    // {id: action.payload}
  } catch (error) {
    console.log('delete item request failed', error);
  }
}

export default deleteItemSaga;
