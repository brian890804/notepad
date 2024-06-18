import { useState, useEffect } from "react";
import { isBrowser } from "react-device-detect";
import { useIntl } from "react-intl";

import styled from "@emotion/styled/macro";
import { colors } from "../../../constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import coinIcon from "../../../assets/profile/icon_coin.svg";
import discountIcon from "../../../assets/profile/icon_discount.svg";
import letterIcon from "../../../assets/profile/icon_letter.svg";
import pencilIcon from "../../../assets/profile/icon_pencil.svg";
import missionCenter from "../../../assets/profile/account_mission.svg";

const ProfileMainMissionCenter = ({
  optionEvent,
  config,
  dailyEvent,
  gosharef,
}) => {
  const intl = useIntl();
  const [questInfoList, setQuestInfoList] = useState({});

  useEffect(() => {
    let promote = [];
    for (let i = 1; i <= 5; i++) {
      promote.push({
        title: config["gradename" + i],
        rewardDay: config["sharereg" + i],
        conditionMan: config["renshu" + i],
      });
    }
    let daily = [
      {
        icon: letterIcon,
        title: intl.formatMessage({ id: "PROFILE.PERMISSION.SIGNIN.EVERYDAY" }),
        gold:
          config.signinbegin +
          "-" +
          config.signinend +
          intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" }),
        description: intl.formatMessage({
          id: "PROFILE.PERMISSION.SIGNIN.CLICK.AWARD",
        }),
        button: intl.formatMessage({ id: "PROFILE.PERMISSION.SIGNIN.NOW" }),
        buttonEvent: dailyEvent,
      },
      {
        icon: pencilIcon,
        title: intl.formatMessage({ id: "PROFILE.PERMISSION.INVITE.FRIEND" }),
        gold: config.sharefjb + intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" }),
        description: intl.formatMessage({
          id: "PROFILE.PERMISSION.INVITE.FRIEND.SIGNIN",
        }),
        button: intl.formatMessage({ id: "PROFILE.PERMISSION.INVITE.NOW" }),
        buttonEvent: gosharef,
      },
    ];
    setQuestInfoList({
      promote,
      daily,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return (
    <ProfileMainMissionElement>
      <div className="profile_container">
        <div className="profile_container_header">
          <div className="profile_container_header_title">
            <span className="profile_container_header_title_text">
              <img
                className="profile_container_header_title_icon "
                src={missionCenter}
                alt="account mission icon"
              />
              {intl.formatMessage({ id: "PROFILE.MAIN.OPTION.TASK" })}
            </span>
          </div>
          <div
            className="profile_container_header_all_permission cursor"
            onClick={() => {
              optionEvent["mission"]();
            }}
          >
            {intl.formatMessage({
              id: "PROFILE.MAIN.MISSION.LABEL.ALL_PERMISSION",
            })}
            <FontAwesomeIcon
              className="profile_container_header_all_permission_icon"
              icon={faAngleRight}
            />
          </div>
        </div>
      </div>
      <section className="profile_mission_section board pb-3">
        <div className="board_container">
          {questInfoList.daily?.map((data) => {
            return (
              <div className="board_container_item mb-1" key={data.title}>
                <div className="board_container_item_header">
                  <img
                    className="board_container_item_header_img"
                    src={data.icon}
                    alt={data.title}
                  />
                </div>
                <div className="board_container_item_body">
                  <div className="board_container_item_body_header">
                    {data.title}
                    <span
                      className="title_item gold "
                      style={{
                        color:
                          data.title ===
                          intl.formatMessage({
                            id: "PROFILE.PERMISSION.SIGNIN.EVERYDAY",
                          })
                            ? "#f4eb0b"
                            : "purple",
                      }}
                    >
                      <img
                        className="title_item gold_icon mr-2"
                        src={
                          data.title ===
                          intl.formatMessage({
                            id: "PROFILE.PERMISSION.SIGNIN.EVERYDAY",
                          })
                            ? coinIcon
                            : discountIcon
                        }
                        alt={"discount"}
                      />
                      {data.gold}
                    </span>
                  </div>
                  <div className="board_container_item_body_body pl-1">
                    {data.description}
                  </div>
                </div>
                <div className="board_container_item_footer">
                  <div
                    className="board_container_item_footer_button fw-m"
                    onClick={data.buttonEvent}
                  >
                    {data.button}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="board_back"></div>
      </section>
    </ProfileMainMissionElement>
  );
};

export default ProfileMainMissionCenter;

const ProfileMainMissionElement = styled.div`
  /*  */
  padding: 0% 1%;
  background-color: ${colors.back_grey};

  .profile_container {
    padding: 20px 20px 15px 20px;
    background-color: #fff;

    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: ${isBrowser && "20px"};

      &_title {
        &_text {
          padding-top: 0px;
          font-weight: 1000;
          font-size: ${isBrowser && "28px"};
        }

        &_icon {
          vertical-align: middle;
          margin-right: 5px;
          width: 35px;
          height: 35px;
        }
      }

      &_all_permission {
        font-size: 1em;
        text-decoration: none;
        color: ${colors.text_light_grey};

        &_icon {
          margin-left: 5px;
          margin-top: 5px;
          vertical-align: bottom;
        }
      }
    }
  }
  .profile_mission_section {
    padding: 0 20px;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &.board {
      position: relative;
    }

    .board {
      &_front {
        z-index: 2;
        width: 20px;
        color: #fff;
      }

      &_container {
        .title_item {
          &.gold {
            margin-left: 15px;
            display: flex;
            font-size: ${isBrowser ? "18px" : "14px"};

            &_icon {
              width: 24px;
              height: 24px;

              @media (max-width: 599px) {
                width: 20px;
                height: 20px;
              }
            }
          }
        }

        &_item {
          display: flex;
          padding: 10px 0;

          &_header {
            &_img {
              width: ${isBrowser ? "45px" : "35px"};
              vertical-align: middle;
              border-radius: 10px;
            }
          }

          &_body {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: flex-start;
            margin-left: 10px;

            &_header {
              font-weight: 900;
              font-size: ${isBrowser ? "20px" : "16px"};
              display: -webkit-inline-flex;
              justify-content: center;
            }

            &_body {
              font-size: ${isBrowser ? "14px" : "12px"};
              color: ${colors.text_light_grey};
              &_red {
                color: ${colors.dark_pink};
              }
            }
          }

          &_footer {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;

            &_button {
              cursor: pointer;
              padding: 4px;
              font-size: ${isBrowser && "14px"};
              word-break: keep-all;
              color: ${colors.dark_pink};
              border: solid 1px ${colors.dark_pink};
              border-radius: 100px;
              @media (min-width: 599px) {
                padding: 10px 14px;
              }
            }
          }
        }
      }
    }

    &:first-of-type {
      margin-top: 0;
    }
  }
`;
