import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
export default function MyCarousel() {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: '/media/logos/ANKLES_LOGO.jpeg'
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: '/media/logos/logo-1.svg'
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <Paper sx={{ minHeight: 300, padding: 1 }}>
            <img src={toAbsoluteUrl(props.item.url)}
                alt="s"
                style={{ margin: 'auto', display:'flex',maxHeight:280,justifyContent:'center'}} />
        </Paper>
    )
}