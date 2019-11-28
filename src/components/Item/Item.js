import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ItemItem from './ItemItem.js';
import ItemMap from './ItemMap.js';
import Swal from 'sweetalert2';
import EditIcon from '@material-ui/icons/Edit';

// LIST PAGE WITH ITEMS IN IT
class Item extends Component {

    state = {
        showComplete: true,
        listName: '',
        listItems: "",
        edit: true
    }

    componentDidMount() {
        this.props.dispatch({ type: "GET_ITEM", payload: this.props.findListReducer });
    }
    onChangeList = (event) => {
        console.log(...this.state.listItems)
        this.setState({
            listItems: event.target.value

        })
    }
    onSubmitAdd = () => {
        console.log('submit button to add new item clicked');
        this.props.dispatch({
            type: 'ADD_ITEM', payload: {
                listItem: this.state.listItems,
                setId: this.props.findListReducer.id
            }
        });
    }
    onBack = () => {
        this.props.history.push('/list')
    }
    onEdit = () => {
        console.log('edit button clicked')
        this.setState({
            ...this.state,
            edit: !this.state.edit
        })
    }

    saveButton = (item) => {
        this.props.dispatch({ type: "EDIT_LIST", payload: { id: this.props.findListReducer.id, listName: this.state.listName } })
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

    //function to trigger the delete list route and delete list from database
    onDelete = (list) => {
        console.log('clicked delete list!');
        //add sweet alert to confirm the deletion
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete list!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your list has been deleted.',
                    'success'
                );
                this.props.dispatch({
                    type: 'DELETE_LIST', payload: this.props.findListReducer.id
                })
                this.props.history.push('/list')
            } else {
                //if cancel do nothing
                Swal.fire(
                    'Cancelled',
                    'Did not delete list!'
                )
            }
        })
    }



    render() {
        return (
            <>
                <div>

                    <Button onClick={this.onBack} variant="contained" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>
                    <Button onClick={this.onEdit} variant="contained" size="small" startIcon={<EditIcon />} color="primary" >EDIT LIST NAME</Button>
                    <Button onClick={(list) => this.onDelete(list)} variant="contained" size="small" startIcon={<DeleteIcon />} color="primary" >DELETE LIST</Button>
                    {this.state.edit ?

                        <h1>LIST: {this.props.findListReducer.list_name}</h1> : <>
                            <h1> EDIT LIST:
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
                                            label="Update List"
                                            margin="normal"
                                            onChange={(event) => this.handleChangeFor("listName", event)}
                                            value={this.state.listName}
                                        />
                                    )} />
                                <Button color="primary" onClick={() => this.saveButton(this.props.item)}>Save</Button></h1></>}
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
                                label="List Items"
                                margin="normal"
                                fullWidth
                                onChange={this.onChangeList}
                                value={this.state.listItem} />
                        )} /> <Button color="primary" variant="contained" onClick={this.onSubmitAdd}>Submit</Button>
                    <ItemMap />


                    {/* Created On: {this.props.listReducer.date_created}
                    Shopping Date: {this.props.listReducer.shopping_date}
                    <Link className="list-link" to="/list">
                        <Button variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>    </Link>

                    <Button onClick={this.onCompleted} variant="outlined" size="small" startIcon={<CheckCircleOutlineIcon />} color="primary" >Completed</Button>
                    <Button onClick={this.onDeleteGroup} variant="outlined" size="small" startIcon={<DeleteIcon />} color="primary" >Delete</Button> */}

                </div>
                <pre> {JSON.stringify(this.props.itemReducer, null, 2)}</pre>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(Item);


