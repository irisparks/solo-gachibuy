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
import ItemItem from './ItemItem.js'
class Item extends Component {
    state = {
        listItems: "",
        createdDate: '',
        shoppingDate: '',
        listSaved: false,
        edit: false
    }

    componentDidMount() {
        this.props.dispatch({ type: "GET_ITEM" });

    }

    onChangeList = (event) => {
        console.log(...this.state.listItems)
        this.setState({
            // ...this.state.listItems,
            //colleection of eveyrthing and that list
            listItems: event.target.value

        })
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
    onSubmitAdd = () => {
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state });
    }

    render() {
        return (
            <>
                <div>
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
                        )} /> <Button color="primary" variant="outlined" onClick={this.onSubmitAdd}>Submit</Button>


                    <h1>ITEMS</h1>
                    <>
                        <div>

                            {/* MAP FUNCTION FOR EACH ITEM  */}

                            {this.props.itemReducer.map((item, i) =>
                                <ItemItem item={item} key={i} />)}

                        </div>
                    </>


                    Created On: {this.props.listReducer.date_created}
                    Shopping Date: {this.props.listReducer.shopping_date}
                    <Link className="list-link" to="/list">
                        <Button variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>    </Link>

                    <Button onClick={this.onCompleted} variant="outlined" size="small" startIcon={<CheckCircleOutlineIcon />} color="primary" >Completed</Button>
                    <Button onClick={this.onDeleteGroup} variant="outlined" size="small" startIcon={<DeleteIcon />} color="primary" >Delete</Button>

                </div>
                <pre> {JSON.stringify(this.props.itemReducer, null, 2)}</pre>

                {/* <pre> {JSON.stringify(this.props.itemReducer, null, 2)}</pre> */}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(Item);


