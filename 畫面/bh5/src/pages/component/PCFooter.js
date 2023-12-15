import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { nowLang } from "../../i18n/Metronici18n";
import QRCode from "qrcode.react";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";

import logo from "../../assets/topbar/logo_p.svg";
import app_download from "../../assets/topbar/app_download.svg";
import app_download_dark from "../../assets/topbar/app_download_dark.svg";
import friend_socrial from "../../assets/topbar/friend_socrial.svg";
import friend_socrial_dark from "../../assets/topbar/friend_socrial_dark.svg";

import {
  colors,
  downloadPage,
  officialContact,
  profileFeedback,
  profileService,
} from "../../constants";
import { pageUrlConstants } from "../../constants";
import LinkComponent from "./LinkComponent";

export const bottom_footer_height = "250px";

let timer;
let touchduration = 500;
const { home } = pageUrlConstants;

const QrCode = () => {
  const [isHover, setIsHover] = useState(false);
  const intl = useIntl();
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
  function onHover() {
    setIsHover(true);
  }
  function onLeaveHover() {
    setIsHover(false);
  }
  return (
    <QrCodeElement>
      <div className="qrcode">
        <div>
          <img
            onMouseEnter={onHover}
            onMouseLeave={onLeaveHover}
            className={"search_bar_nav_item_btn_img"}
            src={isHover ? app_download_dark : app_download}
            alt={"app_download"}
          />
        </div>
        <div className="pt-1 qrcode_text">
          {intl.formatMessage({ id: "GLOBAL.ACTION.DOWNLOAD.APP" })}
        </div>
        <div className="qrcode_float">
          <ol>
            <li>
              {intl.formatMessage({
                id: "GLOBAL.ACTION.DOWNLOAD.APP_DESCRIPTION",
              })}
            </li>
            <li>
              <QRCode
                className="share_info_qrcode_item_img"
                value={downloadPage[1]}
                onTouchStart={qrcodeStart}
                onTouchEnd={qrcodeEnd}
              />
            </li>
          </ol>
        </div>
      </div>
    </QrCodeElement>
  );
};
const QrCodeElement = styled.div`
  /*  */
  margin-right: 2em;
  font-size: 1.1rem;

  .qrcode {
    position: relative;
    white-space: nowrap;
    color: ${colors.text_grey};
    &_float {
      display: none;
    }
    li {
      margin: 5px;
    }
    &:hover {
      .qrcode_float {
        z-index: 100;
        font-size: 14px;
        color: ${colors.text_grey};
        background-color: #fff;
        padding: 5px;
        text-align: center;
        position: absolute;
        display: flex;
        bottom: 100px;
        left: -50px;
        border-radius: 5px;
        box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
        z-index: 1;
      }
      .qrcode_text {
        color: ${colors.back_dark_pink};
      }
    }
  }
`;

