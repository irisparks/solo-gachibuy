import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import ListView from '../ListPage/ListPage'
import { Link } from 'react-router-dom';
import Item from '../Item/Item'

class ListofList extends Component {


    render() {
        return (
            <>
                <div>

                    {this.props.listReducer.map((list, i) =>
                    <>
                        <Link className="list-link" to="/listform">
                            <Button color="primary" onClick={this.onEachList} key={i}>{list.list_name}</Button>
                        </Link>
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
