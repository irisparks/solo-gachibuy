const allUsers = (state = [], action) => {
    console.log('in get groupReducer')
    switch (action.type) {
      case 'SET_ALL_USERS':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default allUsers;
  