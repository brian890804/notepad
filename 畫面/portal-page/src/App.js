import { useCallback, useEffect } from "react";
import Particles from "react-particles";
import styled from "@emotion/styled/macro";
import { loadFull } from "tsparticles";
import option from "./particlesOptions.json";
import title from "./assets/img-rukou.svg";
import backgroundImg from "./assets/img-topbg.png";
import "./App.css";

const apiDomain = [
  "https://bcy01.com",
  "https://acf001.com",
  "https://b2c2y2.com",
  "https://bc6y9.com",
  "https://joboja2.b29c58y.com",
  "https://bd51u.com",
  "https://ij21vv.com",
  "https://sjcdsuw.cn",
];

const App = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // const particlesLoaded = useCallback(async (container) => {
  //   await console.log(container);
  // }, []);
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    return {
      userAgent,
      language,
      screenWidth,
      screenHeight,
    };
  };
  useEffect(() => {
    console.log(getDeviceInfo());
  }, []);
  async function checkProceedUrl() {
    for (let i = 0; i < apiDomain.length; i++) {
      const random = Math.floor(Math.random() * apiDomain.length);
      try {
        const response = await fetch(apiDomain[random]);
        if (response.status === 200) {
          window.location.href = apiDomain[random];
          break;
        }
      } catch (error) {}
    }
  }

  return (
    <PageElement>
      <div className="portal_title_container">
        <img src={backgroundImg} alt="" className="portal_bg" />
        <img src={title} className="portal_title" alt="B次元入口站標題" />
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        // loaded={particlesLoaded}
        options={option}
      />
      <main className="content">
        <div className="content_cover">
          <div className="content_cover_title">欢迎进入我们的入口页</div>
          <div className="content_cover_content">
            您可以点击按钮前往观看在线动漫 进入后务必「收藏地址」以免遗失
          </div>
          <div className="content_cover_button" onClick={checkProceedUrl}>
            立即✧◝(⁰▿⁰)◜✧进入
          </div>
        </div>
      </main>
    </PageElement>
  );
};

export default App;

export const PageElement = styled.div`
  /*  */
  min-height: calc(var(--vh, 1vh) * 100);
  .portal {
    &_bg {
      width: 100%;
      object-fit: cover;
      @media (max-width: 899px) {
        height: 200px;
      }
    }
    &_title {
      &_container {
        position: relative;
        overflow: hidden;
        padding-bottom: 1%;
        -webkit-transition: 0.3s;
        width: 100%;
        transition: 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 899px) {
          padding-bottom: 5%;
        }
      }
      z-index: 1;
      user-select: none;
      position: absolute;
      width: 100%;
      height: 30%;
      max-height: 70px;
      vertical-align: middle;
      object-fit: contain;
      @media (max-width: 899px) {
        height: 20%;
        max-height: 55px;
      }
    }
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    &_cover {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.38);
      background-color: #fff;
      padding: 30px;
      max-width: 250px;
      &_title {
        font-weight: 900;
        font-size: 18px;
      }
      &_content {
        font-size: 14px;
        color: #646464;
        padding-left: 20px;
        padding-right: 20px;
      }
      &_button {
        font-size: 18px;
        border-radius: 38.5px;
        background-color: #ff4178;
        color: #fff;
        padding: 10px 40px;
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
`;
