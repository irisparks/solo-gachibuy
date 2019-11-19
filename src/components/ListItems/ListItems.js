import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';

const users = [{ name: "Iris" }, { name: "Anna" }, { name: "Gao" }, { name: "Kathleen" }]

class ListItem extends Component {

    state = {
        groupname: "",
        image_url: "",
        users: "",
        showError: false,
        listItems: "",
    }

    onChangeName = (event) => {
        this.setState({
            groupname: event.target.value
        })
    }

    onChangeImage = (event) => {
        this.setState({
            image_url: event.target.value
        })
    }

    onChangeUser = (event) => {
        const user = event.target.innerText;
        // const users = this.state
        // keeps track of the collection of users
        this.setState({ users: user })
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
        console.log('onSubmit')
        // ...this.state,

    }
    render() {
        console.log("state: ", this.state)
        return (
            <>

                <div className="Inputs">
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
                                value={this.state.listItem}/>
                        )} />
                    <Button onClick={this.onSubmit} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Submit</Button>

                    <Grid container spacing={24} style={{ padding: 24 }} />
                    <pre> {JSON.stringify(this.state, null, 2)}</pre>
                </div>
            </>
        )
    }
}


export default ListItem;
