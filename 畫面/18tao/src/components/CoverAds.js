import React, { useEffect, useRef } from "react";

import styled from "@emotion/styled";

import popAdBanner from "../assets/popAdBanner.jpg";
import popAd1 from "../assets/popAd1.gif";
import popAd2 from "../assets/popAd2.gif";
import popAd3 from "../assets/popAd3.gif";
import popAd4 from "../assets/popAd4.gif";
import popAd5 from "../assets/popAd5.gif";
import popAd6 from "../assets/popAd6.gif";
import popAd7 from "../assets/popAd7.gif";
import popAd8 from "../assets/popAd8.gif";
// import popAd9 from "../assets/popAd9.jpg";
// import popAd10 from "../assets/popAd10.gif";
import popAd11 from "../assets/popAd11.gif";
import popAd12 from "../assets/popAd12.gif";

const CoverAdsItem = styled.div`
  /* display: none !important; */
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  &.hide {
    .container {
      top: -100%;
      opacity: 0;
    }
  }
  .container {
    position: relative;
    top: 0;
    width: 95%;
    max-width: 400px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    opacity: 1;
    transition: 1s;

    &_header {
      flex-shrink: 0;
      &_img {
        width: 100%;
        vertical-align: middle;
      }
    }
    &_body {
      flex-grow: 1;
      padding: 5px 0;
      overflow: auto;
      &_item {
        display: block;
        width: 100%;
        padding: 5px 10px;
        &_img {
          border-radius: 5px;
          width: 100%;
          vertical-align: middle;
        }
      }
    }
    &_footer {
      flex-shrink: 0;
      cursor: pointer;
      letter-spacing: 2px;
      font-size: 12px;
      color: #fff;
      background-color: #FA719A;
      padding: 15px 0;
      text-align: center;
    }
  }
    /* .cover {
      &_img {
        max-height: 60vh;
      }

      &_close {
        cursor: pointer;
        position: absolute;
        left: 50%;
        bottom: -10%;
        transform: translateX(-50%);
        width: 10vw;
        max-width: 44px;
        height: 10vw;
        max-height: 44px;
        border-radius: 50%;
        border: 2px solid #fff;

        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 60%;
          height: 4px;
          background-color: #fff;
          top: 50%;
          left: 50%;
        }

        &::before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }
  @media (min-width: 767px) {
    .container {
      .cover_img {
        height: 64vh;
      }
    }
  } */
`;

const baaanrData = {
  url: "https://bli2acg.com/autopay",
  img: popAdBanner
}

const adsList = [
  {
    title: "死神 ",
    url: "https://blid2.com/bq69C/lp",
    img: popAd8,
  },
  {
    title: "世界杯",
    url: "https://blid2.com/pFBBU/lp",
    img: popAd1,
  },
  {
    title: "催眠",
    url: "https://blid2.com/HAW-9d95d2w11fw/lp",
    img: popAd4,
  },
  {
    title: "世足賽",
    url: "https://blid2.com/pFBBU/40080",
    img: popAd11,
  },
  {
    title: "翻倍獎金,世足,翻倍送",
    url: "https://bli2pay.com/NQ64F/40080",
    img: popAd12,
  },
 
];

export default function CoverAds() {
  const popElement = useRef(null);

  const closeBar = function () {
    popElement.current.style.display = "none";
  };

  useEffect(() => {
    setTimeout(() => {
      popElement.current.classList.remove("hide");
    }, 0);
  }, []);

  return (
    <CoverAdsItem className="hide" ref={popElement}>
      <div className="container">
        <div className="container_header">
          
          <a
            // href={baaanrData.url}
            href="##"
            // rel="noreferrer"
            // target="_blank"
          >
            <img
              className="container_header_img"
              src={baaanrData.img}
              alt="B次元下載"
            />
          </a>
        </div>
        <div 
          className="container_body"
          onTouchMove={(e)=>{
            e.stopPropagation();
          }}
        >
          {adsList.map((data) => {
            return (
              <a
                className="container_body_item"
                href={data.url}
                rel="noreferrer"
                target="_blank"
                key={data.title}
              >
                <img
                  className="container_body_item_img"
                  src={data.img}
                  alt={data.title}
                  title={data.title}
                />
              </a>
            );
          })}
        </div>
        <div 
          className="container_footer"
          onClick={closeBar}
        >关闭视窗</div>
        {/* <a href='http://pp2.rtvtbmuhlhaq.online/?a=e6xeni' rel="noreferrer" target="_blank">
          <img className="cover_img" src={showImg} alt="ads"/>
        </a>
        <div className="cover_close" onClick={closeBar}/> */}
      </div>
    </CoverAdsItem>
  );
}
