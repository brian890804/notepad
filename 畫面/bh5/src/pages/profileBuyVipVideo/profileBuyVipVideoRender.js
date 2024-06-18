import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";

import videoCardBack from "../../assets/profile/buyvip_videocard.svg";
import { breakPoint, colors, padding } from "../../constants";

import infiniteIcon from "../../assets/profile/buyvip_infinite.svg";
import serverIcon from "../../assets/profile/buyvip_server.svg";
import discountIcon from "../../assets/profile/buyvip_discount.svg";
import { main_height } from "../component/TopBarContainer";
import useMediaSetting from "../../reackHook/useMediaSetting";

const videoCardBackArr = [videoCardBack];

const ProfileBuyVipVideo = ({
  user,
  vipInfoData,
  setVipInfo,
  buyVipMember,
  toBuyGoldPage,
}) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  const HighlightDatas = [
    {
      icon: infiniteIcon,
      title: "PROFILE.BUY.VIP.LABEL.WATCH.FOREVER",
      text: "PROFILE.BUY.VIP.LABEL.WATCH.ALL_WEBSITE_FREE",
    },
    {
      icon: serverIcon,
      title: "PROFILE.BUY.VIP.LABEL.SERVICE.PRIORITY",
      text: "PROFILE.BUY.VIP.LABEL.SERVICE.PRIORITY.AFTER_SALE",
    },
    {
      icon: discountIcon,
      title: "PROFILE.BUY.VIP.LABEL.AND_CHILL.DISCOUNT",
      text: "PROFILE.BUY.VIP.LABEL.AND_CHILL.DISCOUNT.COST",
    },
  ];
  const [selectCard, setSelectCard] = useState(0);
  useEffect(() => {
    if (!vipInfoData.videovip) {
      setVipInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function buyMemberEvent() {
    if (parseInt(user.money) >= vipInfoData.videovip[selectCard].pay_price) {
      buyVipMember(vipInfoData.videovip[selectCard]);
    } else {
      toBuyGoldPage();
    }
  }

  return (
    <ProfileBuyVipVideoElement>
      <div className="container">
        {vipInfoData.videovip_expired && (
          <div className="container_header">
            <p className="container_header_text">
              {Date.now() < new Date(vipInfoData.videovip_expired).valueOf()
                ? intl.formatMessage({
                    id: "PROFILE.BUY.VIP.VIDEO.CARD.MATURITY.UNTIL",
                  }) +
                  vipInfoData.videovip_expired +
                  intl.formatMessage({ id: "PROFILE.BUY.LABEL.MATURITY" })
                : intl.formatMessage({
                    id: "PROFILE.BUY.VIP.VIDEO.CARD.MATURITY.DESCRIPTION",
                  })}
            </p>
          </div>
        )}
        <div className="container_body">
          <div className="container_body_content">
            {vipInfoData.videovip
              ? vipInfoData.videovip.map((data, index) => {
                  return (
                    <ProfileCardItem
                      index={index}
                      selectCard={selectCard}
                      setSelectCard={setSelectCard}
                      active={index}
                      title={data.outside_display_name}
                      description={data.description}
                      price={data.pay_price}
                      back_img={
                        videoCardBackArr[index % videoCardBackArr.length]
                      }
                      key={data.id}
                    />
                  );
                })
              : ""}
          </div>
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
            <span className="container_footer_description_text fw-m">
              {intl.formatMessage({
                id: "PROFILE.BUY.VIP.VIDEO.LABEL.WATCH.DESCRIPTION",
              })}
            </span>
          </div>
          <div className="container_footer_highlight">
            <Grid
              container
              direction="row"
              alignItems="center"
              className={`${!isMobile&&"px-indent container_footer_highlight_content"}`}
              spacing={4}
            >
              {HighlightDatas.map((data) => {
                return (
                  <Grid item md={4} xs={4} key={data.title}>
                    <HighlightItem
                      icon={data.icon}
                      title={intl.formatMessage({
                        id: data.title,
                      })}
                      text={intl.formatMessage({
                        id: data.text,
                      })}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
        <div className="container_btn" onClick={buyMemberEvent}>
          <span className="container_btn_text">
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.BUY_NOW",
            })}
          </span>
        </div>
      </div>
    </ProfileBuyVipVideoElement>
  );
};

export default ProfileBuyVipVideo;

const ProfileBuyVipVideoElement = styled.div`
  /*  */
  .container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - ${main_height}px);
    min-height: calc((var(--vh, 1vh) * 100) - ${main_height}px);

    &_header {
      margin-top: 20px;
      text-align: center;
      &_text {
        font-size: 16px;
        color: ${colors.text_light_grey};
      }
    }
    &_body {
      display: flex;
      justify-content: center;
      width: 100%;
      &_content {
        width:30%;

        @media (max-width: ${ breakPoint.mobile }px) {
          width:90%;
        }
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
          font-size: 24px;
        }
      }

      &_description {
        margin-top: 10px;
        text-align: center;

        &_text {
          font-size: 16px;
          color: ${colors.dark_pink};
        }
      }

      &_highlight {
        display: flex;
        justify-content: center;
        width: 100%;
        &_content {
          width: 50%;
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
  const intl = useIntl();
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
        <p className="description_text fw-m">{description}</p>
      </div>
      <div className="price">
        <p className="price_text fw-m ">
          {price} &nbsp;
          <label className="price_money fw-xl">
            {intl.formatMessage({
              id: "GLOBAL.MONEY",
            })}
          </label>
          <label className="fw-s">/</label>
          <label className="price_unit_day fw-xl">
            {intl.formatMessage({
              id: "GLOBAL.LABEL.DAY",
            })}
          </label>
        </p>
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
  border-radius: 5px;
  transition: 0.2s;

  &.active {
    box-shadow: 0 0 0 3px ${colors.dark_pink};
  }

  .title {
    &_text {
      font-size: 30px;
      font-weight: 600;
    }
  }

  .description {
    &_text {
      margin-top: 10px;
      line-height: 1.5em;
      white-space: pre;
    }
  }

  .price {
    margin-top: 10px;

    &_text {
      font-size:30px;
      text-align: right;
      
      @media (max-width: ${ breakPoint.mobile }px) {
        font-size: 20px;
      }
    }
    &_unit_day {
      font-size: 22px;

      @media (max-width: ${ breakPoint.mobile }px) {
        font-size: 16px;
      }
    }
  }
`;

const HighlightItem = ({ icon, title, text }) => {
  return (
    <HighlightElementItem>
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
