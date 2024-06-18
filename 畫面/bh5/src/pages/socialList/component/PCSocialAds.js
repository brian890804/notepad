import styled from "@emotion/styled/macro";
import { useIntl } from "react-intl";

import {
  colors,
  officialContact,
  pageUrlConstants,
  socialForm,
} from "../../../constants";
import privacy from "../../../assets/social/privacy.svg";
import safe from "../../../assets/social/safe.svg";
import badge from "../../../assets/social/badge.svg";
import bgImg from "../../../assets/social/bg.png";
import WavaButton from "../../component/WavaButton";
import { pushRoutes } from "../../../reducers/actions/historyActions";

import { useDispatch } from "react-redux";

const { login } = pageUrlConstants;

const PCSocialAds = ({ token }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const introduce = [
    {
      text: intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.PRIVACY" }),
      icon: privacy,
    },
    {
      text: intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.SAFE" }),
      icon: safe,
    },
    {
      text: intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.BADGE" }),
      icon: badge,
    },
  ];
  function onUrlClick(type) {
    // setShowStationed(true);
    switch (type) {
      case "social-form":
        return window.open(socialForm + "?id=" + token);
      case "service":
        return window.open(officialContact);
      case "login":
        return dispatch(pushRoutes(login.pages.loginMain));
      default:
        break;
    }
  }
  return (
    <PCSocialAdsElement>
      <div className="pc_social_top_container">
        <div className="pc_social_title">
          {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.TITLE" })}
        </div>
        <div className="pc_social_description">
          {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.DESCRIPTION" })}
        </div>
        <div className="pc_social_introduce">
          {introduce.map((item) => (
            <div className="pc_social_introduce_item">
              <div className="pc_social_introduce_item_icon">
                <img src={item.icon} alt={item.text} />
              </div>
              <div className="pc_social_introduce_item_text">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pc_social_join">
        <div className="pc_social_join_left">
          <div className="pc_social_join_left_description1">
            {intl.formatMessage({
              id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.CONTINUE",
            })}
          </div>
          <div className="pc_social_join_left_description2">
            {intl.formatMessage({
              id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.DESCRIPTION_1",
            })}
          </div>
        </div>
        <div className="pc_social_join_right">
          {token !== undefined ? (
            <div onClick={() => onUrlClick("social-form")}>
              <WavaButton className="pc_social_join_right_button">
                {intl.formatMessage({
                  id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.HONEY",
                })}
              </WavaButton>
            </div>
          ) : (
            <div onClick={() => onUrlClick("login")}>
              <WavaButton className="pc_social_join_right_button">
                {intl.formatMessage({
                  id: "LOGIN.LABEL.GO_LOGIN",
                })}
              </WavaButton>
            </div>
          )}

          <div
            className="pc_social_join_right_join_us"
            onClick={() => onUrlClick("service")}
          >
            {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.US" })}
          </div>
        </div>
      </div>
    </PCSocialAdsElement>
  );
};

export default PCSocialAds;
const PCSocialAdsElement = styled.div`
  /*  */

  .pc_social {
    &_top_container {
      background-image: url(${bgImg});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      text-align: center;
      padding-top: 0.5em;
      line-height: 3em;
    }

    &_title {
      color: ${colors.back_dark_pink};
      font-size: 2.2rem;
      font-weight: 600;
    }

    &_description {
      color: ${colors.text_grey};
      font-size: 1.5rem;
      font-weight: 600;
    }

    &_introduce {
      display: flex;
      justify-content: center;

      &_item {
        padding: 1em 2em;
        &_icon {
          display: flex;
          img {
            width: 70px;
            height: 70px;
          }
        }

        &_text {
          color: ${colors.text_grey};
          font-size: 1.2rem;
        }
      }
    }
    &_join {
      display: flex;
      justify-content: center;
      font-weight: 600;
      margin-top: 1em;
      &_left {
        text-align: start;
        margin-right: 3em;
        &_description1 {
          color: ${colors.back_dark_pink};
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        &_description2 {
          color: ${colors.text_grey};
          font-weight: 600;
          font-size: 1.5rem;
        }
      }

      &_right {
        display: flex;
        justify-content: center;
        font-size: 1.4rem;
        align-self: center;
        cursor: pointer;

        &_button {
          flex-shrink: 0;
          display: inline-block;
          overflow: hidden;
          margin: 10px;
          color: #fff;
          background-color: ${colors.back_dark_pink};
          border: 1px solid ${colors.dark_pink};
          border-radius: 50px;
          padding: 1em 3em;
        }

        &_join_us {
          align-self: center;
          margin-left: 2em;
          color: #39b3fd;
          border-bottom: 1px solid #39b3fd;
        }
      }
    }
  }
`;
