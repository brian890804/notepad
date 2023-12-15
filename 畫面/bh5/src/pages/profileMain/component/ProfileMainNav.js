import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled/macro";

import goldBagIcon from "../../../assets/icons/bag_gold.svg";
import moneyBagIcon from "../../../assets/icons/bag_money.svg";
import rechargeIcon from "../../../assets/icons/recharge.svg";

import accountWallet from "../../../assets/profile/account_wallet.svg";
// import rechargeIcon from "../../../assets/profile/recharge.svg";
// import invitationIcon from "../../../assets/profile/invitation.svg";
// import myfavIcon from "../../../assets/profile/myfav.svg";
// import customerIcon from "../../../assets/profile/customer.svg";

// import capsuleBanner from "../../../assets/profile/capsule_banner.png"
// import { capsuleUrl, colors, pageUrlConstants } from "../../../constants";
import { colors, pageUrlConstants } from "../../../constants";

import LinkComponent from "../../component/LinkComponent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ProfileMainNav = ({ sign, money }) => {
  const intl = useIntl();
  return (
    <ProfileMainNavElement>
      <div className="profile_container">
        <div className="profile_container_header">
          <h3 className="profile_container_header_title">
            <span className="profile_container_header_title_text ">
              <img
                className="profile_container_header_title_icon mb-2"
                src={accountWallet}
                alt="account wallet icon"
              />
              {intl.formatMessage({ id: "PROFILE.MAIN.NAV.MY_ACCOUNT" })}
            </span>
          </h3>
          <LinkComponent
            className="profile_container_header_recharge"
            routes={pageUrlConstants.profile.pages.profilePayment}
          >
            <img
              className="profile_container_header_title_icon_recharge"
              src={rechargeIcon}
              alt="recharge icon"
            />
            {intl.formatMessage({ id: "PROFILE.MAIN.NAV.CHARGE" })}
          </LinkComponent>
        </div>
        <div className="profile_container_currency">
          <div className="profile_container_currency_gold">
            <img
              className="profile_container_currency_gold_icon"
              src={goldBagIcon}
              alt="gold"
            />
            <p className="profile_container_currency_gold_show">
              {intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })}：
              <span className="profile_container_currency_gold_show_amount">
                {typeof sign === "number" ? sign : "---"}
              </span>
            </p>
          </div>
          <div className="profile_container_currency_money">
            <img
              className="profile_container_currency_money_icon"
              src={moneyBagIcon}
              alt="money"
            />
            <p className="profile_container_currency_money_show">
              {intl.formatMessage({ id: "GLOBAL.MONEY" })}：
              <span className="profile_container_currency_gold_show_amount">
                {money ? parseInt(money) : "---"}
              </span>
            </p>
          </div>
        </div>
        <Divider className="profile_container_divider" />
      </div>
    </ProfileMainNavElement>
  );
};

export default ProfileMainNav;

export const ProfileMainNavElement = styled.div`
  /*  */
  padding: 1% 1% 0 1%;
  background-color: ${colors.back_grey};

  .profile_container {
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      font-size: ${isBrowser && "16px"};

      &_title {
        &_text {
          font-size: ${isBrowser && "28px"};
        }

        &_icon {
          vertical-align: middle;
          margin-right: 5px;
          width: 35px;
          height: 35px;

          &_recharge {
            margin-top:2px;
            width: 25px;
            height: 25px;
          }
        }

        &_text {
          font-weight: 1000;
        }
      }

      &_recharge {
        display: flex;
        align-items: center;
        font-size: 1em;
        text-decoration: none;
        color: #fff;
        background-color: ${colors.back_dark_pink};
        padding: 2px 3px;
      }
    }

    &_divider {
      margin: 0 1% 0 1%;
      border-width: 1px;
    }
  }

  .profile_container_currency {
    display: flex;
    padding-bottom: 20px;

    &_gold {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        right: -0.5px;
        width: 1px;
        height: 100%;
        background-color: #aaa;
      }
    }

    &_gold,
    &_money {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      &_icon {
        margin-bottom: -6px;
        width: 45px;
      }

      &_show {
        margin-left: 10px;
        font-size: ${isBrowser && "16px"};
        color: #646464;

        &_amount {
          font-size: ${isBrowser && "26px"};
          letter-spacing: 1px;
          color: #000;
          font-weight: 900;
        }
      }
    }
  }
`;
