import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { red } from '@material-ui/core/colors';
import { FormatAlignJustify } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
   width:"100%",
  },
  back: {
    backgroundColor:"orange",
    height:"60px",
    justifyContent:"center"
  },
  title: {
    flexGrow: 1,
    textAlign:"center",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static"className={classes.back}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            編輯黃頁
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}