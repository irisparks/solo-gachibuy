const listReducer = (state = [], action) => {
    console.log('in get listReducer')
    switch (action.type) {
        case 'SET_LIST':
          return action.payload;
        default:
          return state;
    }
  };
  
  export default listReducer;
  