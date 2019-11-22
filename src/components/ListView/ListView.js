import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import ListofList from '../ListofList/ListofList'
import Item from '../Item/Item'

class ListView extends Component {

  componentDidMount() {
    this.onGet();
  }

  //function to display all of my lists on listview page

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

  onListClick = (list) => {
    console.log('clicked on a list');
    this.props.dispatch({ type: "FIND_LIST", payload: list })
    this.props.history.push(`/item`)

  }

  // onListClickforItems = (item) => {
  //   console.log('clicked on a list');
  //   this.props.dispatch({ type: "GET_ITEM", payload: item })
  // }
  // get for groups and put in componenet did mount
  render() {
    return (
      <>
        <div>
          <DrawerNav />
          <h1>GROUP NAME:{this.props.findGroupReducer.name}</h1>
          <CreateIcon onClick={this.onCreate} />

          <TextField onSubmit={this.onCreate}
            id="standard"
            label="Add List"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddCircleOutlineIcon color="primary" />
                </InputAdornment>
              )
            }}
          >
          </TextField>
          <Button onClick={this.onBack} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>
{/* map function to get all my lists */}
          <div><h1>Lists</h1></div>
          {this.props.listReducer.map((list, i) =>
            <>
          <Button onClick={() => this.onListClick(list)}> {list.list_name} </Button> </>)}
          
         <Item />
            < p > Your ID is: {this.props.user.id} </p>
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


