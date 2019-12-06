import { put } from 'redux-saga/effects';
import axios from 'axios';

function* findUsersSaga(action) {
    try {
        console.log('in findUsersSaga action:', action.payload)
        const users = yield axios.get(`/api/search_users/`);
        yield put ({ type: 'SET_USERS', payload: users.data})
    } catch(error) {
        console.log('error fetching users for group', error)
    }
  }

  export default findUsersSaga;
  