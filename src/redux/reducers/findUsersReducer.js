const findUsersReducer = (state = {}, action) => {
    // console.log(action);
  if(action.type === "SET_USERS"){
    return action.payload
  } else {
    return state;
  }
}

export default findUsersReducer;
