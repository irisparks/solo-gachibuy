import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemItem from './ItemItem.js';
import {Typography} from '@material-ui/core'

// map function for each item
class ItemMap extends Component {


    render() {
        return (
            <>

                <Typography variant="h3">Shopping Items: </Typography>
                <>
                    <div>
                        {/* MAP FUNCTION FOR EACH ITEM  */}
                        {this.props.itemReducer.map((item, i) =>
                            <>
                                <ItemItem item={item} key={i} /> </>)}
                    </div>
                </>

            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ItemMap);


