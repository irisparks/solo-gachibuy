// list of items that was clicked on
const findItemReducer = (state = {}, action) => {
    // console.log(action);
  if(action.type === "FIND_ITEM"){
    return action.payload
  } else {
    return state;
  }
}

export default findItemReducer;
