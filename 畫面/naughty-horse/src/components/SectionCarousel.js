import React from "react";

import { SectionCarouselItem } from "./SectionCarouselComponents/SectionCarouselElement";

import Carousel from "./SectionCarouselComponents/Carousel";
import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.jpg";
import carousel4 from "../assets/carousel4.jpg";
import carousel5 from "../assets/carousel5.jpg";
import carousel6 from "../assets/carousel6.jpg";

class SectionCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 都會執行 用來直接指派Props
  static getDerivedStateFromProps(props = null) {
    if (props) {
      return props;
    } else {
      return null;
    }
  }

  render() {
    const { state } = this;
    const { bottomListData, nowMediaQuery } = state;
    return (
      <SectionCarouselItem>
        <Carousel
          items={[
            carousel1,
            carousel2,
            carousel3,
            carousel4,
            carousel5,
            carousel6,
          ]}
        />
      </SectionCarouselItem>
    );
  }
}

export default SectionCarousel;
