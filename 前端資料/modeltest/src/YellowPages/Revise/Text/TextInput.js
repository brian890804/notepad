import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Field } from "formik"
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import src from "../../../img/~.jpg"

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function CustomizedSelects(items) {

    const classes = useStyles();
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');

    return (
        <>
            <Grid container className={"pt-2"}>
                <>
                   <Grid item xs={12} style={{ fontSize: "20px" }}><b>{items.itemname}:</b></Grid>
                    <Grid item xs={2}>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={startTime}
                            onChange={(e)=>{setStartTime(e.target.value)}}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value="">
                                <em>請選擇</em>
                            </MenuItem>
                            <MenuItem value={"AM"}>AM</MenuItem>
                            <MenuItem value={"PM"}>PM</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={10}>
                        <BootstrapInput id="demo-customized-textbox" style={{ width: "100%" }} />
                    </Grid>
                </>

                <Grid item xs={12}>
                    <img src={src} className="pt-1 pb-1" alt="~" draggable="false" style={{ width: "100%" }} />
                </Grid>
                <>
                    <Grid item xs={2}>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={endTime}
                            onChange={(e)=>{setEndTime(e.target.value)}}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value="">
                                <em>請選擇</em>
                            </MenuItem>
                            <MenuItem value={"AM"}>AM</MenuItem>
                            <MenuItem value={"PM"}>PM</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={10}>
                        <BootstrapInput id="demo-customized-textbox" style={{ width: "100%" }} />
                    </Grid>
                </>

            </Grid>


        </>
    );
}