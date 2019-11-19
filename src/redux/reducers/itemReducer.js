const itemReducer = (state = [], action) => {
    console.log('in get groupReducer')
    switch (action.type) {
      case 'SET_ITEM':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default itemReducer;
  