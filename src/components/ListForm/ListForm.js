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
import { connect } from 'react-redux';
import Item from '../Item/Item'
import ListPage from '../ListPage/ListPage'
class ListItem extends Component {

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
                <div className="Inputs">
                    <h1>GROUP NAME (in listform)</h1>

<Item />

                    {/* conditonal rendering for save button click */}
                    {/* {this.state.listSaved == false ?
                        <>Created On:<TextField></TextField>
                            Shopping Date:<TextField></TextField>
                            <Button onClick={this.onCancel} variant="outlined" size="small" startIcon={<CancelIcon />} color="primary" >Cancel</Button>
                            <Button onClick={this.onSubmitAdd} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Save</Button> </>
                        
                    } */}




                    <Grid container spacing={24} style={{ padding: 24 }} />
                    {/* <pre> {JSON.stringify(this.state, null, 2)}</pre> */}
                    {/* <pre> {JSON.stringify(this.props.listReducer, null, 2)}</pre> */}

                </div>
            </>
        )
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
  }
  
  export default connect(mapReduxStateToProps)(ListItem);
  
  