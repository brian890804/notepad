import { useRef } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "@emotion/styled/macro";
import TopBarContainer from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { colors, downloadPage, padding } from "../../constants";

import html2canvas from "html2canvas";

import QRCode from "qrcode.react";

import shareBackImg from "../../assets/profile/share.jpg";
// import callToast from "../../modules/toastCall";

import qqIcon from "../../assets/icons/sicon-qq.svg";
import tiktokIcon from "../../assets/icons/sicon-tiktok.svg";
import wechatIcon from "../../assets/icons/sicon-wechat.svg";
import telegramIcon from "../../assets/icons/sicon-telegram.svg";
import zihuIcon from "../../assets/icons/sicon-zihu.png";
import weiboIcon from "../../assets/icons/sicon-weibo.svg";
import fbIcon from "../../assets/icons/sicon-fb.svg";
import lineIcon from "../../assets/icons/sicon-line.svg";
import igIcon from "../../assets/icons/sicon-ig.png";
import hokIcon from "../../assets/icons/sicon-hok.png";
import lolIcon from "../../assets/icons/sicon-lol.png";
import mihoyoIcon from "../../assets/icons/sicon-mihoyo.png";

import arrowDownIcon from "../../assets/icons/arrow_down.svg";
import { navigatorShare } from "../../reducers/actions/utilities";

const socialIconList = [
  qqIcon,
  tiktokIcon,
  wechatIcon,
  telegramIcon,
  zihuIcon,
  weiboIcon,
  lineIcon,
  fbIcon,
  igIcon,
];
const gameIconList = [lolIcon, hokIcon, mihoyoIcon];

let timer;
let touchduration = 500;

