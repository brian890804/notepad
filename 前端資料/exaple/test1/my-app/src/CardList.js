import React from "react"
import { Mediacard } from "./card"
import Grid from "@material-ui/core/Grid";

export default function CardList({ showList }) {

    return (
        <Grid
            container
            justifyContent="center"
            maxWidth="lg"
            xs={12}
            draggable="false"
        >
            {showList.map((item) => {
                return (
                    <Mediacard item={item} />
                )
            })}
        </Grid>
    )
}