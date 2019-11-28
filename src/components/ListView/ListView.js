import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerNav from '../DrawerNav/DrawerNav'
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Card, CardActions, CardContent, List, TextField, Button, Chip, Typography, Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import Swal from 'sweetalert2';
import StarIcon from '@material-ui/icons/Star';
import ListViewStyle from './ListViewStyle'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
class ListView extends Component {

  componentDidMount() {
    this.onGet();
  }

  onGet = () => {
    console.log('in get list???/');
    this.props.dispatch({ type: "GET_LIST", payload: this.props.findGroupReducer.group_id });

  }

  state = {
    groupName: '',
    img_src: '',
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
    this.props.dispatch({ type: "EDIT_GROUP", payload: { id: this.props.findGroupReducer.group_id, groupName: this.state.groupName, img_src: this.state.img_src } })
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
          <Button  style={{ fontWeight: 'bold' }} onClick={this.onBack} variant="contained" size="small" startIcon={<ArrowBackIosIcon />} color="primary"  style={{ fontWeight: 'bold' }}>BACK</Button>
          <Button  style={{ fontWeight: 'bold' }} onClick={this.onEdit} variant="contained" size="small" startIcon={<EditIcon />} color="primary" ><Typography variant="button" style={{ fontWeight: 'bold' 
      }}
      >edit group name</Typography></Button>
          <Button   style={{ fontWeight: 'bold' }} onClick={(group) => this.onDelete(group)} variant="contained" size="small" startIcon={<DeleteIcon />} color="primary" style={{ fontWeight: 'bold' }} >DELETE GROUP</Button>

          {/* conditional rendering for edit group name */}
          {this.state.edit ?
            <Typography variant="h6"> GROUP NAME:{this.props.findGroupReducer.name}</Typography> : <>  <Typography variant="h6" >EDIT NAME: </Typography><Autocomplete
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
              )}
            />
              <Typography variant="h6"> EDIT IMAGE: </Typography><Autocomplete
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
                    label="Update Image"
                    margin="normal"
                    onChange={(event) => this.handleChangeFor("img_src", event)}
                    value={this.state.img_src}
                  />
                )}
              />

              <Button style={{ fontWeight: 'bold' }} variant="contained" color="primary" onClick={() => this.saveButton(this.props.findGroupReducer.name)}>Save</Button></>}
          <Fab color="primary" aria-label="add" onClick={this.onCreate}>
          <AddIcon />
        </Fab>

        {/* map function to get all my lists */}
        <Card style={styles.card}>

          <div><h1> <Typography style={styles.title} Lists /></h1> </div>

          {this.props.listReducer.map((list, i) =>
            <>

              <CardContent>
                <Typography style={styles.title} color="textSecondary" gutterBottom>
                  {list.list_name}
                </Typography>
                <List onClick={() => this.onListClick(list)} >
                  <ListItem button>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={list.list_name} />
                  </ListItem>
                </List>
              </CardContent>
              {/* <Card onClick={() => this.onListClick(list)} style={styles.card}>
                <CardContent>
                  <Typography style={styles.title} color="textSecondary" gutterBottom>
                    {list.list_name}
                  </Typography>
                </CardContent>
              </Card> */}

              {/* <DeleteIcon onClick={(list) => this.onDelete(list)} color="primary"></DeleteIcon> */}
            </>)}
        </Card>

        < p > Your ID is: {this.props.user.id} </p>
      </div>

      </>
    )
  }
}
{/* <ListViewStyle list={list}/> */ }
{/* <List  >
  <ListItem button>
    <ListItemIcon>
      <StarIcon />
    </ListItemIcon>
    <ListItemText primary={list.list_name} />
  </ListItem>
</List> */}


const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(ListView);


