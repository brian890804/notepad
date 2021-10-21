import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
export function ButtonAdd({ handleClick, count }) {


    return (
        <>
            <Grid item>
                <Button variant="contained" color="primary" onClick={() => { handleClick(true) }}>+</Button>
                <Button variant="contained" disabled>{count}</Button>
                <Button variant="contained" color="secondary" onClick={() => { handleClick(false) }}>-</Button>
            </Grid>
            <Grid item xs={12} />
        </>

    );
}