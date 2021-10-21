import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import img from "./img/img.jpg";
const useStyles = makeStyles({
    root: {
        
        width: 200,
    },
    media: {
       height: 140,
    },
});

export function Mediacard({ item }) {
    const classes = useStyles();
    return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
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
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary" >
                        Learn More
                    </Button>
                </CardActions>
            </Card >
    );

}
