import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import Item from '../Item/Item'

class ListofList extends Component {
    // NOT USING
    onListClick=(list) => {
        console.log('clicked on a list');
        this.props.dispatch({ type: "FIND_LIST", payload: list})
        this.props.history.push('/listform')
      }

    render() {
        return (
            <>
                <div>

                    {this.props.listReducer.map((list, i) =>
                    <>
                            <Button color="primary" onClick={() => this.onListClick(list)} key={i}>{list.list_name}</Button>
                        {/* <Item /> */}
                        </>
                    )}

                </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ListofList);
