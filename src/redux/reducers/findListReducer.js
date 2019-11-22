// list that was clicked on
const findListReducer = (state = {}, action) => {
    // console.log(action);
  if(action.type === "FIND_LIST"){
    return action.payload
  } else {
    return state;
  }
}

export default findListReducer;
