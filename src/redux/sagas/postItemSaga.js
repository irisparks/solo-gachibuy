import { put } from 'redux-saga/effects';
import axios from 'axios';


function* postItemSaga(action) {
  console.log('in post item saga', action.payload.setId)
    try {
        yield axios.post("/api/item", action.payload)
        yield put({type:"GET_ITEM", payload: {id: action.payload.setId } }); //to match get
    } catch (error) {
      console.log('Add item request failed', error);
    }
  }

  export default postItemSaga;
  