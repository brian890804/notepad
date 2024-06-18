import { connect } from "react-redux";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";

import ImageComponent from "../../component/ImageComponent";
import { colors, padding, side_padding } from "../../../constants";

import fail404 from "../../../assets/imgPlaceholder/fail404.jpg";
import femaleIcon from "../../../assets/icons/female_alt.svg";
import popularityBg from "../../../assets/social/popularity_bg.svg";
const SocialCard = ({ data }) => {
  const intl = useIntl();
  return (
    <SocialCardElement>
      <div
        className="social_list_container_card_item_top"
        style={{
          position: "relative",
        }}
      >
        <ImageComponent
          src={data.avator}
          cover={true}
          is_cover={true}
          placeholderImg={fail404}
        />
        <div className="social_list_container_card_item_tab">
          <span className="social_list_container_card_item_tab_text">
            {intl.formatMessage({
              id: "SOCIAL.LIST.INFO.LABEL.OFFICIAL.CERTIFICATION",
            })}
          </span>
        </div>
      </div>
      <div className="social_list_container_card_item_info">
        {data.recommend ? (
          <div className="social_list_container_card_item_info_hot">
            <img
              className="social_list_container_card_item_info_hot_img"
              src={popularityBg}
              alt="popularity bg"
            />
            <span className="social_list_container_card_item_info_hot_text">
              {intl.formatMessage({
                id: "SOCIAL.LIST.INFO.LABEL.POPULAR.RECOMMEND",
              })}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="social_list_container_card_item_info_name">
          <span className="social_list_container_card_item_info_name_text">
            {data.nick_name}
          </span>
          <img
            className="social_list_container_card_item_info_name_icon"
            src={femaleIcon}
            alt="sex"
          />
        </div>
        <div className="social_list_container_card_item_info_detail">
          <span className="social_list_container_card_item_info_detail_text">
            <span>
              {data.age}
              {intl.formatMessage({
                id: "SOCIAL.DETAIL.INFO.UNIT.AGE",
              })}
            </span>{" "}
            <span>標準</span> <span>{data.shape || "none"}</span>
          </span>
        </div>
        {/* <div className="social_list_container_card_item_info_description">
                            <span className="social_list_container_card_item_info_description_text">
                              {getFirstParagraph(data.des)}
                            </span>
                          </div> */}
      </div>
    </SocialCardElement>
  );
};

const SocialCardStateToProps = (state, ownProps) => {
  return {
    data: ownProps.data,
  };
};

const SocialCardDispatch = (dispatch) => {
  return {};
};

export default connect(SocialCardStateToProps, SocialCardDispatch)(SocialCard);

export const SocialCardElement = styled.div`
  /*  */
  min-width: 180px;
  position: relative;
  .social_list {
    &_container {
      padding: ${side_padding}px;

      &_card {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        padding: 10px 10px;

        &_item {
          position: relative;
          &_tab {
            position: absolute;
            top: 0;
            left: 0;
            padding: 5px 5%;
            border-radius: 5px 0 0 0;
            background-image: linear-gradient(
              to right,
              #efd7ad 0%,
              #ebcea1 21.702%,
              #daad75 100%
            );

            &_text {
              font-size: 1rem;
              font-weight: 900;
              @media (max-width: 599px) {
                font-size: 1.2rem;
              }
            }
          }

          &_info {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding: ${padding - 10}px;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            @media (max-width: 599px) {
              font-size: 1.6rem;
            }

            &_hot {
              position: relative;

              &_img {
                height: 25px;
              }

              &_text {
                position: absolute;
                top: 5px;
                left: 25px;
                font-size: 12px;
              }
            }

            &_name {
              &_icon {
                margin-left: 10px;
                width: 18px;
                @media (max-width: 599px) {
                  width: 20px;
                }
              }
            }

            &_detail {
              padding-top: 0.5em;
              display: flex;
              &_text {
                span {
                  &:first-child {
                    background-color: #fff;
                    color: ${colors.dark_pink};
                    border-color: #fff;
                  }
                  font-weight: 500;
                  font-size: 1rem;
                  background-color: transparent;
                  color: #fff;
                  padding: 0 0.4em;
                  border: 1px solid;
                  border-radius: 5px;
                  @media (max-width: 599px) {
                    font-size: 1.2rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
