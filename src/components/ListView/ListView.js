import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerNav from '../DrawerNav/DrawerNav'
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button, Chip } from '@material-ui/core'
import Swal from 'sweetalert2';

class ListView extends Component {

  componentDidMount() {
    this.onGet();
  }

  onGet = () => {
    console.log('in get list???/');
    this.props.dispatch({ type: "GET_LIST", payload: this.props.findGroupReducer.group_id});

  }

  state = {
    groupName: '',
    edit: true
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

  onEdit = () => {
    console.log('edit button clicked')
    this.setState({
      ...this.state,
      edit: !this.state.edit
    })
  }
  saveButton = (group) => {
    this.props.dispatch({ type: "EDIT_GROUP", payload: { id: this.props.findGroupReducer.id, groupName: this.state.groupName } })
    this.setState({
      ...this.state,
      edit: true
    })
  };

  handleChangeFor = (property, event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    })
  }


    //function to trigger the delete group route and delete group from database
    onDelete = (group) => {
      console.log('clicked delete group!');
      //add sweet alert to confirm the deletion
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete group!'
      }).then((result) => {
          if (result.value) {
              Swal.fire(
                  'Deleted!',
                  'Your group has been deleted.',
                  'success'
              );
              this.props.dispatch({
                  type: 'DELETE_GROUP', payload: this.props.findGroupReducer.group_id
              })
              this.onBack();
          } else {
              //if cancel do nothing
              Swal.fire(
                  'Cancelled',
                  'Did not delete group!'
              )
          }
      })
  }

  // onDelete = (list) => {
  //   console.log('clicked delete list!');
  //   this.props.dispatch({ type: 'DELETE_LIST', payload: this.props.findListReducer.id })
  // }
  // NEED TO FIGURE OUT HOW TO GET DELETE TO KNOW WHAT LIST IM CLICKING ON?


  render() {
    return (
      <>

        <div>
          <DrawerNav />
          <Button onClick={this.onBack} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>
          <Button onClick={this.onEdit} variant="outlined" size="small" startIcon={<EditIcon />} color="primary" >EDIT GROUP NAME</Button>
          <Button onClick={(group) => this.onDelete(group)} variant="outlined" size="small" startIcon={<DeleteIcon />} color="primary" >DELETE GROUP</Button>

          {/* conditional rendering for edit group name */}
          {this.state.edit ?
            <h1>GROUP NAME:{this.props.findGroupReducer.name}</h1> : <> <h1>EDIT NAME: <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip color="primary" label={option} value={option} {...getTagProps({ index })} />

                ))}
              renderInput={params => (
                <TextField  {...params}
                  variant="outlined"
                  label="Update Group"
                  margin="normal"
                  onChange={(event) => this.handleChangeFor("groupName", event)}
                  value={this.state.groupName}
                />
              )} />

              <Button color="primary" onClick={() => this.saveButton(this.props.findGroupReducer.name)}>Save</Button></h1></>}
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
              <Button onClick={() => this.onListClick(list)}> {list.list_name} </Button>
              {/* <DeleteIcon onClick={(list) => this.onDelete(list)} color="primary"></DeleteIcon> */}
            </>)}
        </div>

      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(ListView);


