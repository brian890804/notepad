import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import img from "../img/AK.jpg";
const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));

export default function SimpleFade() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev)
    }

    useEffect(()=>{
        setInterval(() => { setChecked(true) },1500)
        setInterval(() => { setChecked(false)},2000 )
    },[])

   
    return (
        <div className={classes.root}>
            
            <div className={classes.container}>
                <Fade in={checked}>
                    
                <img src={img}width="20%"height="20%" alt="a" draggable="false"/>
                </Fade>
            </div>
        </div>
    )
}