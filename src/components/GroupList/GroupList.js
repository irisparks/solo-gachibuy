import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button, Typography } from '@material-ui/core'
import ListView from '../ListView/ListView'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        marin: 'auto',
        maxWidth: 500,
        color: 'orange',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    card: {
        display: 'flex',
        maxWidth: 345,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
};

const theme = createMuiTheme({
    palette: {
        primary: { main: '#4ac29a' },
    },
});

class GroupList extends Component {


    render() {
        return (
            <>
                <ThemeProvider theme={theme}>

                    <div>
                        <Card style={styles.card} key={this.props.group.key}>
                            <CardContent style={styles.content}>
                                <Link to="/list">   
                              
                                <Typography component="h5" variant="h5">

                                    {this.props.group.name}

                                </Typography>
                                </Link>
                                <Typography variant="subtitle1" color="textSecondary">
          </Typography>
                            </CardContent>
                            <CardMedia
                                style={styles.cover}
                                image={this.props.img_src}
                                title="covertitle"
                            />
                        </Card>


                    </div>
                </ThemeProvider>

            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(GroupList);


