import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class ListItem extends Component {

    state = {
        listItems: "",
        createdDate: '',
        shoppingDate: '',
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
        console.log('onSave')
        // ...this.state,

    }
    render() {
        console.log("state: ", this.state)
        return (
            <>
                <div className="Inputs">
                <h1>GROUP NAME</h1>

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
                        )} />
                        Created On:<TextField></TextField>
                        Shopping Date:<TextField></TextField>

                    <Button onClick={this.onCancel} variant="outlined" size="small" startIcon={<ArrowBackIosIcon />} color="primary" >Cancel</Button>

                    <Button onClick={this.onSubmit} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Save</Button>

                    <Grid container spacing={24} style={{ padding: 24 }} />
                    <pre> {JSON.stringify(this.state, null, 2)}</pre>
                </div>
            </>
        )
    }
}


export default ListItem;
