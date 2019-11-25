import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerNav from '../DrawerNav/DrawerNav'
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button, Chip } from '@material-ui/core'

class ListView extends Component {


  componentDidMount() {
    this.props.dispatch({ type: "GET_LIST", payload: this.props.findGroupReducer });
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
      edit: false
    })

  };
  handleChangeFor = (property, event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value
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
              )} /></h1>

              <Button color="primary"
              onClick={() => this.saveButton(this.props.findGroupReducer.name)}
              >Save</Button></>
          }
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
          < p > Your ID is: {this.props.user.id} </p>
        </div>

        <pre> {JSON.stringify(this.props.findGroupReducer, null, 2)}</pre>
        <pre> {JSON.stringify(this.state, null, 2)}</pre>

      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(ListView);