const ProfileShare = ({ user, adsList }) => {
  const intl = useIntl();
  const shareCatchRef = useRef();
  const arrowRef = useRef();

  async function saveUrl() {
    // html2canvas(document.getElementById("root"), {
    //   allowTaint: true
    // }).then(async function(canvas) {
    // const dataUrl = canvas.toDataURL();
    // const blob = await (await fetch(dataUrl)).blob();
    // const filesArray = [
    //   new File(
    //     [blob],
    //     'animation.png',
    //     {
    //       type: blob.type,
    //       lastModified: new Date().getTime()
    //     }
    //   )
    // ];
    navigatorShare({
      title: "",
      text:
        intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_1" }) +
        (user.share_ma
          ? intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_2" }) +
            user.share_ma
          : "") +
        intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_3" }),
      url: downloadPage[1],
      // files: filesArray,
    });
    // });
  }
  function savePage() {
    /* background-image: url(${({back_img}) =>back_img}); */
    shareCatchRef.current.style.backgroundImage = "url(" + shareBackImg + ")";
    arrowRef.current.style.display = "none";
    html2canvas(shareCatchRef.current, {
      allowTaint: true,
    }).then(function (canvas) {
      shareCatchRef.current.style.backgroundImage = "none";
      arrowRef.current.style.display = "block";
      let link = document.createElement("a");
      link.download = "2次元分享.jpg";
      link.href = canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    });
  }
  function qrcodeStart(e) {
    timer = setTimeout(qrcodeLong, touchduration);
  }
  function qrcodeEnd(e) {
    if (timer) {
      clearTimeout(timer);
    }
  }

  function qrcodeLong() {
    let link = document.createElement("a");
    link.href = downloadPage[1];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }

  function scrollDown() {
    window.scrollTo({
      top: document.body.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <ProfileShareElement
      // 因為需要儲存圖片所以這邊必須要本地圖片
      // back_img={adsList.share_banner ? adsList.share_banner[0].picurl : ""}
      back_img={shareBackImg}
    >
      <TopBarContainer show_shadow={false}>
        <TopTitleBar back_color="transparent" showBack={true} />
      </TopBarContainer>
      <div ref={shareCatchRef} className="share">
        <div className="share_info">
          <div className="share_info_qrcode">
            <div className="share_info_qrcode_item">
              <QRCode
                className="share_info_qrcode_item_img"
                value={downloadPage[1]}
                onTouchStart={qrcodeStart}
                onTouchEnd={qrcodeEnd}
              />
            </div>
            <div className="share_info_qrcode_description">
              <div className="share_info_qrcode_description_header">
                <p className="share_info_qrcode_description_header_title">
                  {intl.formatMessage({ id: "PROFILE.SHARE.LABEL.SCAN_CODE" })}
                </p>
                {/* <p className="share_info_qrcode_description_header_subtitle">或长按二维码识别下载</p> */}
              </div>
              <div className="share_info_qrcode_description_body">
                <p className="share_info_qrcode_description_body_text">
                  {intl.formatMessage({
                    id: "PROFILE.SHARE.LABEL.WRITE.MY_INVITED_CODE",
                  })}
                </p>
                <p className="share_info_qrcode_description_body_code">
                  {user.share_ma}
                </p>
              </div>
            </div>
          </div>
          <div className="share_info_btn">
            <div className="share_info_btn_button" onClick={savePage}>
              <div className="share_info_btn_button_text">
                {intl.formatMessage({
                  id: "PROFILE.SHARE.LABEL.SAVE.MY_INVITED_CODE",
                })}
              </div>
            </div>
            <div className="share_info_btn_button" onClick={saveUrl}>
              <div className="share_info_btn_button_text">
                {intl.formatMessage({
                  id: "PROFILE.SHARE.LABEL.URL",
                })}
              </div>
            </div>
          </div>
        </div>
        <div ref={arrowRef} className="arrow_down" onClick={scrollDown}>
          <img
            className="arrow_down_img"
            src={arrowDownIcon}
            alt="arrow down"
          />
        </div>
      </div>
      <div className="teach">
        <div className="teach_container">
          <div className="teach_container_info">
            <p className="teach_container_info_text">
              {intl.formatMessage({
                id: "PROFILE.SHARE.DESCRIPTION_4",
              })}
            </p>
            <p className="teach_container_info_text">
              {intl.formatMessage({
                id: "PROFILE.SHARE.DESCRIPTION_5",
              })}
            </p>
            <p className="teach_container_info_text">
              {intl.formatMessage({
                id: "PROFILE.SHARE.DESCRIPTION_6",
              })}
            </p>
          </div>
          <div className="teach_container_shareflow">
            <div className="teach_container_shareflow_title">
              <p className="teach_container_shareflow_title_text">
                {intl.formatMessage({
                  id: "PROFILE.SHARE.LABEL.STEP",
                })}
              </p>
            </div>
            <ol className="teach_container_shareflow_list">
              <li className="teach_container_shareflow_list_item">
                <div className="teach_container_shareflow_list_item_header">
                  <span className="teach_container_shareflow_list_item_header_text">
                    1
                  </span>
                </div>
                <div className="teach_container_shareflow_list_item_body">
                  <p className="teach_container_shareflow_list_item_body_text">
                    {intl.formatMessage({
                      id: "PROFILE.SHARE.LABEL.STEP_1",
                    })}
                  </p>
                </div>
              </li>
              <li className="teach_container_shareflow_list_item">
                <div className="teach_container_shareflow_list_item_header">
                  <span className="teach_container_shareflow_list_item_header_text">
                    2
                  </span>
                </div>
                <div className="teach_container_shareflow_list_item_body">
                  <p className="teach_container_shareflow_list_item_body_text">
                    {intl.formatMessage({
                      id: "PROFILE.SHARE.LABEL.STEP_2",
                    })}
                  </p>
                  <div className="teach_container_shareflow_list_item_body_icon">
                    {socialIconList.map((url) => {
                      return (
                        <img
                          className="teach_container_shareflow_list_item_body_icon_img"
                          src={url}
                          alt="social"
                        />
                      );
                    })}
                  </div>
                  <p className="teach_container_shareflow_list_item_body_text">
                    {intl.formatMessage({
                      id: "PROFILE.SHARE.LABEL.STEP_2_1",
                    })}
                  </p>
                  <div className="teach_container_shareflow_list_item_body_icon">
                    {gameIconList.map((url) => {
                      return (
                        <img
                          className="teach_container_shareflow_list_item_body_icon_img"
                          src={url}
                          alt="social"
                        />
                      );
                    })}
                  </div>
                </div>
              </li>
              <li className="teach_container_shareflow_list_item">
                <div className="teach_container_shareflow_list_item_header">
                  <span className="teach_container_shareflow_list_item_header_text">
                    3
                  </span>
                </div>
                <div className="teach_container_shareflow_list_item_body">
                  <p className="teach_container_shareflow_list_item_body_text">
                    {intl.formatMessage({
                      id: "PROFILE.SHARE.LABEL.STEP_3",
                    })}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <img className="background_image" src={shareBackImg} alt="background" />
    </ProfileShareElement>
  );
};

const ProfileShareStateToProps = (state) => {
  return {
    user: state.user,
    adsList: state.adsList,
  };
};

const ProfileShareDispatchToProps = (dispatch) => {
  return {};
};

const ProfileShareElement = styled.div`
  /*  */
  .share,
  .teach {
    position: relative;
    z-index: 1;
  }

  .background_image {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    margin: 0 auto;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    object-fit: cover;
  }

  .arrow_down {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    filter: drop-shadow(0 0 3px #000);
    animation-name: arrow-move;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: liner;

    &_img {
      width: 60px;
    }
  }

  @keyframes arrow-move {
    0% {
      transform: translateX(-50%) translateY(0);
    }

    100% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  .teach {
    padding: 16px;

    &_container {
      padding: 10px;
      color: #fff;
      background-color: #0008;
      border-radius: 10px;

      &_info {
        &_text {
          font-size: 24px;
          line-height: 1.2em;
          font-weight: 700;
        }
      }

      &_shareflow {
        margin-top: 20px;

        &_list {
          margin-top: 20px;

          &_item {
            position: relative;
            display: flex;
            padding-bottom: 30px;
            font-size: 24px;
            line-height: 1.8em;
            font-weight: 900;

            &_header {
              &::after {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0.87em;
                width: 0.2em;
                background-color: #fde17b;
              }

              &_text {
                position: relative;
                z-index: 2;
                display: block;
                padding: 0 0.7em;
                margin-right: 20px;
                color: #000;
                background-color: #fde17b;
              }
            }

            &_body {
              &_icon {
                display: flex;
                flex-wrap: wrap;

                &_img {
                  margin: 10px;
                  margin-left: 0;
                  width: 60px;
                  height: 60px;
                }
              }
            }

            &:last-of-type {
              .teach_container_shareflow_list_item_header {
                &::after {
                  content: unset;
                }
              }
            }
          }
        }

        &_title {
          &_text {
            font-size: 30px;
            font-weight: 700;
            color: #fde17b;
          }
        }
      }
    }
  }

  .share {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-position: center;
    background-size: cover;

    /* background-image: url(${({ back_img }) => back_img}); */

    &_info {
      padding: ${padding}px;

      &_qrcode {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;

        &_item,
        &_description {
          width: 50%;
          text-align: center;
        }

        &_item {
          &_img {
            width: 100px !important;
            height: 100px !important;
            vertical-align: middle;
          }
        }

        &_description {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          &_header {
            &_title {
              font-weight: 900;
              font-size: 16px;
            }

            &_subtitle {
              margin-top: 5px;
              font-size: 12px;
            }
          }

          &_body {
            &_text {
              font-size: 12px;
            }

            &_code {
              margin-top: 5px;
              font-weight: 900;
              font-size: 20px;
            }
          }
        }
      }

      &_btn {
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;

        &_button {
          cursor: pointer;
          padding: 15px 0;
          box-sizing: border-box;
          width: 40%;
          font-size: 14px;
          text-align: center;
          color: ${colors.dark_pink};
          background-color: #fff;
          border-radius: 5px;
          font-weight: 900;

          &:last-child {
            color: #fff;
            background-color: ${colors.dark_pink};
          }
        }
      }
    }
  }
`;

export default withRouter(
  connect(ProfileShareStateToProps, ProfileShareDispatchToProps)(ProfileShare)
);
