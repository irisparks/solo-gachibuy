import React, { Component } from 'react';
import InvertedArrow from '../Styles/InvertedArrow';
import DrawerNav from '../DrawerNav/DrawerNav'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { Fab, Button, Chip, TextField, Grid, FormLabel, Paper, FormControlLabel } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { connect } from 'react-redux';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { useSimpleArrowStyles } from '@mui-treasury/styles/arrow/simple';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2';

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
    }
    componentDidMount() {
        this.props.dispatch({ type: "GET_GROUP" });
        this.props.dispatch({ type: "GET_ALL_USERS" });
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

    // onSubmitAdd = () => {
    //     let splitUsers = this.state.users.split(" , ");
    //     console.log(splitUsers)
    //     this.props.dispatch({ type: 'ADD_GROUP', payload: { localState: this.state, userArray: splitUsers } });
    // }

    onSubmitAdd = () => {
        Swal.fire({
          title: 'New Group Created!',
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.value) {
            let splitUsers = this.state.users.split(" , ");
            console.log(splitUsers)
            this.props.dispatch({ type: 'ADD_GROUP', payload: { localState: this.state, userArray: splitUsers } });
            this.onBack();
          } 
        })
      }
    


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


                <DrawerNav />
                <ArrowBackIosIcon style={styles.buttonStyle} onClick={this.onBack} size="small"> Back </ArrowBackIosIcon>

                <Grid container justify="center">
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
                        {/* <Button style={{ fontWeight: 'bold' }} onClick={this.onSubmitAdd} size="small" variant="contained" startIcon={<SaveIcon />} color="primary" variant="contained"  >Submit</Button> */}

                    </Grid>
                </Grid>

                <pre> {JSON.stringify(this.state, null, 2)}</pre>

                <pre> {JSON.stringify(this.props.allUsers, null, 2)}</pre>
                {/* <ul>
                    {this.props.groupReducer.map((group, i) =>
                    <p key={i}>{group.name}</p>)}
                </ul> */}

                {/* <Grid container >
                    <Grid item xs={12}>
                        <Grid container justify="center" >

                            <Grid >
                                <Paper>
                                    <button>CLICKME</button>
                                </Paper>
                            </Grid>
                            </Grid>
                            </Grid>
                            </Grid>

                        
                group form
                <Grid container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                ><p>                                    <img src="/a/collection-route~editorial-route~explore-route~following-route~photos-route~search-photos-route~topi~fd4eb87d.1366a.js">here</img>
                </p></Grid> */}
            </>
        )
    }
}
const map = reduxState => reduxState;

export default connect(map)(GroupForm);


