import React, { useState, useEffect } from "react";
import Contrainer from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import img from "./img/img.jpg";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
export default ({ children }) => {
    const [open, setOpen] = useState(true);
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            color: '#fff',
        },
    }));

    useEffect(() => {
        setTimeout(() => { setOpen(false) }, 300)
    }, [])
    return (
        <div >

            <Contrainer maxWidth="xs">
                <Paper className='mt-3 p-2 mb-3'>
                    <Contrainer maxWidth="sm">
                        <Grid
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img draggable="false" src={img} alt="test img" style={{ width: "100%", height: "50%" }} />
                        </Grid>
                    </Contrainer>
                </Paper>

            </Contrainer>
            <Contrainer maxWidth='lg'>
                <Paper className=''style={{width:"100%"}}>
                    <Contrainer maxWidth='lg'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{minHeight:"400px"}}
                    >
                        {open ? <CircularProgress /> : children}
                    </Grid>
                    </Contrainer>
                </Paper>
            </Contrainer>

            <Contrainer maxWidth="xs">
                <Paper className='mt-3 p-2'>
                    <Contrainer maxWidth="sm">
                        <Grid
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img draggable="false" src={img} alt="test img" style={{ width: "100%", height: "50%" }} />
                        </Grid>
                    </Contrainer>
                </Paper>

            </Contrainer>
        </div>
    )
}
