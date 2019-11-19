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
    componentDidMount() {
        // this.refreshFeedback()
        this.props.dispatch({ type: "GET_GROUP" });

    }

    // refreshFeedback = () => {
    //     this.props.dispatch({ type: "GET_GROUP", payload: {
    //         name: this.state.name,
    //         img_url: this.state.img_url}})
    // }

    onBack = () => {
        this.props.history.push('/home')
    }


    state = {
       name: '',
       img_url: ''
    }

    deleteButton = (item) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: item })
    }
    editButton = () => {
        this.setState({
            ...this.state,
            edit: true
        })
    }

    handleChangeFor = (property, event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
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
                        <TextField
                            required
                            id="standard-required"
                            label="Group Name"
                            margin="normal"
                            onChange={this.onChangeName}></TextField>

                        <TextField
                            id="standard"
                            label="Image URL:"
                            margin="normal"
                            onChange={this.onChangeImage}></TextField>

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={users.map(name => name.name)}
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
                        <Button onClick={this.onSubmit} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Submit</Button>



                    </Grid>

                </Grid>
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


