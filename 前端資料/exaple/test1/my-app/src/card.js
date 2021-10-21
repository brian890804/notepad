import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {ButtonAddControl} from "./ButtonAddContorl";
const useStyles = makeStyles({
    root: {
        
        width: 210,
        marginBottom:5,
        marginLeft:1,
    },
    media: {
       height: 200,
    },
});
const submit=(request)=>{
    return(request)
    
}
export function Mediacard({ item }) {
    const classes = useStyles();
    return (
        <><Card className={classes.root}draggable="false">
        <CardActionArea >
            <CardMedia
                className={classes.media}
                component="img" draggable="false"
                image={item.src}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {item ? item.Product : null}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item ? item.Content : null}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <ButtonAddControl submit={submit}/>
        </CardActions>
    </Card >
    <div></div>
        </>
            
    );

}
