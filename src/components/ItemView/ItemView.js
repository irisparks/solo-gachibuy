import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import ListofList from '../ListofList/ListofList'

class ListView extends Component {

  componentDidMount() {
    this.onGet();
  }

  onGet = () => {
    console.log('PROPS', this.props)
    this.props.dispatch({ type: "GET_LIST", payload: this.props.findGroupReducer });
  }

  onBack = () => {
    this.props.history.push('/home')
  }

  onCreate = () => {
    console.log('create list hit');
    this.props.history.push('/Listform')
  }

//   onGetItem = () => {
//     console.log('clicked on a list');
//     this.props.dispatch({ type: "GET_ITEM", payload: this.props.findItemReducer })
//     // this.props.history.push('/item')
//   }

  // get for groups and put in componenet did mount
  render() {
    return (
      <>
        <div>
     
     IN ITEMVIEW
      </div>
      <pre> {JSON.stringify(this.props.findGroupReducer, null, 2)}</pre>
      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(ListView);


