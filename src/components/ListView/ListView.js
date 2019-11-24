import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';

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

  onDelete = (list) => {
    console.log('clicked delete list!');
    // Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.value) {
    //       Swal.fire(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //       )
    //     }
    //   })    
    this.props.dispatch({ type: 'DELETE_LIST', payload: list })
  }

  onTwoDispatches = (list) => {
    this.onListClick();
    console.log('in two dipsatches');
    this.onDelete();
  }
  render() {
    return (
      <>
        <div>
          <DrawerNav />
          <Button onClick={this.onBack} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>

          <h1>GROUP NAME:{this.props.findGroupReducer.name}</h1>
          <Button onClick={this.onCreate} startIcon={<CreateIcon />} > Create New List</Button>

          {/* <TextField onSubmit={this.onCreate}
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
          </TextField> */}

          {/* map function to get all my lists */}
          <div><h1>Lists</h1></div>
          {this.props.listReducer.map((list, i) =>
            <>
              <DeleteIcon onClick={(list) => this.onTwoDispatches(list.id)} color="primary"></DeleteIcon>

              <Button onClick={() => this.onListClick(list)}> {list.list_name} </Button>
            </>)}
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


