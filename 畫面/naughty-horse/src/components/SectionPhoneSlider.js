import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Container } from "./SectionPhoneSliderComponents/SectionPhoneSliderElement";

import iphoneFrame from "../assets/iphone-frame.png";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

import categoryImg from "../assets/category.png";
import category1Img from "../assets/category_1.png";
import category2Img from "../assets/category_2.png";
import category3Img from "../assets/category_3.png";
import category4Img from "../assets/category_4.png";

class SectionPhoneSlider extends React.Component {
  constructor(props) {
    super(props);
    // console.log('constructor');
    this.state = {};
  }

  // 都會執行 用來直接指派Props
  static getDerivedStateFromProps(props = null) {
    // console.log('getDerivedStateFromProps');
    if (props) {
      return props;
    } else {
      return null;
    }
  }

  // 初始化的最後執行
  componentDidMount() {
    // console.log('componentDidMount');
  }

  // 更新才執行，在render之前 用來處理是否應該更新 true 要 false 不要
  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate');
    return true;
  }
  // 更新才執行，在render之後
  getSnapshotBeforeUpdate() {
    // console.log('getSnapshotBeforeUpdate');
    return null;
  }
  // 更新的最後階段
  componentDidUpdate() {
    // console.log('componentDidUpdate');
  }

  // 被摧毀時執行
  componentWillUnmount() {
    // console.log('componentWillUnmount');
  }

  render() {
    const slideItems = [
      {
        img: slide1,
        text: "顽皮马滚动图1",
      },
      {
        img: slide2,
        text: "顽皮马滚动图2",
      },
      {
        img: slide3,
        text: "顽皮马滚动图",
      },
    ];
    return (
      <>
        <Container>
          <div className="container">
            <div className="sliderbox">
              <Carousel
                className="sliderbox_root"
                showArrows={false}
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
              >
                {slideItems.map((item) => (
                  <div className="sliderbox_root_card">
                    <img
                      className="sliderbox_root_card_img"
                      src={item.img}
                      alt={item.text}
                      title={item.text}
                    />
                  </div>
                ))}
              </Carousel>
              <img
                src={iphoneFrame}
                className="sliderbox_frame"
                alt="手機外框"
              />
            </div>
            <div className="right_area">
              <div className="right_area_top">
                <img src={categoryImg} alt="categoryImg" />
              </div>
              <div className="right_area_bottom">
                <div className="right_area_bottom_item">
                  <img src={category1Img} alt="category1Img" />
                </div>
                <div className="right_area_bottom_item">
                  <img src={category2Img} alt="category2Img" />
                </div>
                <div className="right_area_bottom_item">
                  <img src={category3Img} alt="category3Img" />
                </div>
                <div className="right_area_bottom_item">
                  <img src={category4Img} alt="category4Img" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default SectionPhoneSlider;
