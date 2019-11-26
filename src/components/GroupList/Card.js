import React from 'react';
import cx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';

import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { useInvertedArrowStyles } from '@mui-treasury/styles/arrow/inverted';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
  },
  content: {
    padding: 24,
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
  },
  title: {
    color: '#fff',
    letterSpacing: '2px',
  },
}));

const NewsCard2 = (props) => {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  const classes = useInvertedArrowStyles();
  const gutterStyles = usePushingGutterStyles({
    firstExcluded: true,
    space: 2,
  });

  function onGroupClick() {
    props.onGroupClick(props.group)
  }
  return (
    <>
    <Card className={cx(styles.root, shadowStyles.root)} onClick={onGroupClick}>
      <CardMedia classes={mediaStyles} image={props.group.img_src} />
      <CardActionArea>
        <CardContent className={styles.content}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={260}
            color={'common.white'}
            textAlign={'center'}
          >
            <h1 className={styles.title}>{props.group.name}</h1>
            <p>The space between the stars and galaxies is largely empty.</p>
          </Box>
          <Typography className={styles.cta} variant={'overline'}>
            Explore
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  
    </>
  );
};


// InvertedArrow.propTypes = {};
// InvertedArrow.defaultProps = {};



const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(NewsCard2);

