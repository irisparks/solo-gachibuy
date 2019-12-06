import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getGroupSaga from './getGroupSaga';
import postGroupSaga from './postGroupSaga';
import getListSaga from './getListSaga';
import getItemSaga from './getItemSaga';
import postItemSaga from './postItemSaga';
import deleteItemSaga from './deleteItemSaga';
import editItemSaga from './editItemSaga';
import postListSaga from './postListSaga';
import deleteListSaga from './deleteListSaga';
import editListSaga from './editListSaga';
import editGroupSaga from './editGroupSaga';
import deleteGroupSaga from './deleteGroupSaga';
import editItemCompleteItemSaga from './editItemCompleteItemSaga';
import findUsersSaga from './findUsersSaga';



// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('GET_GROUP',getGroupSaga);
  yield takeEvery('ADD_GROUP',postGroupSaga);
  yield takeEvery('DELETE_GROUP',deleteGroupSaga);
  yield takeEvery('EDIT_GROUP',editGroupSaga);

  yield takeEvery('GET_LIST',getListSaga);
  yield takeEvery('ADD_LIST',postListSaga);
  yield takeEvery('DELETE_LIST',deleteListSaga);
  yield takeEvery('EDIT_LIST',editListSaga);

  yield takeEvery('GET_ITEM',getItemSaga);
  yield takeEvery('ADD_ITEM',postItemSaga);
  yield takeEvery('DELETE_ITEM',deleteItemSaga);
  yield takeEvery('EDIT_ITEM',editItemSaga);
  yield takeEvery('COMPLETE_ITEM',  editItemCompleteItemSaga);

  yield takeEvery('FIND_USERS',findUsersSaga);

  


  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
