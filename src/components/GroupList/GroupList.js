import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import ListView from '../ListView/ListView'
import { Link } from 'react-router-dom';

class GroupList extends Component {


    render() {
        return (
            <>
                <div>
                    <ul>
                        <li>
                        <Link className="list-link" to="/list">
                            <Button color="primary" onClick={this.onEachList} key={this.props.group.key}>{this.props.group.name}</Button>
                        </Link>
                        </li>
                        </ul>
                        
                
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(GroupList);


