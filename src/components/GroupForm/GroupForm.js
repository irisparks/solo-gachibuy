import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import DrawerNav from '../DrawerNav/DrawerNav'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Chip, TextField, Grid, FormLabel, Paper, FormControlLabel } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { connect } from 'react-redux';

const users = [{ name: "Iris" }, { name: "Anna" }, { name: "Gao" }, { name: "Kathleen" }]

class GroupForm extends Component {
    state = {
        name: '',
        img_url: '',
        users: ''
    }
    componentDidMount() {
        this.props.dispatch({ type: "GET_GROUP" });
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
        this.props.dispatch({ type: 'ADD_GROUP', payload: this.state });
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
                        {/* <TextField
                            required
                            id="standard-required"
                            label="Group Name"
                            margin="normal"
                            value={this.state.name}
                            onChange={(event) => this.handleChangeFor('name', event)}></TextField> */}
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
                                    onChange={(event) => this.handleChangeFor('img_url', event)}
                                    value={this.state.img_url} />
                            )} />
                        {/* <TextField
                            id="standard"
                            label="Image URL:"
                            margin="normal"
                            value={this.state.img_url}
                            onChange={(event) => this.handleChangeFor('img_url', event)}></TextField> */}

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={users.map(name => name.name)}
                            value={this.users}
                            onChange={(event) => this.handleChangeFor('users', event)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip color="primary" label={option} {...getTagProps({ index })}
                                    />

                                ))}
                            renderInput={params => (
                                <TextField  {...params}
                                    variant="outlined"
                                    label="Users"
                                    margin="normal"
                                    fullWidth
                                />
                            )} />
                        <Button onClick={this.onBack} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>
                        <Button onClick={this.onSubmitAdd} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Submit</Button>

                    </Grid>
                </Grid>

                <pre> {JSON.stringify(this.state, null, 2)}</pre>

                <pre> {JSON.stringify(this.props.groupReducer, null, 2)}</pre>
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


