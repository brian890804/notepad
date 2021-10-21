
import {EzproductControl}from"./EzproductControl";
import Grid from '@material-ui/core/Grid';
export function EzproductList() {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            xs={4}
        >

            <EzproductControl/>

        </Grid>
    );
}