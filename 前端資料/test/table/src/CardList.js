import React from "react"
import { Mediacard } from "./card"
import Grid from "@material-ui/core/Grid";

export default function CardList({ showList }) {

    return (
        <Grid
            container
            justifyContent="center"
            maxWidth="m"
            spacing={3}
        >
            {showList.map((item) => {
                return (
                    <Grid item>
                        <Mediacard item={item} />
                    </Grid>
                )
            })}
        </Grid>
    )
}