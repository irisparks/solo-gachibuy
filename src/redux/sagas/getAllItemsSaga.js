import { put } from 'redux-saga/effects';
import axios from 'axios';



  function* getAllItemsSaga() {
    try {
        const item = yield axios.get(`/api/item/`);
        yield put ({ type: 'SET_ITEM', payload: item.data})
    } catch(error) {
        console.log('error fetching item', error)
    }
  }


  export default getAllItemsSaga;
  