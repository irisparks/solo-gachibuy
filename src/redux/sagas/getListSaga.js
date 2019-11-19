import { put } from 'redux-saga/effects';
import axios from 'axios';


function* getListSaga() {
    try {
        const list = yield axios.get("/api/list");
        yield put({type:"SET_LIST", payload: list.data});
    } catch (error) {
      console.log('List get request failed', error);
    }
  }

  export default getListSaga;
  