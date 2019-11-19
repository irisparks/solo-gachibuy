import { put } from 'redux-saga/effects';
import axios from 'axios';


function* postItemSaga(action) {
  console.log('in post item saga')
    try {
        yield axios.post("/api/item", action.payload)
        yield put({type:"GET_ITEM"});
    } catch (error) {
      console.log('Add item request failed', error);
    }
  }

  export default postItemSaga;
  