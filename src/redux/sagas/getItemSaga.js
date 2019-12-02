import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getItemSaga(action) {
    try {
        console.log('inget itemsaga action:', action)
        const item = yield axios.get(`/api/item/${action.payload}`);
        yield put ({ type: 'SET_ITEM', payload: item.data})
    } catch(error) {
        console.log('error fetching item', error)
    }
  }





  export default getItemSaga;
  