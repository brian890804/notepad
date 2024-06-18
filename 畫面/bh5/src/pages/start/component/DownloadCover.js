import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";

import start_role from "./start_role.png";
import start_cover from "./start_cover.jpg";
// import LinkComponent from "../../component/LinkComponent";
// import { colors, downloadBackUrl, downloadPageUrl } from "../../../constants";
import { colors } from "../../../constants";
import callToast from "../../../modules/toastCall";
import {
  // handleApkClick,
  handleSkipApkClick,
} from "../../../modules/gtmEventHandle";
// import { handleSkipApkClick } from "../../../modules/gtmEventHandle";

const DownloadCover = ({ closeAds }) => {
  const intl = useIntl();
  function copyTelegramId() {
    try {
      navigator.clipboard.writeText("j80640");
      callToast(intl.formatMessage({ id: "TOAST.TIP.SUCCESS.COPY" }));
    } catch (err) {
      alert(intl.formatMessage({ id: "TOAST.TIP.UNSUCCESS.NOT_SUPPORT" }));
    }
  }

  return (
    <DownloadCoverElement>
      <div className="container">
        <div className="container_cover">
          <img className="container_cover_img" src={start_role} alt="blili" />
        </div>
        <div className="container_box">
          <div className="container_box_item">
            <div
              className="container_box_item_btn"
              onClick={() => {
                handleSkipApkClick();
                closeAds();
              }}
            >
              {intl.formatMessage({ id: "DOWNLOAD.WATCH.NOW" })}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="footer_content">
          {intl.formatMessage({ id: "DOWNLOAD.LABEL.DESCRIPTION_1" })}
        </p>
        <div className="footer_btn" onClick={copyTelegramId}>
          <span className="footer_btn_text">
            {intl.formatMessage({ id: "DOWNLOAD.ACTION.CLICK.COPY" })}
          </span>
        </div>
      </div>
    </DownloadCoverElement>
  );
};

export default DownloadCover;

const DownloadCoverElement = styled.div`
  /*  */
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-position: center;
  background-size: cover;

  background-image: url(${start_cover});

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    &_cover {
      width: 60%;
      text-align: center;
      &_img {
        width: 100%;
        @media(min-width:599px){
          width:40%;
        }
      }
    }

    &_box {
      display: flex;
      justify-content: space-evenly;
      margin-top: 20px;
      width: 100%;

      &_item {
        display: flex;
        flex-direction: column;

        &_btn {
          cursor: pointer;
          padding: 15px 0;
          width: 150px;
          font-size: 20px;
          text-align: center;
          text-decoration: none;
          color: #fff;
          background-image: linear-gradient(to right, #fe8990 0, #ff647c 100%);
          border-radius: 100px;
          font-weight: 900;

          &.white {
            text-decoration: underline;
            color: #fe8990;
            background-image: unset;
          }
        }
      }
    }
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 8px;
    background-image: linear-gradient(to right, #fe8990 0, #ff647c 100%);

    &_content {
      font-size: 14px;
      color: #fff;
    }

    &_btn {
      cursor: pointer;
      padding: 6px 12px;
      background-color: #fff;
      border-radius: 30px;

      &_text {
        font-weight: 900;
        color: ${colors.dark_pink};
      }
    }
  }
`;

export { DownloadCoverElement };
