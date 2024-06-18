import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";

import ImageComponent from "../component/ImageComponent";
import {
  apiUrl,
  colors,
  padding,
  requestUrlConstants,
  pageUrlConstants,
} from "../../constants";
import { moneyAndGold } from "../vendorMain/component/VendorItemCard";

import likeIcon from "../../assets/icons/heart.svg";
import unLikeIcon from "../../assets/icons/empty_heart.svg";
import { bottom_nav_height } from "../component/BottomNavBar";

import buyIcon from "../../assets/vendor/buy.svg";
// import sendGiftIcon from "../../assets/vendor/send_gift.svg";
import LinkComponent from "../component/LinkComponent";
import store from "../../store";
import axiosRequest from "../../modules/axiosItem";

import copyIcon from "../../assets/vendor/copy.jpg";
import callToast from "../../modules/toastCall";

function VendorGoods({
  goodsId,
  goodsData,
  getVendorGoods,
  likeVendorGoodsEvent,
  toVendorSheetPage,
}) {
  const intl = useIntl();
  const [justBuy, setJustBuy] = useState(false);

  useEffect(() => {
    getVendorGoods(goodsId);
    setJustBuy(window.sessionStorage.getItem("buyRecord"));
    window.sessionStorage.setItem("buyRecord", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function buyGoodsEvent(buyType) {
    toVendorSheetPage(goodsId, buyType);
  }

  function clickLikeEvent() {
    likeVendorGoodsEvent(goodsId);
  }

  function redeemCode() {
    let formData = new FormData();
    formData.append("uid", store.getState().user.id);
    formData.append("sid", goodsId);
    axiosRequest
      .post(requestUrlConstants.postGetCouponRedeemUrl, formData)
      .then((data) => {
        console.log(data);
      });
  }

  function copyCode() {
    navigator.clipboard
      .writeText(justBuy)
      .then((data) => {
        callToast(intl.formatMessage({ id: "TOAST.TIP.SUCCESS.COPY" }));
      })
      .catch((err) => {
        callToast(
          intl.formatMessage({ id: "TOAST.TIP.UNSUCCESS.ACTION.HAND.COPY" })
        );
      });
  }

  return (
    <VendorGoodsElement>
      <TopBarContainer not_fixed={true} show_shadow={false}>
        <TopTitleBar
          showBack={true}
          show_back_color="#fff"
          back_color="transparent"
        />
      </TopBarContainer>
      <div className="container">
        <div className="container_header">
          <div className="container_header_cover">
            <ImageComponent
              src={
                goodsData.picurl?.indexOf("http") === -1
                  ? apiUrl + "/" + goodsData.picurl
                  : goodsData.picurl
              }
              placeholderImg={
                goodsData.picurl?.indexOf("http") === -1
                  ? apiUrl + "/" + goodsData.picurl
                  : goodsData.picurl
              }
              alt={goodsData.title}
              title={goodsData.title}
              toFixSize={true}
              border_radius={0}
            />
          </div>
          <div className="container_header_info">
            <div className="container_header_info_description">
              <div className="container_header_info_description_title">
                <span className="container_header_info_description_title_text">
                  {goodsData.title}
                </span>
              </div>
              <div className="container_header_info_description_price">
                {moneyAndGold(goodsData.mone, goodsData.yue, intl)}
              </div>
            </div>
            <div
              className="container_header_info_like"
              onClick={clickLikeEvent}
            >
              <div className="container_header_info_like_icon">
                <img
                  className="container_header_info_like_icon_img"
                  src={goodsData.is_like === 0 ? unLikeIcon : likeIcon}
                  alt="like"
                />
              </div>
              <div className="container_header_info_like_number">
                <span
                  className={
                    "container_header_info_like_number_text " +
                    (goodsData.is_like === 0 ? "" : "like")
                  }
                >
                  {goodsData.total_like
                    ? goodsData.total_like +
                      intl.formatMessage({
                        id: "VENDOR.GOODS.LABEL.LIKE.PEOPLE",
                      })
                    : intl.formatMessage({ id: "VENDOR.GOODS.LABEL.LIKE" })}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container_body">
          <div className="container_body_title">
            <span className="container_body_title_text">
              {intl.formatMessage({
                id: "VENDOR.GOODS.LABEL.PRODUCT.DESCRIPTION",
              })}
            </span>
          </div>
          <div
            className="container_body_content "
            dangerouslySetInnerHTML={{
              __html: goodsData.miaoshu,
            }}
          />
        </div>
      </div>
      <div className="footer">
        {justBuy ? (
          <>
            <div className="footer_extract">
              <img
                className="footer_extract_icon"
                src={copyIcon}
                alt="copyIcon"
                onClick={copyCode}
              />
              {goodsData.item_type === "dianka"
                ? intl.formatMessage({
                    id: "VENDOR.GOODS.LABEL.REDEMPTION_CODE",
                  })
                : intl.formatMessage({ id: "VENDOR.GOODS.LABEL.PICK_CODE" })}
              <span className="footer_extract_text"> {justBuy} </span>
            </div>
            <LinkComponent
              className="footer_btn"
              routes={
                goodsData.item_type === "dianka"
                  ? pageUrlConstants.profile.pages.profileBuyVip.pages
                      .profileBuyVipCommon
                  : {
                      linkurl: goodsData.url,
                    }
              }
            >
              {intl.formatMessage({ id: "VENDOR.GOODS.ACTION.NOW.GO" })}
            </LinkComponent>
          </>
        ) : goodsData.pay_type ? (
          <span
            className="footer_btn"
            onClick={() => {
              buyGoodsEvent(0);
            }}
          >
            <img className="footer_btn_img" src={buyIcon} alt="buyIcon" />
            {intl.formatMessage({ id: "VENDOR.GOODS.ACTION.NOW.BUY" })}
          </span>
        ) : goodsData.item_type === "dianka" ? (
          <div className="footer_btn" onClick={redeemCode}>
            {intl.formatMessage({ id: "VENDOR.GOODS.ACTION.NOW.RECEIVED" })}
          </div>
        ) : (
          <LinkComponent
            className="footer_btn"
            routes={{
              linkurl: goodsData.url,
            }}
          >
            {intl.formatMessage({ id: "VENDOR.GOODS.ACTION.NOW.GO" })}
          </LinkComponent>
        )}
      </div>
    </VendorGoodsElement>
  );
}

export default VendorGoods;

const VendorGoodsElement = styled.div`
  /*  */
  padding-bottom: ${bottom_nav_height}px;

  .container {
    &_header {
      padding-bottom: 20px;
      border-bottom: 20px solid #f3f4f5;

      &_cover {
        padding: 0%;
        @media (min-width: 599px) {
          padding: 0 30%;
        }
      }

      &_info {
        display: flex;
        justify-content: space-between;
        padding: 0 ${padding}px;

        &_description {
          &_title {
            margin-top: 10px;

            &_text {
              font-size: 20px;
              font-weight: 700;
            }
          }
        }

        &_like {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-self: center;
          text-align: center;

          &_icon {
            width: 35px;
            height: 35px;
            @media (min-width: 599px) {
              width: 50px;
              height: 50px;
            }
            &_img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
            }
          }

          &_number {
            &_text {
              &.like {
                color: ${colors.dark_pink};
              }
            }
          }
        }
      }
    }

    &_body {
      &_title {
        padding: ${padding}px;

        &_text {
          font-size: 20px;
          flex-wrap: 700;
          color: ${colors.text_grey};
        }
      }

      &_content {
        padding: 1% 10%;

        img {
          margin-bottom: 10px;
          width: 100%;
        }

        span,
        p {
          margin-bottom: 15px;
          line-height: 22px;
        }
      }
    }
  }

  .footer {
    position: fixed;
    display: flex;
    bottom: 0;
    height: ${bottom_nav_height}px;
    color: #fff;
    background-color: #fff;
    width: 100%;
    padding-bottom: 15px;

    &_btn {
      cursor: pointer;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      height: 100%;
      text-decoration: none;
      color: #fff;
      background-color: ${colors.back_dark_pink};
      border-radius: 10px;

      &_img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }

      &.send {
        color: ${colors.back_dark_pink};
        background-color: #fff;
        border: 2px solid ${colors.back_dark_pink};
      }
    }

    &_extract {
      flex-grow: 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;

      &_icon {
        cursor: pointer;
        width: 30px;
      }

      &_text {
        margin-left: 10px;
        color: ${colors.text_grey};
      }

      & + .footer_btn {
        max-width: 200px;
      }
    }
  }

  .price {
    font-weight: 700;
    margin-top: 10px;
    font-size: 20px;
    color: ${colors.dark_pink};

    &_small {
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
`;
