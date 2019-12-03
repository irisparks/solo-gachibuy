import axios from 'axios';
import { put } from 'redux-saga/effects';

function* editItemCompleteItemSaga(action) {
    console.log('in edit itemsaga',action.payload)
    try {
        yield axios.put(`/api/item/complete/${action.payload.id}`, action.payload)
        yield put({type:"GET_ITEM", payload: {id: action.payload.id, list_name: action.payload.list_name}});
    } catch (error) {
      console.log('Edit item request failed', error);
    }
  }

  export default editItemCompleteItemSaga;
  