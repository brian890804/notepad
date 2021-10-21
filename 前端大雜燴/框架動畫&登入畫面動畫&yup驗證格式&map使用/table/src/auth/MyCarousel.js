import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Grid from '@material-ui/core/Grid';
export function MyCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
    >

        <Carousel activeIndex={index} onSelect={handleSelect}style={{width:"50%"}}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images2.gamme.com.tw/news2/2013/21/99/p6CRop6ckqWW.jpg"
              alt="First slide"
              draggable="false"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="http://p0.itc.cn/images01/20200724/fc8ac1b9fe844388a62288f238006b9f.jpeg"
              alt="Second slide"
              draggable="false"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i1.kknews.cc/SIG=pv502v/ctp-vzntr/o0s702254rq14s61n948q8o2369nq0qs.jpg"
              alt="Third slide"
              draggable="false"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

    </Grid>

  );
}

