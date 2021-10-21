import React from "react"
import Grid from '@material-ui/core/Grid';
import { TextForm } from "./Text/TextForm";
import { UploadPic } from "../test/UploadPic"

export function EditPage() {
    return (
        <>
            <Grid
                contrainer
                justifyContent="center"
                alignContent="center"
            >
                <Grid item>
                    <UploadPic name="1"/>
                </Grid>
                <Grid item>
                    <UploadPic name="2"/>
                </Grid>
                <Grid item>
                    <TextForm />
                </Grid>
            </Grid>
        </>
    );
}