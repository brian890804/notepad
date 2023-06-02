import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";

import styled from "@emotion/styled";

import SectionPhoneSlider from "./components/SectionPhoneSlider";
import { SectionHighLight } from "./components/SectionHighLight";

import mobileBackgroundImage0 from "./assets/mobile/home0.png";
import mobileBackgroundImage1 from "./assets/mobile/home1.jpg";
import mobileBackgroundImage2 from "./assets/mobile/home2.jpg";

import backgroundImage0 from "./assets/home0.png";
import backgroundImage1 from "./assets/home1.jpg";
import backgroundImage2 from "./assets/home2.jpg";
import SectionMain from "./components/SectionMain";
import MobileSectionMain from "./components/MobileSectionMain";

const SectionItem = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: 0.3s;
  @media (min-width: 768px) {
    background-attachment: fixed;
  }
`;

let sectionData = {
  mobile: [
    {
      element: MobileSectionMain,
      backgroundImage: mobileBackgroundImage0,
    },
    {
      element: SectionPhoneSlider,
      backgroundImage: mobileBackgroundImage1,
    },
    {
      element: SectionHighLight,
      backgroundImage: mobileBackgroundImage2,
    },
  ],
  desktop: [
    {
      element: SectionMain,
      backgroundImage: backgroundImage0,
    },
    {
      element: SectionPhoneSlider,
      backgroundImage: backgroundImage1,
    },
    {
      element: SectionHighLight,
      backgroundImage: backgroundImage2,
    },
  ],
};
// 防止過度刷新導致lag的處理
let stopResize;
let stopScroll;
let checkScroll = true;

function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
        return supportsPassive;
      },
    })
  );
} catch (e) {}

// var wheelOpt = supportsPassive ? { passive: false } : false;

// window.addEventListener("touchmove", preventDefault, wheelOpt);

function App() {
  const [nowMediaQuery, setNowMediaQuery] = useState("mobile");

  const [nowScroll, setNowScroll] = useState(0);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const wheelElement = useRef(null);

  // 防止過度刷新導致lag的處理
  window.addEventListener("resize", () => {
    clearTimeout(stopResize);
    stopResize = setTimeout(() => {
      moveContainer(0);
      setWindowHeight(window.innerHeight);
      if (document.body.clientWidth <= 767) {
        setNowMediaQuery("mobile");
      } else {
        setNowMediaQuery("desktop");
      }
    }, 100);
  });

  const upHandler = () => {
    moveContainer(1);
  };

  const downHandler = () => {
    moveContainer(-1);
  };

  const moveContainer = (number) => {
    setNowScroll(
      nowScroll + number <= 0
        ? 0
        : nowScroll + number >= sectionData[nowMediaQuery].length - 1
        ? sectionData[nowMediaQuery].length - 1
        : nowScroll + number
    );
  };

  // const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  // const isTablet = useMediaQuery({ minWidth: 450, maxWidth: 1224 });
  // const isMobile = useMediaQuery({ maxWidth: 450 });

  useEffect(() => {
    if (document.body.clientWidth <= 767) {
      setNowMediaQuery("mobile");
    } else {
      setNowMediaQuery("desktop");
    }
  }, [windowHeight]);

  const handlers = useSwipeable({
    onSwipedUp: (eventData) => {
      upHandler();
    },
    onSwipedDown: (eventData) => {
      downHandler();
    },
  });

  return (
    <>
      {/* <SideNav /> */}
      <div
        // className="wheel_container"
        style={{
          height: windowHeight + "px",
          // overflow: "auto",
        }}
      >
        {sectionData[nowMediaQuery].map((value, index) => {
          return (
            <SectionItem
              key={"section_" + index}
              backgroundImage={value.backgroundImage}
              className="section"
              style={{
                height: windowHeight + "px",
              }}
            >
              <value.element nowMediaQuery={nowMediaQuery} />
            </SectionItem>
          );
        })}
      </div>
    </>
  );
}

export default App;
