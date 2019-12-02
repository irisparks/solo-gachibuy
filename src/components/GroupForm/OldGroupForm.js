import React, { Component } from 'react';
import DrawerNav from '../DrawerNav/DrawerNav'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { Fab, Button, Chip, TextField, Grid, FormLabel, Paper, FormControlLabel } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import AutoComplete from './AutoComplete';
import { Link } from 'react-router-dom';
import CreateGroup from './example';

const styles = {
    fabStyle: {
        margin: 0,
        top: 'auto',
        right: 20,
        left: 'auto',
        position: 'fixed'
    },
    buttonStyle: {
        margin: 14,
        top: 'auto',
        left: 'auto'
    }
}
class GroupForm extends Component {
    state = {
        name: '',
        img_src: 'https://www.colorhexa.com/ded5ef.png',
        users: '',
        usersfrominput: '',
        creator: this.props.user.id,
        groupMembers: this.props.user.username,
    }
    componentDidMount() {
        this.props.dispatch({ type: "GET_GROUP" });
        this.props.dispatch({ type: "GET_ALL_USERS" });
        this.getInfo();
    }
    onBack = () => {
        console.log('clicking on back');
        this.props.history.push('/home')
    }
    handleChangeFor = (property, event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }
    handleAutoInput = (event) => {
        this.setState({
            ...this.state,
            usersfrominput: event.target.value
        })
    }
    onSubmitAdd = () => {
        let splitUsers = this.state.users.split(" , ");
        console.log(splitUsers)
        this.props.dispatch({ type: 'ADD_GROUP', payload: { localState: this.state, userArray: splitUsers } });
    }

    // onSubmitAdd = () => {
    //     Swal.fire({
    //       title: 'New Group Created!',
    //       icon: 'success',
    //       showCancelButton: false,
    //     }).then((result) => {
    //       if (result.value) {
    //         let splitUsers = this.state.users.split(" , ");
    //         console.log(splitUsers)
    //         this.props.dispatch({ type: 'ADD_GROUP', payload: { localState: this.state, userArray: splitUsers } });
    //         this.onBack();
    //       } 
    //     })
    //   }

    editButton = () => {
        this.setState({
            ...this.state,
            edit: true
        })
    }
    saveButton = (item) => {
        this.props.dispatch({ type: "EDIT_ITEM", payload: item })
    };




    render() {
        return (
            <>
<CreateGroup />
{/* <div className="new-group-page">
        <h1 className="header-2">
            Create New Group:
            </h1>
            <div className="new-group-wrap">
                    <div className="new-group-wrap">
        <h3>Group Name:</h3>
        <input
            id="outlined-name"
            placeholder="Enter a name"
            onChange={(event) => this.handleNameChange(event)}
            className="search-box"/>
        <h3>Members:</h3>
                <ul>
                    {this.state.groupMembers.map((member) => {
                        return(
                    <li>{member}</li>
                    )
                        }
                    )}
                </ul>
        <h3>Add Members:</h3>
        <div>
            <AutoComplete options={this.state.searchResults} handleClick={this.addGroupMember}/>
        </div>
        </div>
        <div className="group-buttons">
            <button className="createGroupBtn" onClick={this.createGroup}>Create Group</button><Link to="/MyGroups" className="createGroupBtn">Cancel</Link>
        </div>
    </div>
    </div> */}
                <DrawerNav />
                <ArrowBackIosIcon style={styles.buttonStyle} onClick={this.onBack} size="small"> Back </ArrowBackIosIcon>

                <Grid container justify="center">
                    {/* add group name */}
                    <Grid item xs={12}>
                        <Autocomplete
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
                                    label="Group Name"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event) => this.handleChangeFor('name', event)}
                                    value={this.state.name} />
                            )} />
                        {/* add image url */}
                        <Autocomplete
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
                                    label="Image URL"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value={this.state.img_url} />
                            )} />
                        {/* add users */}
                        {/* maps through all users */}
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={this.props.allUsers.map(user => user.username)}
                            // value={this.props.allUsers.map(user => user.id)}
                            // onChange={(event) => this.handleChangeFor('usersfrominput', event)}
                            onChange={this.handleAutoInput}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip color="primary" label={option} key={index} value={this.props.allUsers.username} {...getTagProps({ index })}
                                    />

                                ))}
                            renderInput={params => (
                                <TextField  {...params}
                                    variant="outlined"
                                    label="Users"
                                    margin="normal"
                                    fullWidth
                                    value={this.props.allUsers.username}
                                    onChange={(event) => this.handleChangeFor('usersfrominput', event)}

                                />
                            )} />

                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={this.props.allUsers.map(user => user.username)}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Multiple values"
                                    placeholder="NEW"
                                    margin="normal"
                                    onChange={(event) => this.handleChangeFor('usersfrominput', event)}
                                    fullWidth
                                />
                            )}
                        />
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            freeSolo
                            options={this.props.allUsers.map(user => user.username)}

                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip color="primary" label={option} value={option} {...getTagProps({ index })} />

                                ))}
                            renderInput={params => (
                                <TextField  {...params}
                                    variant="outlined"
                                    label="Users"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event) => this.handleChangeFor('users', event)}
                                    value={this.state.users}
                                />
                            )} />

                        {/* <Autocomplete
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
                                    label="Users"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event) => this.handleChangeFor('users', event)}
                                    value={this.state.users} 
                                    />
                            )} /> */}

                        <Fab color="secondary" style={styles.fabStyle} aria-label="add" onClick={this.onSubmitAdd}>
                            <SaveIcon />
                        </Fab>
                    </Grid>
                </Grid>

{/*                 
        <h3>Members:</h3>
                <ul>
                    {this.state.groupMembers.map((member) => {
                        return(
                    <li>{member}</li>
                    )
                        }
                    )}
                </ul>
        <h3>Add Members:</h3>
        <div>
            <AutoComplete options={this.state.searchResults} handleClick={this.addGroupMember}/>
        </div> */}


                <pre> {JSON.stringify(this.state, null, 2)}</pre>

                <pre> {JSON.stringify(this.props.allUsers, null, 2)}</pre>


            </>
        )
    }
}
const map = reduxState => reduxState;

export default connect(map)(GroupForm);

