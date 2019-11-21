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
import EditIcon from '@material-ui/icons/Edit';
class ItemItem extends Component {
    state = {
        showComplete: true,
        edit: false,
        listItems: "",

    }

    // function onPhotoClick to setState to False for Conditional Rendering

    onCompleteClick = () => {
        this.setState({
            showComplete: !this.state.showComplete
        })
        console.log('clicked on a item');
    }

    onDelete = (item) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: item })
        console.log('delete list item')
    }


    onEdit = () => {
        console.log('edit button clicked')
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
        this.props.dispatch({ type: "EDIT_ITEM", payload: {id: item.id, ...this.state} })
            this.setState({
                ...this.state,
                edit: false
            })

    };
    render() {
        return (
            <>
                {this.props.item.item_name}
                {/* NEED TO FIX CONDITIONAL RENDERING FOR EACH ITEM ID BECAUSE SWITCHES WHEN ITEM IS DELETED */}
                {this.state.edit && <>
                    <input key={this.props.key} onChange={(event) => this.handleChangeFor("listItems", event)}
                        value={this.state.listItems} />
                    <button onClick={() => this.saveButton(this.props.item)}>Save</button></>}

                {this.state.showComplete ? <>

                    {/* <Chip onUpdateInput key={this.props.key} variant="outlined" color="primary" onUpdateInput={this.onEdit} label={this.props.item.item_name} /> */}
                    <EditIcon onClick={this.onEdit} color="primary" />
                    <DeleteIcon onClick={() => this.onDelete(this.props.item.id)} color="primary" /> </>
                    :
                    <>
                        <Chip key={this.props.key} color="primary" onClick={this.onCompleteClick} label={this.props.item.item_name} />
                        <EditIcon onClick={this.onEdit} color="primary" />
                        <DeleteIcon onClick={() => this.onDelete(this.props.item.id)} color="primary" /> </>}

                {this.state.edit && <><input onChange={(event) => this.handleChangeFor("listItem", event)}
                    value={this.state.listItem} /></>}
                <pre> {JSON.stringify(this.state, null, 2)}</pre>

            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ItemItem);


