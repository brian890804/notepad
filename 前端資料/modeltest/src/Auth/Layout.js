import React from "react";
import Contrainer from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Header from "../YellowPages/Revise/Header/Header";
import ButtonNavigation from "./ButtonoNavigation";

export function Layout({ children }) {
    return (
        <Contrainer maxWidth='xs'>
            <Paper style={{ width: "100%" }}>
                <Contrainer maxWidth='lg'>
                        <Header />
                        <Grid  className="pt-2">
                            {children}
                        </Grid>
                        <ButtonNavigation/>
                </Contrainer>
            </Paper>
        </Contrainer>
    );
}