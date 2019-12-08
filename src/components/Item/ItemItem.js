import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Chip, List, ListItem, Divider, ListItemIcon, Checkbox } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class ItemItem extends Component {
    state = {
        showComplete: true,
        edit: true,
        listItems: "",
        checked:false, 
        indeterminate: false,
        check: false,
        strike: 'none'
    }

    onCompleteClick = (item) => {
        // this.setState({check: !this.state.check})
        // if (this.state.strike === 'none'){
        //   this.setState({strike: 'line-through'})
        // } else {
        //   this.setState({strike: 'none'})
        // }
        // this.setState({
        //     showComplete: event.target.checked,
        // })
        this.props.dispatch({ type: "COMPLETE_ITEM", payload: {item:item.id, setId: this.props.findListReducer.id} })
        console.log('clicked on a item');
    }

    // componentDidMount() {
    //     this.props.dispatch({ type: "GET_ITEM", payload: this.props.findListReducer.id  });
    // }

    onDelete = (item) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: {item: item, setId: this.props.findListReducer.id}})
        console.log('delete list item')
        // this.props.dispatch({ type: "GET_ITEM", payload: this.props.findListReducer.id });
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
        this.props.dispatch({ type: "EDIT_ITEM", payload: { id: item.id, ...this.state, list_name: this.props.findListReducer.list_name } })
        this.setState({
            ...this.state,
            edit: true
        })
        this.props.dispatch({ type: "GET_ITEM", payload: this.props.findListReducer.id });
    };

    render() {
        const strike = {
            textDecoration: this.state.strike,
          }
        return (
            <>
                <List >
                    <ListItem color="secondary" >
                        <ListItemIcon>
                                <Checkbox checked={this.props.item.item_completed} onChange={() => this.onCompleteClick(this.props.item)} /> 
                            </ListItemIcon>
                            {/* <span style= {strike}> {this.props.item.item_name} </span> */}

                        <ListItemIcon>
                            <Chip onUpdateInput key={this.props.key} color="primary" label={this.props.item.item_name} />
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
                      <TextField
                        variant="outlined"
                        label="Update Item"
                        margin="normal"
                        fullWidth
                        onChange={(event) => this.handleChangeFor("listItems", event)}
                        value={this.state.listItem} />

                        <Button style={{ fontWeight: 'bold' }} color="primary" variant="contained" onClick={() => this.saveButton(this.props.item)} startIcon={<SaveIcon />} >Save</Button></>}


                {/*                 
                {this.state.edit && <><input onChange={(event) => this.handleChangeFor("listItem", event)}
                    value={this.state.listItem} /></>} */}
                {/* <pre> {JSON.stringify(this.state, null, 2)}</pre>
                <pre> {JSON.stringify(this.props.item, null, 2)}</pre> */}

            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ItemItem);


