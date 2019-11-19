import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

class List extends Component {

    state = {
        listItems: "",
        createdDate: '',
        shoppingDate: '',
        listSaved: false,
    }
    // cancel create list goes back to list view
    onCancel = () => {
        this.props.history.push('/list')
    }


    onChangeList = (event) => {
        console.log(...this.state.listItems)
        this.setState({
            // ...this.state.listItems,
            //colleection of eveyrthing and that list
            listItems: event.target.value

        })
    }

    onSubmit = () => {

        this.setState({
            listSaved: !false
        })
        console.log('onSave')
        // ...this.state,

    }
    render() {
        console.log("state: ", this.state)
        return (
            <>
                        <>Created On: {this.state.createdDate}
                            Shopping Date: {this.state.shoppingDate}
                            <Button onClick={this.onCancel} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Back</Button>
                            <Button onClick={this.onCompleted} variant="outlined" size="small" startIcon={<CheckCircleOutlineIcon />} color="primary" >Completed</Button>
                            <Button onClick={this.onDelete} variant="outlined" size="small" startIcon={<DeleteIcon />} color="primary" >Delete</Button></>
                



                    <Grid container spacing={24} style={{ padding: 24 }} />
                    <pre> {JSON.stringify(this.state, null, 2)}</pre>
            </>
        )
    }
}


export default List;
