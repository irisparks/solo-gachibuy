// group that was clicked on
const findGroupReducer = (state = {}, action) => {
    // console.log(action);
  if(action.type === "FIND_GROUP"){
    return action.payload
  } else {
    return state;
  }
}

export default findGroupReducer;
