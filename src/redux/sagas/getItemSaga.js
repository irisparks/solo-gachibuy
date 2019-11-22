import { put } from 'redux-saga/effects';
import axios from 'axios';


// function* getItemSaga(action) {
//     try {
//         console.log('in get item saga', action.payload);
//         const list = yield axios.get(`/api/item/${action.payload.id}`);
//         yield put({type:"SET_ITEM", payload: list.data});
//     } catch (error) {
//       console.log('item get request failed', error);
//     }
//   }

function* getItemSaga(action) {
    try {
        const item = yield axios.get(`/api/item/${action.payload.id}`);
        yield put ({ type: 'SET_ITEM', payload: item.data})
    } catch(error) {
        console.log('error fetching item', error)
    }
  }
  export default getItemSaga;
  