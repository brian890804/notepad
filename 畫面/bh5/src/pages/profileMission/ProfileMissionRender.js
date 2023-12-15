import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import missionBanner from "../../assets/profile/task_banner.jpg";
import badge_lv_3 from "../../assets/profile/badge_lv_3.png";
import badge_lv_4 from "../../assets/profile/badge_lv_4.png";
import badge_lv_5 from "../../assets/profile/badge_lv_5.png";
import badge_lv_6 from "../../assets/profile/badge_lv_6.png";
import badge_lv_7 from "../../assets/profile/badge_lv_7.png";
import letterIcon from "../../assets/profile/icon_letter.svg";
import pencilIcon from "../../assets/profile/icon_pencil.svg";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { colors } from "../../constants";

const badgeList = [
  "",
  badge_lv_3,
  badge_lv_4,
  badge_lv_5,
  badge_lv_6,
  badge_lv_7,
];

const ProfileMission = ({ config, dailyEvent, gosharef }) => {
  const intl = useIntl();
  const [questInfoList, setQuestInfoList] = useState({});

  useEffect(() => {
    let promote = [];
    for (let i = 1; i <= 5; i++) {
      promote.push({
        badge: badgeList[i],
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
    <ProfileMissionElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.MAIN.OPTION.TASK" })}
          show_back_color="#ffffff"
          showBack={true}
        />
      </TopBarContainer>
      <section className="profile_mission_section banner">
        <img
          className="banner_img"
          src={missionBanner}
          alt={intl.formatMessage({ id: "PROFILE.MAIN.OPTION.TASK.BOARD" })}
        />
      </section>
      <section className="profile_mission_section board">
        <div className="board_front">
          {intl.formatMessage({ id: "PROFILE.PERMISSION.TASK.PROMOTE" })}
        </div>
        <div className="board_container">
          {questInfoList.promote?.map((data) => {
            return (
              <div className="board_container_item" key={data.title}>
                <div className="board_container_item_header">
                  <img
                    className="board_container_item_header_img badgeBGI"
                    src={data.badge}
                    alt={data.title}
                  />
                </div>
                <div className="board_container_item_body">
                  <div className="board_container_item_body_header title_item">
                    {data.title}
                  </div>
                  <div className="board_container_item_body_body">
                    {intl.formatMessage({ id: "GLOBAL.ACTION.SHARE" })}
                    <span className="board_container_item_body_body_red">
                      {data.conditionMan}
                    </span>
                    {intl.formatMessage({
                      id: "PROFILE.PERMISSION.BOARD.DESCRIPTION",
                    })}
                    <span className="board_container_item_body_body_red">
                      {data.rewardDay === 999
                        ? intl.formatMessage({
                            id: "PROFILE.MAIN.LABEL.INFINITE",
                          })
                        : data.rewardDay}
                    </span>
                    {intl.formatMessage({ id: "GLOBAL.LABEL.DAY" })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="board_back"></div>
      </section>
      <section className="profile_mission_section board">
        <div className="board_front">
          {intl.formatMessage({ id: "PROFILE.PERMISSION.TASK.EVERYDAY" })}
        </div>
        <div className="board_container">
          {questInfoList.daily?.map((data) => {
            return (
              <div className="board_container_item" key={data.title}>
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
                    <span className="title_item gold">{data.gold}</span>
                  </div>
                  <div className="board_container_item_body_body">
                    {data.description}
                  </div>
                </div>
                <div className="board_container_item_footer">
                  <div
                    className="board_container_item_footer_button"
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
    </ProfileMissionElement>
  );
};

export default ProfileMission;

export const ProfileMissionElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  background-color: ${colors.back_grey};

  .profile_mission_section {
    padding: 10px;
    margin-top: 10px;
    background-color: #fff;

    .banner {
      &_img {
        width: 100%;
        vertical-align: middle;
      }
    }

    &.board {
      position: relative;
    }

    .board {
      &_front,
      &_back {
        position: absolute;
        top: -3px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        text-align: center;
        background-image: linear-gradient(
          to bottom,
          #fa83b3,
          #f45c8c 55%,
          ${colors.dark_pink}
        );
        border-radius: 10px;
      }

      &_front {
        z-index: 2;
        width: 200px;
        color: #fff;
      }

      &_container {
        position: relative;
        z-index: 1;
        padding: 0 10px;
        font-size: 14px;
        background-color: #fff;
        border: 2px solid #ff547c;
        border-radius: 15px;

        .title_item {
          display: inline-block;
          padding: 2px 12px;
          color: ${colors.dark_pink};
          background-color: rgb(250 113 154 / 20%);
          border: solid 1px ${colors.dark_pink};
          border-radius: 12px;
          font-weight: 500;

          &.gold {
            margin-left: 15px;
          }
        }

        &_item {
          display: flex;
          padding: 10px 0;

          &:first-of-type {
            margin-top: 20px;
          }

          &:last-of-type {
            margin-bottom: 20px;
          }

          &_header {
            &_img {
              padding: 2px;
              width: 50px;
              vertical-align: middle;
              border-radius: 10px;

              &.badgeBGI {
                background-image: linear-gradient(
                  -45deg,
                  #313e61 0%,
                  #313e61 60%,
                  #1a2950 60.001%,
                  #1a2950 100%
                );
              }
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
            }

            &_body {
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
              padding: 5px 8px;
              font-size: 12px;
              word-break: keep-all;
              color: ${colors.dark_pink};
              border: solid 1px ${colors.dark_pink};
              border-radius: 16px;
            }
          }
        }
      }

      &_back {
        z-index: 0;
        display: flex;
        overflow: hidden;
        padding: 0 0 10px;
        width: 220px;

        &::after,
        &::before {
          content: "";
          border-top: 15px solid ${colors.dark_pink};
        }

        &::before {
          margin-right: auto;
          border-right: 10px solid ${colors.dark_pink};
          border-radius: 0 19px 0 0;
        }

        &::after {
          border-left: 10px solid ${colors.dark_pink};
          border-radius: 19px 0 0;
        }
      }
    }

    &:first-of-type {
      margin-top: 0;
    }
  }
`;
