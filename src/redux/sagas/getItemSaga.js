import { put } from 'redux-saga/effects';
import axios from 'axios';


function* getItemSaga() {
    try {
        const list = yield axios.get("/api/item");
        yield put({type:"SET_ITEM", payload: list.data});
    } catch (error) {
      console.log('item get request failed', error);
    }
  }

  export default getItemSaga;
  