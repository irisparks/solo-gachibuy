import { put } from 'redux-saga/effects';
import axios from 'axios';


function* postListSaga(action) {
  console.log('in post list saga')
    try {
        yield axios.post("/api/list", action.payload)
        yield put({type:"GET_LIST", payload: {id: action.payload.setId } }); //to match get
    } catch (error) {
      console.log('Add list request failed', error);
    }
  }

  export default postListSaga;
  