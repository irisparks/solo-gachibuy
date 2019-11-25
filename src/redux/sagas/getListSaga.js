import { put } from 'redux-saga/effects';
import axios from 'axios';


function* getListSaga(action) {
    try {
        console.log("in get list saga", action);
       const item = yield axios.get(`/api/list/${action.payload}`);
        yield put({ type: "SET_LIST", payload: item.data});
    } catch (error) {
        console.log('List get request failed', error);
    }
}


export default getListSaga;

