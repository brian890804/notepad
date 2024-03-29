import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import styled from "@emotion/styled/macro";

import { pushRoutes } from "../../reducers/actions/historyActions";

import { colors, pageUrlConstants } from "../../constants";

import WavaButton from "./WavaButton";

import homeIcon from "../../assets/bottomNav/home_pre_btn.png";
import homeIconSelected from "../../assets/bottomNav/home_selected_btn.png";
import feedIcon from "../../assets/bottomNav/feed_pre_btn.png";
import feedIconSelected from "../../assets/bottomNav/feed_selected_btn.png";
import socialIcon from "../../assets/bottomNav/social_pre_btn.png";
import socialIconSelected from "../../assets/bottomNav/social_selected_btn.png";
import vendorIcon from "../../assets/bottomNav/shop_pre_btn.png";
import vendorIconSelected from "../../assets/bottomNav/shop_selected_btn.png";
import infoIcon from "../../assets/bottomNav/info_pre_btn.png";
import infoIconSelected from "../../assets/bottomNav/info_selected_btn.png";

const { home, post, social, vendor, profile } = pageUrlConstants;

const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};

const BottomNavBar = ({
  location,
  clickItem,
  showBottomNav,
  new_coupon_notification,
}) => {
  const root = useRef(null);
  const intl = useIntl();
  let [navList, setNavList] = useState(() => [
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.INDEX" }),
      name: home.pages.homeMain.name,
      path: home.pages.homeMain.path,
      image: homeIcon,
      activeImage: homeIconSelected,
    },
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.DYNAMIC" }),
      name: post.pages.postMain.name,
      path: post.pages.postMain.path,
      image: feedIcon,
      activeImage: feedIconSelected,
    },
    // {
    //   cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.AND_CHILL" }),
    //   name: social.name,
    //   path: social.path,
    //   image: socialIcon,
    //   activeImage: socialIconSelected,
    // },
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.MALL" }),
      name: vendor.name,
      path: vendor.path,
      image: vendorIcon,
      activeImage: vendorIconSelected,
    },
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.MY" }),
      name: profile.name,
      path: profile.path,
      image: infoIcon,
      activeImage: infoIconSelected,
      decoration: {
        show: new_coupon_notification,
      },
    },
  ]);

  useEffect(() => {
    // navList[4].decoration.show = new_coupon_notification;
    setNavList(navList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new_coupon_notification]);

  return (
    <BottomNavBarElement ref={root} show_bottom_nav={showBottomNav}>
      <div className="bottom_nav">
        {navList.map((data) => {
          return (
            <div
              className="bottom_nav_item"
              key={data.cname}
              onClick={(e) => {
                clickItem(data);
              }}
            >
              <WavaButton
                className={
                  "bottom_nav_item_btn " +
                  (location.indexOf(data.path) !== -1 ? "active" : "")
                }
                currentRefs={[root]}
              >
                <div className="bottom_nav_item_btn_icon">
                  <img
                    className={"bottom_nav_item_btn_icon_img"}
                    src={
                      location.indexOf(data.path) !== -1
                        ? data.activeImage
                        : data.image
                    }
                    alt="icon"
                  />
                  {data.decoration?.show ? (
                    <div className="bottom_nav_item_btn_icon_dot" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="bottom_nav_item_btn_title">
                  <p className="bottom_nav_item_btn_title_text">{data.cname}</p>
                </div>
              </WavaButton>
            </div>
          );
        })}
      </div>
    </BottomNavBarElement>
  );
};

const BottomStateToProps = (state, ownProps) => {
  return {
    location: state.router.location.pathname || "",
    showBottomNav: ownProps.showBottomNav,
    new_coupon_notification: state.user.new_coupon_notification,
  };
};

const BottomDispatchToProps = (dispatch) => {
  return {
    clickItem: (routes) => {
      dispatch(pushRoutes(routes));
    },
  };
};

BottomNavBar.propTypes = {
  location: PropTypes.string.isRequired,
};

export default connect(
  BottomStateToProps,
  BottomDispatchToProps
)(React.memo(BottomNavBar, areEqual));

export const bottom_nav_height = 62;

const BottomNavBarElement = styled.div`
  /*  */
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  height: ${bottom_nav_height}px;
  transform: ${({ show_bottom_nav }) =>
    "translateY(" + (show_bottom_nav ? "1" : "110") + "%)"};
  margin: auto;
  background-color: #fff;
  box-shadow: 0 -1px 2px 0 rgb(0 0 0 / 30%);
  .bottom_nav {
    display: flex;
    &_item {
      cursor: pointer;
      user-select: none;
      flex-grow: 1;

      &_btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;

        &_icon {
          position: relative;
          width: 30px;
          height: 30px;

          &_img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
            transition: 0.3s;
          }

          &_dot {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 10px;
            height: 10px;
            background-color: #f00;
            border-radius: 50%;
          }
        }

        &_title {
          &_text {
            font-size: 12px;
            color: ${colors.text_grey};
            font-weight: 600;
          }
        }

        &.active {
          .bottom_nav_item_btn_icon_img {
            transform: translateY(-3px) scale(1.01);
            transform-origin: bottom center;
          }

          .bottom_nav_item_btn_title_text {
            color: ${colors.dark_pink};
          }
        }
      }
    }
  }
  @media (min-width: 599px) {
    max-width: 100%;
    .bottom_nav_item_btn_title_text {
      font-size: 16px;
    }
    .bottom_nav_item_btn_icon {
      width: 30px;
      height: 30px;
    }
  }
`;
