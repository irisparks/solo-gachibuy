const groupReducer = (state = [], action) => {
    console.log('inget')
    switch (action.type) {
      case 'SET_GROUP':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default groupReducer;
  