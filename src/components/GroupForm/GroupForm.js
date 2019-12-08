import React, { Component } from 'react';
import DrawerNav from '../DrawerNav/DrawerNav'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { Fab, Chip, TextField, Grid, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Button, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import UserSearch from './UserSearch';
import './GroupForm.css';

const styles = {
    fabStyle: {
        margin: -40,
        top: 'auto',
        right: 40,
        left: 'auto',
        position: 'fixed'
    },
    radio: {
        margin: 15,
    }
}

class GroupForm extends Component {

    state = {
        name: '',
        img_src: '',
        searchResults: [],
        searchResultsWithId: [],
        groupUsers: [this.props.user.username],
        userIds: [this.props.user.id],
        creator: this.props.user.id,
        ownImage: false
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
        this.props.dispatch({ type: 'ADD_GROUP', payload: { localState: this.state, userArray: this.state.userIds, userNames: this.state.groupUsers} })
        this.props.history.push('/home')
    }

    onImageClick = () => {
        this.setState({
            ...this.state,
            ownImage: !this.state.ownImage
        })
    }
    render() {

        return (
            <>
                <DrawerNav />
                <ArrowBackIosIcon style={styles.buttonStyle} onClick={this.onBack} size="small"> Back </ArrowBackIosIcon>
                <Grid container
                    style={{ overflowY: 'scroll' }}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Typography variant="h4">Create a New Group!</Typography>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Group Name"
                            margin="normal"
                            fullWidth
                            onChange={(event) => this.handleChangeFor('name', event)}
                            value={this.state.name}
                        />

                        {/* image options for group image */}
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={styles.radio}>Select an Image</FormLabel>
                            <RadioGroup style={styles.radio} defaultValue="Images" aria-label="Images">
                                <FormControlLabel
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} label="Space" />
                                <FormControlLabel value="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} onChange={(event) => this.handleChangeFor('img_src', event)} label="Flowers" />
                                <FormControlLabel
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} label="Mountains" />
                                <FormControlLabel
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value="https://images.unsplash.com/photo-1432457990754-c8b5f21448de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} label="Lemons" />
                            </RadioGroup>
                            <Button onClick={this.onImageClick} color="secondary" variant="contained">Upload own Image</Button>

                        </FormControl>
                        {/* conditional rendering to allow users to upload own image */}
                        {this.state.ownImage &&

                            <TextField
                                variant="outlined"
                                label="Image URL"
                                margin="normal"
                                fullWidth
                                onChange={(event) => this.handleChangeFor('img_src', event)}
                                value={this.state.img_url}
                            />
                        }
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


