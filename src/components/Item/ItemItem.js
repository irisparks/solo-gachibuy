import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Chip, Typography, List, ListItem, Divider, ListItemIcon, Checkbox } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';

class ItemItem extends Component {
    state = {
        showComplete: true,
        edit: true,
        listItems: "",
    }

    // onCompleteClick = () => {
    //     this.setState({
    //         showComplete: !this.state.showComplete
    //     })
    //     console.log('clicked on a item');
    // }

    onDelete = (item) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: item })
        console.log('delete list item')
    }

    onEdit = () => {
        console.log('edit button clicked')
        this.setState({
            edit: !this.state.edit
        })
    }

    handleChangeFor = (property, event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    saveButton = (item) => {
        this.props.dispatch({ type: "EDIT_ITEM", payload: { id: item.id, ...this.state } })
        this.setState({
            ...this.state,
            edit: false
        })

    };

    render() {
        return (
            <>

                    <List >
                        <ListItem color="secondary" >
                            <ListItemIcon>
                                <Checkbox />
                            </ListItemIcon>
                            <ListItemIcon>
                                <Chip onUpdateInput key={this.props.key} color="primary" onClick={this.onCompleteClick} label={this.props.item.item_name} />
                            </ListItemIcon>
                            <ListItemIcon>
                                <EditIcon onClick={this.onEdit} color="secondary" />
                            </ListItemIcon>
                            <ListItemIcon>
                                <DeleteIcon onClick={(item) => this.onDelete(this.props.item.id)} color="secondary" />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                    <Divider variant="middle" />
                    {/* NEED TO FIX CONDITIONAL RENDERING FOR EACH ITEM ID BECAUSE SWITCHES WHEN ITEM IS DELETED */}
                    {this.state.edit ? <>
                    </>
                    : <>
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
                                    label="Update"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event) => this.handleChangeFor("listItems", event)}
                                    value={this.state.listItem} />
                            )} />
                        <Button style={{ fontWeight: 'bold' }} color="primary" variant="contained" onClick={() => this.saveButton(this.props.item)} startIcon={<SaveIcon />} >Save</Button></>}


                {/* 
                {this.state.edit && <><input onChange={(event) => this.handleChangeFor("listItem", event)}
                    value={this.state.listItem} /></>} */}
                <pre> {JSON.stringify(this.state, null, 2)}</pre>

            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ItemItem);


