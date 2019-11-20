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
    }

    // function onPhotoClick to setState to False for Conditional Rendering

    onCompleteClick = () => {
        this.setState({
            showComplete: !this.state.showComplete
        })
        console.log('clicked on a item');
    }

    onDelete = (item) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: item})
        console.log('delete list item')
    }

  
    onEdit = () => {
        console.log('edit list item')
    }

    render() {
        return (
            <>
                {this.state.showComplete ? <>
                    <Chip key={this.props.key} variant="outlined" color="primary" onClick={this.onCompleteClick} label={this.props.item.item_name} />
                    <EditIcon onClick={this.onEdit} color="primary" />
                    <DeleteIcon onClick={()=>this.onDelete(this.props.item.id)} color="primary" /> </> :
                    <>
                        <Chip key={this.props.key} color="primary" onClick={this.onCompleteClick} label={this.props.item.item_name} />
                        <EditIcon onClick={this.onEdit} color="primary" />
                        <DeleteIcon onClick={()=>this.onDelete(this.props.item.id)} color="primary" /> </>}
                <pre> {JSON.stringify(this.state, null, 2)}</pre>

            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ItemItem);


