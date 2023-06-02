import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

let stopResize;
const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(document.body.clientWidth <= 768);
  const displayItems = [
    items[(currentIndex - 1 + items.length) % items.length],
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
  ];
  const mobileDisplayItems = [
    items[(currentIndex - 1 + items.length) % items.length],
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length],
  ];
  useEffect(() => {
    let timmer = setInterval(
      () => setCurrentIndex((pre) => (pre + 1) % items.length),
      5000
    );
    return () => timmer;
  }, []);
  const event = () => {
    clearTimeout(stopResize);
    stopResize = setTimeout(() => {
      if (document.body.clientWidth <= 767) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 100);
  };
  console.log(document.body.clientWidth, "document.body.clientWidth", isMobile);
  useEffect(() => {
    window.addEventListener("resize", event);
    return () => window.removeEventListener("resize", event);
  }, [window.innerHeight]);

  return (
    <CarouselElement>
      <div className={`carousel-items `}>
        {isMobile
          ? mobileDisplayItems.map((item, index) => (
              <div
                key={index}
                style={{
                  flexBasis: index === 0 || index === 3 ? "100%" : "48%",
                  paddingBottom: index === 0 || index === 3 ? "50%" : "35%",
                }}
                className={`carousel-item ${index === 2 ? "active" : ""}`}
              >
                <img src={item} alt="s" />
              </div>
            ))
          : displayItems.map((item, index) => (
              <div
                key={index}
                style={{
                  flexBasis: index === 2 ? "100%" : "25%",
                  marginLeft: index === 0 && "2em",
                  paddingBottom: index === 2 ? "30%" : "15%",
                }}
                className={`carousel-item ${index === 2 ? "active" : ""}`}
              >
                <img src={item} alt="s" />
              </div>
            ))}
      </div>
    </CarouselElement>
  );
};

export default Carousel;

const CarouselElement = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    justify-content: end;
  }
  .carousel-items {
    display: flex;
    width: 100%;
    transition: transform 0.5s ease;
    gap: 2em;
    @media (max-width: 768px) {
      width: 75%;
      flex-wrap: wrap;
      align-self: end;
      gap: 0.5em;
    }
  }

  .carousel-items.next {
    transform: translateX(-100%);
  }

  .carousel-items.prev {
    transform: translateX(100%);
  }
  @media (max-width: 768px) {
    .carousel-item(1),
    .carousel-item(4) {
      flex-basis: 100%;
    }
  }
  .carousel-item {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-bottom: 15%;
    border-radius: 5px;
    transition: 0.3s;

    img {
      user-select: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: contain;
      -webkit-touch-callout: none;
      @media (max-width: 768px) {
        object-fit: cover;
      }
    }
  }

  .carousel-item.active {
    animation: slide-in 0.5s ease;
  }

  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
