import React, { Component } from 'react';
import InvertedArrow from '../Styles/InvertedArrow';
import DrawerNav from '../DrawerNav/DrawerNav'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Chip, TextField, Grid, FormLabel, Paper, FormControlLabel } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { connect } from 'react-redux';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { useSimpleArrowStyles } from '@mui-treasury/styles/arrow/simple';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import Box from '@material-ui/core/Box';

const users = [{ name: "Iris" }, { name: "Anna" }, { name: "Gao" }, { name: "Kathleen" }]
// const classes = useSimpleArrowStyles();
// const gutterStyles = usePushingGutterStyles({
//   firstExcluded: true,
//   space: 2,
// });

class GroupForm extends Component {

    state = {
        name: '',
        img_src: '',
        users: '',
        usersfrominput: '',
        creator: this.props.user.id,
    }
    componentDidMount() {
        this.props.dispatch({ type: "GET_GROUP" });
        this.props.dispatch({ type: "GET_ALL_USERS"});
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

    handleAutoInput = () => {
        this.setState({
            ...this.state, 
            usersfrominput: this.props.allUsers.id
        })
    }

    onSubmitAdd = () => {
        let splitUsers = this.state.users.split(" , ");
        console.log(splitUsers)
        this.props.dispatch({ type: 'ADD_GROUP', payload: {localState: this.state, userArray: splitUsers} });
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
                <InvertedArrow onClick={this.onBack} />
                <ArrowBackIosIcon onClick={this.onBack} variant="outlined" size="small"> Back </ArrowBackIosIcon>

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
                                    <Chip color="primary" label={option} {...getTagProps({ index })}
                                    />

                                ))}
                            renderInput={params => (
                                <TextField  {...params}
                                    variant="outlined"
                                    label="Users"
                                    margin="normal"
                                    fullWidth
                                    value={this.props.allUsers.id}
                                />
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
                                    label="Users"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event) => this.handleChangeFor('users', event)}
                                    value={this.state.users} 
                                    />
                            )} />
                        <Button onClick={this.onSubmitAdd} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Submit</Button>

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


