import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemItem from './ItemItem.js';

// map function for each item
class ItemMap extends Component {
  

    render() {
        return (
            <>

                    <h1>ITEMS</h1>
                    <>
                        <div>
                            {/* MAP FUNCTION FOR EACH ITEM  */}
                            {this.props.itemReducer.map((item, i) =>
                                <>
                                    <li>{item.item_name}</li>
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


