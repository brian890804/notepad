import React from "react"
import { TestGame } from './TestGame';
import Grid from '@material-ui/core/Grid';
export default function TestGameList() {
    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center">
            <Grid item >
                <TestGame />
            </Grid>
        </Grid>

    );
}