import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import img from "./img/img.jpg";
import member from "./member.json";
import AccountCircle from '@material-ui/icons/AccountCircle';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        margin: {
            margin: theme.spacing(1),
        },
    },
}));

export function Sigin() {
    const [account, setAccount] = useState()
    const [password, setPassword] = useState()
    const [open, setOpen] = useState(false);
    const [pass, setPass] = useState(false);
    const classes = useStyles();

    const handleClick = () => {
        setOpen(true);


    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    const submit = (request) => {

        auth(request)
    }

    const auth = (request) => {
        const found = member.find((element) => element.account === request.account)
        console.log(found)
        if (found) {
            if (found.password === request.password) {
                console.log("通過")
                setPass(true)
                handleClick()
            }
            else {
                console.log("不通過")
                setPass(false)
                handleClick()
            }

        } else {
            console.log("不通過")
            setPass(false)
            handleClick()
        }

    }

    return (
        <>
            <Container maxWidth='xs' >
                <Paper className="mt-5 p-2">
                    <Container maxWidth='xs'>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid container item xs={6}>
                                <img src={img} alt={"loginPage"} style={{ width: "100%", height: "100%" }} draggable="false"/>
                            </Grid>
                        </Grid>
                        <form>
                            <div className={classes.margin}>
                                <Grid container spacing={7} alignItems="flex-end" className="">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Account" />
                                    </Grid>
                                </Grid>


                            </div>
                            <p><TextField id="standard-basic" label="Password" type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} required /></p>
                            <Button variant="contained" color="secondary" onClick={() => { submit({ account: account, password: password }) }}>送出</Button>
                        </form>
                    </Container>
                </Paper>
            </Container>
            <div className={classes.root}>
                {pass ? (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            登入成功
                        </Alert>
                    </Snackbar>
                ) : (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            登入失敗
                        </Alert>
                    </Snackbar>
                )}

            </div>
        </>
    );

}