const FriendSocial = () => {
  const intl = useIntl();
  const [isHover, setIsHover] = useState(false);
  function onClick() {
    window.open(officialContact);
  }
  function onHover() {
    setIsHover(true);
  }
  function onLeaveHover() {
    setIsHover(false);
  }
  return (
    <FriendSocialElement className="cursor" onClick={onClick}>
      <img
        onMouseEnter={onHover}
        onMouseLeave={onLeaveHover}
        className={"search_bar_nav_item_btn_img"}
        src={isHover ? friend_socrial_dark : friend_socrial}
        alt={"friend_socrial"}
      />
      <div className="pt-1 ">
        {intl.formatMessage({
          id: "PROFILE.MAIN.OPTION.OFFICIAL_FRIEND_GROUP",
        })}
      </div>
    </FriendSocialElement>
  );
};
const FriendSocialElement = styled.div`
  /*  */
  font-size: 1.1rem;
  :hover {
    color: ${colors.back_dark_pink};
  }
`;
const PCFooter = ({ PCFooterStatus }) => {
  const intl = useIntl();
  let urlItems = [
    {
      text: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.COMMON_PROBLEM",
      }),
      onClick: () => window.open(profileService),
    },
    {
      text: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.CONTACT_US",
      }),
      onClick: () => window.open("mailto: cs@bbacgn.com"),
    },
    {
      text: intl.formatMessage({
        id: "PROFILE.FEEBACK.LABEL.FEEBACK",
      }),
      onClick: () => window.open(profileFeedback),
    },
  ];
  let serviceTerms = [
    {
      text: intl.formatMessage({
        id: "PC.FOOTER.USER.PRIVACY.POLICY",
      }),
      url: {
        name: home.pages.homeProtocol.pages.homeEULA.name,
        path: home.pages.homeProtocol.pages.homeEULA.path,
      },
    },
    {
      text: intl.formatMessage({
        id: "PC.FOOTER.USER.SERVICES.AGREEMENT",
      }),
      url: {
        name: home.pages.homeProtocol.pages.homeTSM.name,
        path: home.pages.homeProtocol.pages.homeTSM.path,
      },
    },
  ];
  let friendUrlItems = [
    // {
    //   text: "友情链结1",
    //   onClick: "",
    // },
    // {
    //   text: "友情链结2",
    //   onClick: "",
    // },
    // {
    //   text: "友情链结3",
    //   onClick: "",
    // },
    // {
    //   text: "友情链结4",
    //   onClick: "",
    // },
  ];
  return (
    <PCFooterElement
      style={{ display: PCFooterStatus ? "block" : "none" }}
      className="PCFooterElement"
    >
      <div className="area">
        <div className="area_left">
          <div className="area_left_img">
            <img src={logo} alt="B次元LOGO" className="mr-3 mb-2" />
          </div>
          <Grid
            container
            className="area_left_row"
            direction="row"
            alignItems="start"
            spacing={0}
          >
            {urlItems.map((item, index) => (
              <Grid
                item
                sm
                key={index}
                onClick={item.onClick}
                className="cursor mt-3 link"
              >
                {item.text}
              </Grid>
            ))}
            {serviceTerms.map((item, index) => (
              <Grid item sm key={index} className="cursor mt-3">
                <LinkComponent routes={item.url} key={index} className="link">
                  {item.text}
                </LinkComponent>
              </Grid>
            ))}
          </Grid>
          {/* <div className="area_left_row">
            {friendUrlItems.map((item, index) => (
              <div key={index}>{item.text}</div>
            ))}
          </div> */}
        </div>
        <div className="area_right">
          <QrCode />
          <FriendSocial />
        </div>
      </div>
      <div className="area_description">
        {nowLang === "zh" ? (
          <ol>
            <li> ©2023 B次元</li>
            <li>于本网站出现的人物角色一律年满 18 岁。</li>
            <li>
              均遵照 18 U.S.C. 2257 Record Keeping Requirements Compliance
              Statement（记录保存合规声明）所要求的记录。
            </li>
            <li>
              您进入本网站即表宣誓您届满所在区域观看成人内容的合法年龄，且您有意愿观看此等内容。
            </li>
            <li> 站点找回邮箱(发信即可回家)：bli2acg@gmail.com </li>
            <li> 客服邮箱/商务邮箱：cs@bbacgn.com </li>
          </ol>
        ) : (
          <ol>
            <li>©2023 BHub Entertainment - All Rights Reserved.</li>
            <li>
              All characters appearing on this website are 18 years or older.
            </li>
            <li>
              It follows 18 U.S.C. 2257 Record Keeping Requirements Compliance
              Statement.
            </li>
            <li>
              By entering this site you swear that you are of legal age in your
              area to view adult material and that you wish to view such
              material.
            </li>
            <li>Back to website：bli2acg@gmail.com </li>
            <li> CS Email/Business Email：cs@bbacgn.com </li>
          </ol>
        )}
      </div>
    </PCFooterElement>
  );
};

export default PCFooter;

export const PCFooterElement = styled.div`
  /*  */
  background-color: #f3f4f5;
  height: ${bottom_footer_height + "px"};
  font-size: 1.1rem;
  width: 100%;
  color: ${colors.text_grey};
  .area {
    display: flex;
    justify-content: center;
    padding: 1em 10em;
    @media (min-width: 900px) {
      padding: 1em 5em;
    }
    @media (max-width: 1080px) {
      padding: 1em 5em;
    }
    @media (min-width: 1081px) {
      padding: 1em 10em;
    }

    &_left {
      border-bottom: 1px solid gray;
      width: 100%;
      justify-content: start;
      &_img {
        display: flex;
        align-items: center;
        height: 40px;
        margin: 20px 0 0 0;
        font-size: 0.8rem;
      }
    }

    &_right {
      border-bottom: 1px solid gray;
      display: grid;
      justify-content: end;
      text-align: center;
      width: 100%;
      padding: 1em;
      display: flex;
      align-items: center;
    }

    &_description {
      padding-bottom: 2em;
      font-size: 0.9rem;
      line-height: 1.2rem;
      text-align: center;
    }
  }
  .link {
    cursor: pointer;
    display: block;
    text-decoration: none;
    white-space: nowrap;
    color: ${colors.text_grey};
    align-self: center;
    &:hover {
      color: ${colors.back_dark_pink};
    }
  }
`;
