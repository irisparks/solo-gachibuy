import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { useSimpleArrowStyles } from '@mui-treasury/styles/arrow/simple';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';

const InvertedArrow = () => {
  const classes = useSimpleArrowStyles();
  const gutterStyles = usePushingGutterStyles({
    firstExcluded: true,
    space: 2,
  });
  return (
    <Box className={gutterStyles.parent}>
      <Button classes={classes}>
        <KeyboardArrowLeft />
      </Button>
    </Box>
  );
};


export default InvertedArrow;

