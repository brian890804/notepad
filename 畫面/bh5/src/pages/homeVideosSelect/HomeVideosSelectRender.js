import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import LinkComponent from "../component/LinkComponent";
import { pageUrlConstants, metaPageUrl, hub2cyPageUrl, breakPoint } from "../../constants";
// import { colors, pageUrlConstants, metaPageUrl } from "../../constants";
import videoSelect_bg from "../../assets/home/videoSelect_bg.jpg";
import { main_height, sub_height } from "../component/TopBarContainer";
import { bottom_nav_height } from "../component/BottomNavBar";

import gougouIcon from "./gougou.svg";

const HomeVideosSelectPage = () => {
  const intl = useIntl();

  return (
    <HomeVideosSelectPageElement>
      <div className="blur_background_img" />
      <div className="select_container">
        <div className="select_container_box">
          <h2 className="select_container_box_title">
            <p>{intl.formatMessage({ id: "VIDEO.BANNER.TOP1" })}</p>
            <p>{intl.formatMessage({ id: "VIDEO.BANNER.TOP2" })}</p>
          </h2>
          <div className="select_container_box_btns">
            <LinkComponent
              className="select_container_box_btns_btn"
              routes={{
                linkurl: metaPageUrl,
              }}
            >
              <span>
                {intl.formatMessage({ id: "VIDEO.BANNER.BUTTON.LEFT" })}
              </span>
            </LinkComponent>
            <LinkComponent
              className="select_container_box_btns_btn"
              routes={{
                linkurl: hub2cyPageUrl,
              }}
            >
              <span>
                {intl.formatMessage({ id: "VIDEO.BANNER.BUTTON.RIGHT" })}
              </span>
            </LinkComponent>
          </div>
        </div>
        <div className="select_container_box">
          <h2 className="select_container_box_title">
            <p> {intl.formatMessage({ id: "VIDEO.BANNER.TOP3" })}</p>
            <p> {intl.formatMessage({ id: "VIDEO.BANNER.TOP4" })}</p>
          </h2>
          <div className="select_container_box_inside">
            <LinkComponent
              className="select_container_box_inside_btn"
              routes={pageUrlConstants.home.pages.homeMain.pages.homeVideos}
            >
              <img src={gougouIcon} alt="开通视频卡" />
              <span>{intl.formatMessage({ id: "VIDEO.BANNER.START" })}</span>
            </LinkComponent>
          </div>
        </div>
        {/* <LinkComponent 
          className="select_container_meta"
          routes={{
            linkurl: metaPageUrl
          }}
        >
          <h2 className="select_container_meta_title">
            东洋樱花妹和黑料外流
          </h2>
          <h2 className="select_container_meta_title">
            各种暗黑国产品牌视频聚合
          </h2>
          <div className="select_container_meta_btn">
            <img 
              className="select_container_blili_btn_img"
              src={playIcon}
              alt="mata"
            />
            <span className="select_container_meta_btn_text">免费线上无限看</span>
          </div>
        </LinkComponent>

        <LinkComponent 
          className="select_container_blili"
          routes={pageUrlConstants.home.pages.homeMain.pages.homeVideos}
        >
          <h2 className="select_container_blili_title">
            B次元
          </h2>
          <h2 className="select_container_blili_title">
            视频站内爽看
          </h2>
          <div className="select_container_blili_btn">
            <img 
              className="select_container_blili_btn_img"
              src={gougouIcon}
              alt="blili"
            />
            <span className="select_container_blili_btn_text">立即看视频</span>
          </div>
        </LinkComponent> */}
      </div>
      <div className="blur_background_img" />
    </HomeVideosSelectPageElement>
  );
};

HomeVideosSelectPage.propTypes = {};

export default HomeVideosSelectPage;

export const HomeVideosSelectPageElement = styled.div`
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(
    var(--vh, 1vh) * 100 - ${main_height + sub_height + bottom_nav_height}px
  );

  .blur_background_img {
    position: absoulte;
    filter: blur(10px);
    background-size: cover;
    background-image: url(${videoSelect_bg});
    height: 100%;
    width: 50%;

    @media (max-width: ${ breakPoint.mobile }px) {
      width: 0;
    }
  }

  .select_container {
    width:50%;

    @media (max-width: ${ breakPoint.mobile }px) {
      width: 100%;
    }

    text-align: center;
    padding-top: calc(var(--vh, 1vh) * 50 - ${main_height + sub_height}px);
    height: 100%;
    background-size: cover;
    background-image: url(${videoSelect_bg});
    filter: blur(0px);

    &_box {
      &:not(:first-child) {
        margin-top: 30px;
      }

      &_title {
        font-size: 26px;
        line-height: 1.3em;
        font-weight: 700;
        color: #fff;
        filter: drop-shadow(1px 1px 5px #000) drop-shadow(3px 3px 5px #000);
      }

      &_inside,
      &_btns {
        display: flex;
        width: 95%;
        margin: auto;
        justify-content: center;
        &_btn {
          flex-grow: 1;
          align-self: center;
          width: 0;
          cursor: pointer;
          padding: 18px 0;
          margin: 5px;
          max-width: 230px;
          background-image: linear-gradient(to right, #fa719a 0, #f24c7c 100%);
          border-radius: 100px;
          box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.45);
          text-decoration: none;

          span {
            font-size: 19px;
            vertical-align: middle;
            color: #fff;
            font-weight: 900;
          }
        }
      }

      &_inside {
        &_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 470px;
          background-image: unset;
          background-color: #fff;
          span {
            margin-left: 5px;
            color: #000;
          }
        }
      }
    }

    /* &_meta,
    &_blili {
      display: block;
      text-decoration: none;
      filter: drop-shadow(0 5px 6px #000a);

      &_title {
        font-size: 26px;
        line-height: 1.3em;
        font-weight: 700;
        color: #fff;
      }

      &_btn {
        cursor: pointer;
        padding: 10px 0;
        margin-top: 10px;
        width: 80vw;
        max-width: 400px;
        background-image: linear-gradient(to right, #fa719a 0, #f24c7c 100%);
        border-radius: 100px;

        &_img {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }

        &_text {
          font-size: 20px;
          vertical-align: middle;
          color: #fff;
          font-weight: 900;
        }
      }
    }

    &_blili {
      margin-top: 30px;

      &_btn {
        background-color: #fff;
        background-image: unset;

        &_text {
          color: #000;
        }
      }
    } */
  }
`;
