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


