import { useState } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import ImageComponent from "../component/ImageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { colors, padding, pageUrlConstants } from "../../constants";
import { updateFileEventModule } from "../../reducers/actions/utilities";
import LinkComponent from "../component/LinkComponent";
import useIndexDBController from "../../reackHook/useIndexDBController";

const ProfileEditInfo = ({
  user,
  clearUserData,
  updateUserAvatar,
  editUserData,
}) => {
  const intl = useIntl();
  const { deleteData } = useIndexDBController();
  const { avatar, nick_name, sex } = user;

  const [userName, setUserName] = useState(nick_name);

  function updateFileEvent(e) {
    let files = updateFileEventModule(e);
    if (files) {
      updateUserAvatar(files[0].file);
    }
  }

  function nameEditEvent(e) {
    editUserData({
      nick_name: e.target.value,
    });
  }

  function sexEditEvent(sex) {
    editUserData({
      sex: sex,
    });
  }

  return (
    <ProfileEditInfoElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({
            id: "PROFILE.EDIT.INFO.LABEL.EDITOR_DATA",
          })}
          showBack={true}
          color="#000"
          back_color="#fff"
        />
      </TopBarContainer>
      <div className="profile_from">
        <label className="profile_from_item cursor_pointer">
          <input
            className="displaynone"
            type="file"
            accept="image/gif, image/jpeg, image/png, image/jpg, image/bmp, video/mp4"
            onChange={updateFileEvent}
          />
          <div className="profile_from_item_img">
            <ImageComponent
              className="profile_from_item_img_img"
              is_cover={true}
              src={avatar}
              placeholderImg={avatar}
              background_color="transparent"
              alt="nick_name"
              title="nick_name"
              border_radius={"50%"}
            />
          </div>
          <div className="profile_from_item_text">
            {intl.formatMessage({
              id: "PROFILE.EDIT.INFO.LABEL.CHANGE_AVATARS",
            })}
          </div>
          <FontAwesomeIcon
            className="profile_from_item_arrow"
            icon={faAngleRight}
          />
        </label>
        <LinkComponent
          className="profile_from_item"
          routes={
            pageUrlConstants.profile.pages.profileEdit.pages.profileEditNickName
          }
        >
          <div className="profile_from_item_label">
            {intl.formatMessage({
              id: "PROFILE.EDIT.INFO.LABEL.EDITOR_NICK_NAME",
            })}
          </div>

          <div className="profile_from_item_input">
            <div className="profile_from_item_input_el">{userName}</div>
          </div>
          <FontAwesomeIcon
            className="profile_from_item_arrow"
            icon={faAngleRight}
          />
        </LinkComponent>
        <div className="profile_from_item">
          <div className="profile_from_item_label">
            {intl.formatMessage({ id: "PROFILE.EDIT.INFO.LABEL.SEX" })}
          </div>
          <div className="profile_from_item_radio">
            <div
              className="profile_from_item_radio_label"
              onClick={() => {
                sexEditEvent(2);
              }}
            >
              <div className="profile_from_item_radio_label_radio">
                <div
                  className={
                    "profile_from_item_radio_label_radio_dot " +
                    (sex === 2 ? "active" : "")
                  }
                />
              </div>
              {intl.formatMessage({ id: "PROFILE.EDIT.INFO.LABEL.MAN" })}
            </div>
            <div
              className="profile_from_item_radio_label"
              onClick={() => {
                sexEditEvent(1);
              }}
            >
              <div className="profile_from_item_radio_label_radio">
                <div
                  className={
                    "profile_from_item_radio_label_radio_dot " +
                    (sex === 1 ? "active" : "")
                  }
                />
              </div>
              {intl.formatMessage({ id: "PROFILE.EDIT.INFO.LABEL.MALE" })}
            </div>
          </div>
        </div>
      </div>
      <LinkComponent
        className="profile_from"
        routes={pageUrlConstants.login.pages.resetPassword}
      >
        <div className="profile_from_item cursor_pointer">
          <div className="profile_from_item_label">
            {intl.formatMessage({
              id: "PROFILE.EDIT.INFO.LABEL.EDIT_PASSWORD",
            })}
          </div>
          <FontAwesomeIcon
            className="profile_from_item_arrow"
            icon={faAngleRight}
          />
        </div>
      </LinkComponent>
      <div
        className="profile_loginout"
        onClick={() => {
          window.localStorage.clear();
          clearUserData();
          deleteData();
        }}
      >
        <div className="profile_loginout_btn">
          {intl.formatMessage({ id: "PROFILE.EDIT.INFO.LABEL.LOGOUT" })}
        </div>
      </div>
    </ProfileEditInfoElement>
  );
};

export default ProfileEditInfo;

export const ProfileEditInfoElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  box-sizing: border-box;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${colors.back_grey};

  .profile_from {
    display: block;
    padding: 0 ${padding}px;
    margin-bottom: 10px;
    text-decoration: none;
    background-color: #fff;

    &_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      font-size: 24px;
      color: #a8a8a8;
      border-bottom: 1px solid #a8a8a8;
      font-weight: 900;
      text-decoration: none;

      &.cursor_pointer {
        cursor: pointer;
      }

      &:last-child {
        border-bottom: none;
      }

      &_label,
      &_img {
        margin-right: auto;
        color: #646464;
      }

      &_img {
        width: 60px;
        height: 60px;
      }

      &_input {
        display: flex;
        width: 60%;
        max-width: 200px;

        &_el {
          width: 100%;
          font-size: 22px;
          text-align: right;
          color: #a8a8a8;
          border: none;
          outline: none;
          font-weight: 900;
        }
      }

      &_radio {
        display: flex;

        &_label {
          cursor: pointer;
          display: flex;
          align-items: center;

          &_radio {
            display: inline-block;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0 5px;
            box-sizing: border-box;
            width: 24px;
            height: 24px;
            border: 2px solid #a8a8a8;
            border-radius: 50%;

            &_dot {
              width: 80%;
              height: 80%;
              border-radius: 50%;

              &.active {
                background-color: #fa719a;
              }
            }
          }
        }
      }

      &_arrow {
        margin-left: 16px;
      }
    }
  }

  .profile_loginout {
    cursor: pointer;
    padding: 20px;
    margin-top: 50px;
    text-align: center;
    background-color: #fff;

    &_btn {
      font-weight: 900;
      font-size: 24px;
      color: #fa719a;
    }
  }
`;
