import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";

import sexCardBack from "../../assets/profile/sex_card_back.svg";
import sexGoldCardBack from "../../assets/profile/sex_gold_card_back.svg";
import { colors, padding } from "../../constants";

import infiniteIcon from "../../assets/profile/buyvip_infinite.svg";
import serverIcon from "../../assets/profile/buyvip_server.svg";
import discountIcon from "../../assets/profile/buyvip_discount.svg";
import { main_height } from "../component/TopBarContainer";

const sexCardBackArr = [sexCardBack, sexGoldCardBack];

const ProfileBuyVipSex = ({
  user,
  vipInfoData,
  setVipInfo,
  buyVipMember,
  toBuyGoldPage,
}) => {
  const intl = useIntl();

  const [selectCard, setSelectCard] = useState(0);

  useEffect(() => {
    if (!vipInfoData.sexvip) {
      setVipInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function buyMemberEvent() {
    if (parseInt(user.money) >= vipInfoData.sexvip[selectCard].pay_price) {
      buyVipMember(vipInfoData.sexvip[selectCard]);
    } else {
      toBuyGoldPage();
    }
  }

  return (
    <ProfileBuyVipSexElement>
      <div className="container">
        <div className="container_body">
          {vipInfoData.sexvip
            ? vipInfoData.sexvip.map((data, index) => {
                return (
                  <ProfileCardItem
                    index={index}
                    selectCard={selectCard}
                    setSelectCard={setSelectCard}
                    active={index}
                    title={data.outside_display_name}
                    description={data.description}
                    price={data.pay_price}
                    back_img={sexCardBackArr[index % sexCardBackArr.length]}
                    key={data.id}
                  />
                );
              })
            : ""}
        </div>
        <div className="container_footer">
          <div className="container_footer_title">
            <p className="container_footer_title_text">
              {intl.formatMessage({
                id: "PROFILE.BUY.LABEL.BENEFIT_INTRODUCE",
              })}
            </p>
          </div>
          <div className="container_footer_description">
            <span className="container_footer_description_text">
              {intl.formatMessage({
                id: "PROFILE.BUY.VIP.AND_CHILL.DESCRIPTION",
              })}
            </span>
          </div>
          <div className="container_footer_highlight">
            <HighlightItem
              icon={infiniteIcon}
              title={intl.formatMessage({
                id: "PROFILE.BUY.VIP.LABEL.WATCH.FOREVER",
              })}
              text={intl.formatMessage({
                id: "PROFILE.BUY.VIP.LABEL.WATCH.ALL_WEBSITE_FREE",
              })}
            />
            <HighlightItem
              icon={serverIcon}
              title={intl.formatMessage({
                id: "PROFILE.BUY.VIP.LABEL.SERVICE.PRIORITY",
              })}
              text={intl.formatMessage({
                id: "PROFILE.BUY.VIP.LABEL.SERVICE.PRIORITY.AFTER_SALE",
              })}
            />
            <HighlightItem
              icon={discountIcon}
              title={intl.formatMessage({
                id: "PROFILE.BUY.VIP.LABEL.AND_CHILL.DISCOUNT",
              })}
              text={intl.formatMessage({
                id: "PROFILE.BUY.VIP.LABEL.AND_CHILL.DISCOUNT.COST",
              })}
            />
          </div>
        </div>
        <div className="container_more_info">
          <p>
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.INFO.DESCRIPTION_1",
            })}
          </p>
          <p>
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.INFO.DESCRIPTION_2",
            })}
          </p>
        </div>
        <div className="container_btn" onClick={buyMemberEvent}>
          <span className="container_btn_text">
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.BUY_NOW",
            })}
          </span>
        </div>
      </div>
    </ProfileBuyVipSexElement>
  );
};

export default ProfileBuyVipSex;

const ProfileBuyVipSexElement = styled.div`
  /*  */
  .container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - ${main_height}px);
    min-height: calc((var(--vh, 1vh) * 100) - ${main_height}px);

    &_body {
      padding: 0 ${padding}px;
      @media (min-width:599px){
        padding:0 35%;
      }
    }

    &_footer {
      padding: ${padding}px;
      margin-top: auto;

      &_title {
        padding-bottom: 5px;
        border-bottom: 2px dashed #a8a8a8;

        &_text {
          font-weight: 600;
          font-size: 16px;
        }
      }

      &_description {
        margin-top: 10px;
        text-align: center;

        &_text {
          font-size: 12px;
          color: ${colors.dark_pink};
        }
      }

      &_highlight {
        display: flex;
        @media (min-width:599px){
          padding:0 30%;
        }
      }
    }

    &_more_info {
      text-align: center;
      color: ${colors.text_light_grey};
      > p {
        padding: 8px;
        &:first-child {
          padding-bottom: 0;
        }
      }
    }

    &_btn {
      cursor: pointer;
      flex-shrink: 0;
      padding: 15px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      background-color: ${colors.dark_pink};
      font-weight: 900;
    }
  }
`;

const ProfileCardItem = ({
  title,
  description,
  price,
  back_img,
  index,
  selectCard,
  setSelectCard,
}) => {
  return (
    <ProfileCardItemElement
      className={selectCard === index ? "active" : ""}
      back_img={back_img}
      onClick={() => {
        setSelectCard(index);
      }}
    >
      <div className="title">
        <p className="title_text">{title}</p>
      </div>
      <div className="description">
        <p className="description_text">{description}</p>
      </div>
      <div className="price">
        <p className="price_text">¥ {price}</p>
      </div>
    </ProfileCardItemElement>
  );
};

const ProfileCardItemElement = styled.div`
  /*  */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-image: url(${({ back_img }) => back_img});
  border-radius: 10px;
  transition: 0.2s;

  &.active {
    box-shadow: 0 0 0 3px #f00;
  }

  .title {
    &_text {
      font-size: 22px;
      font-weight: 600;
    }
  }

  .description {
    &_text {
      margin-top: 10px;
      font-size: 18px;
      line-height: 1.5em;
      white-space: pre;
    }
  }

  .price {
    margin-top: 10px;

    &_text {
      font-size: 16px;
      text-align: right;
    }
  }
`;

export const HighlightItem = ({ icon, title, text ,color=colors.text_grey }) => {
  return (
    <HighlightElementItem color={color}>
      <img className="icon" src={icon} alt={text} title={text} />
      <p className="title">{title}</p>
      <p className="text">{text}</p>
    </HighlightElementItem>
  );
};

const HighlightElementItem = styled.div`
  /*  */
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 15px;

  .icon {
    width: 53%;
  }

  .title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .text {
    margin-top: 10px;
    font-size: 12px;
    color: ${colors.text_grey};
  }
`;
