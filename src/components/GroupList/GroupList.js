import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import ListView from '../ListPage/ListPage'
import { Link } from 'react-router-dom';

class GroupList extends Component {


    render() {
        return (
            <>
                <div>

                    {this.props.groupReducer.map((group, i) =>
                        <Link className="list-link" to="/list">
                            <Button color="primary" onClick={this.onEachList} key={i}>{group.name}</Button>
                        </Link>
                    )}
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(GroupList);


