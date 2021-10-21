import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function CustomizedSnackbars({pass,handleClose,unpass,info}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={pass} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          登入成功!
        </Alert>
      </Snackbar>
      <Snackbar open={unpass} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          輸入的資訊錯誤!
        </Alert>
      </Snackbar>
      <Snackbar open={info} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          公告!
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
