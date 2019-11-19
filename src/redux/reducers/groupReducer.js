const groupReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GROUP':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default groupReducer;
  