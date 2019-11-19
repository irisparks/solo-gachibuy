import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

class Item extends Component {

  componentDidMount() {
    this.props.dispatch({ type: "GET_ITEM" });

  }


  onBack = () => {
    this.props.history.push('/home')
  }

  onCreate = () => {
    console.log('create list hit');
    this.props.history.push('/Listform')
  }

  // get for groups and put in componenet did mount
  render() {
    return (
      <>
        <div>
          {/* <DrawerNav /> */}
          <h1>ITEMS</h1>
          
          {this.props.itemReducer.map((list, i) =>
                    <>
                       <li>{list.item_name}</li> 
                       <button>edit</button>
                       <button>delete</button>

                        </>
                    )}
     
        </div>
        <pre> {JSON.stringify(this.props.itemReducer, null, 2)}</pre>
      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(Item);


