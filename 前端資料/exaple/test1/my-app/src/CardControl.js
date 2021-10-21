import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import Carousel from 'react-bootstrap/Carousel';
import buycar from "./Buycar.json"
import "./card.css";
export default function CardControl() {
    const [page, setPage] = useState(0);
    const [show, setShow] = useState(4)
    const [showCarts, setShowCarts] = useState([])

    const handleSelect = (selectedIndex, e) => {
        setPage(selectedIndex);
    };
    useEffect(() => {
        let totalPage = Math.ceil(buycar.length / show)
        let showCartsTemp = []
        for (let i = 1; i <= totalPage; i++) {
            let showCartTemp = []
            for (let k = i * show - show; k < i * show; k++) {
                if (buycar[k]) {
                    showCartTemp.push(buycar[k])
                }

            }
            showCartsTemp.push(showCartTemp)
        }
        setShowCarts(showCartsTemp)
    }, [])


    return (
        <Carousel activeIndex={page} onSelect={handleSelect} style={{ width: "300%", height: "50%"}}>
            {showCarts.map((showCart, index) => {
                return (
                    <Carousel.Item> 
                        <CardList showList={showCart}/>
                    </Carousel.Item>
                )
            })}

        </Carousel>
    );
}