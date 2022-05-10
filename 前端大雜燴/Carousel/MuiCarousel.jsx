import React, { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import imgs from '../../../../assets/test.png'
import Cards from "./Cards";
import Right from '@mui/icons-material/ChevronRight';
import Left from '@mui/icons-material/KeyboardArrowLeft';
const CONTAINER_STYLE = {
    position: "relative",
    width: '100%',
    height: "80vh",
}
const CARD_STYLE = {
    width: "100%",
    height: '90vh',
    borderRadius: "10px",
    boxSizing: "border-box",
}
function Layout({ children, CarouselRef }) {
    return (
        <div style={CONTAINER_STYLE} className='my-auto'>
            <div className='row text-center p-0 m-0' style={{ height: "100%", justifyContent: 'center' }}>
                <div className="col-lg-1 col-xl-1 my-auto p-0" >
                    <IconButton onClick={() => CarouselRef.current.prev()}>
                        <Left color='primary' fontSize='large' />
                    </IconButton>
                </div>
                <div className="col-lg-10 col-xl-10  my-auto">
                    {children}
                </div>
                <div className="col-lg-1 col-xl-1 my-auto">
                    <IconButton onClick={() => CarouselRef.current.next()}>
                        <Right color='primary' fontSize='large' />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
export default function MuiCarousel(props) {
    var items = [imgs, imgs, imgs]
    const CarouselRef = useRef();
    return (
        <Layout CarouselRef={CarouselRef}>
            <Cards spread={'wide'} ref={CarouselRef}>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Cards>
        </Layout>
    )
}

function Item(props) {
    return (
        <img src={props.item} alt="s" style={CARD_STYLE} />
    )
}