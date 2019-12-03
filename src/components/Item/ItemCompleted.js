import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from '@material-ui/core'


class ItemCompleted extends Component {
    state = {
        showComplete: true,
        edit: true,
        listItems: "",
        checked:false, 
        indeterminate: false,
    }

    onCompleteClick = (item) => (event) => {
        console.log(
            'what is item?:',item
        )
        this.setState({
            showComplete: event.target.checked,
        })
        this.props.dispatch({ type: "COMPLETE_ITEM", payload: item })
        console.log('clicked on a item');
    }

    componentDidMount() {
        this.props.dispatch({ type: "GET_ITEM" });
    }

    onDelete = (item) => {
        this.props.dispatch({ type: "DELETE_ITEM", payload: item })
        console.log('delete list item')
        this.props.dispatch({ type: "GET_ITEM", payload: this.props.findListReducer.id });
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
        return (
            <>

        
                                <Checkbox value={this.state.showComplete} checked={this.props.item.item_completed} onChange={() => this.onCompleteClick(this.props.item)} /> 
     
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ItemCompleted);


