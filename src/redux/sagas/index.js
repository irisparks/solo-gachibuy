import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import groupSaga from './groupSaga';
import postGroupSaga from './postGroupSaga';
import getListSaga from './getListSaga';
import getItemSaga from './getItemSaga';
import postItemSaga from './postItemSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('GET_GROUP',groupSaga);
  yield takeEvery('ADD_GROUP',postGroupSaga);
  yield takeEvery('GET_LIST',getListSaga);
  yield takeEvery('GET_ITEM',getItemSaga);
  yield takeEvery('ADD_ITEM',postItemSaga);



  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
