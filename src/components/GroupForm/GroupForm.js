import React, { Component } from 'react';
import DrawerNav from '../DrawerNav/DrawerNav'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { Fab, Button, Chip, TextField, Grid, FormLabel, Paper, FormControlLabel } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import UserSearch from './UserSearch';

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
        searchResults: [],
        searchResultsWithId: [],
        groupUsers: [this.props.user.username],
        userIds: [this.props.user.id],
        creator: this.props.user.id,
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
        axios.get('/api/search_users/')
            .then(({ data }) => {
                data.forEach(person => {
                    this.setState({
                        ...this.state,
                        searchResults: [...this.state.searchResults,
                        person.username],
                        searchResultsWithId: [...this.state.searchResultsWithId,
                            person]
                    })
                })
            })
    }

    addGroupUsers = (username) => {
        this.addGroupIds(username);
    }

    addGroupIds = (username) => {
        let idToAdd = 0
        this.state.searchResultsWithId.forEach(result => {
            if (username == result.username) {
                idToAdd = result.id
            }
        })
        this.setState({
            ...this.state,
            groupUsers: [...this.state.groupUsers, username],
            userIds: [...this.state.userIds, idToAdd]
        });
    }

    onBack = () => {
        this.props.history.push('/home')
    }
    handleChangeFor = (property, event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }
    onSubmitAdd = () => {
        this.props.dispatch({ type: 'ADD_GROUP', payload: { localState: this.state, userArray: this.state.userIds} })
        this.props.history.push('/home')
    }

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



                        <h3>Users in Group:</h3>
                        <ul>
                            {this.state.groupUsers.map((member) => {
                                return (
                                    <li>{member}</li>
                                )
                            }
                            )}
                        </ul>
                        <h3>Add Users:</h3>
                        <div>
                            <UserSearch options={this.state.searchResults} handleClick={this.addGroupUsers} />
                        </div>

                        <Fab color="secondary" style={styles.fabStyle} aria-label="add" onClick={this.onSubmitAdd}>
                            <SaveIcon />
                        </Fab>
                    </Grid>
                </Grid>

                {/* <pre> {JSON.stringify(this.state, null, 2)}</pre> */}
            </>
        )
    }
};

const map = reduxState => reduxState;

export default connect(map)(GroupForm);


