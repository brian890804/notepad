import { useState } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { colors, padding } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import loadingImg from "../../assets/imgPlaceholder/300x300.jpg";
import { updateFileEventModule } from "../../reducers/actions/utilities";
import callToast from "../../modules/toastCall";

const ProfileFeedback = ({ addFeedback }) => {
  const intl = useIntl();

  const [feedText, setFeedText] = useState("");
  const [postFileArray, setPostFileArray] = useState([]);

  function updateFileEvent(e) {
    let files = updateFileEventModule(e);
    if (files.length > 0) {
      files.map((data) => {
        postFileArray.push(data);
        for (let i = 0; i < postFileArray.length; i++) {
          if (postFileArray[i].progress === 100) {
            continue;
          }
          let reader = new FileReader();
          reader.readAsDataURL(postFileArray[i].file);
          reader.onprogress = function (e) {
            postFileArray[i].progress = Math.floor((e.loaded / e.total) * 99);
            setPostFileArray([...postFileArray]);
          };
          reader.onload = function (e) {
            postFileArray[i].url = e.target.result;
            setPostFileArray([...postFileArray]);
          };
        }
      });
    }
  }

  function feedbackSubmit() {
    if (feedText.length === 0 && postFileArray.length === 0) {
      callToast(intl.formatMessage({ id: "TOAST.TIP.NO_SEE_OPINION_AND_PIC" }));
    } else {
      addFeedback(
        {
          content: feedText,
          file: postFileArray,
        },
        () => {
          setFeedText("");
          setPostFileArray([]);
        }
      );
    }
  }

  return (
    <ProfileFeedbackElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.FEEBACK.LABEL.FEEBACK" })}
          showBack={true}
          show_back_color="#ffffff"
        />
      </TopBarContainer>
      <div className="feedback_container">
        <div className="feedback_container_content">
          <div className="feedback_container_content_title">
            <span className="feedback_container_content_title_text">
              {intl.formatMessage({ id: "PROFILE.FEEBACK.LABEL.CONTENT" })}
            </span>
          </div>
          <div className="feedback_container_content_input">
            <textarea
              className="feedback_container_content_input_textarea"
              maxLength="500"
              placeholder={intl.formatMessage({
                id: "PROFILE.FEEBACK.PLACHOLDER.COMPLAINTS",
              })}
              value={feedText}
              onChange={(e) => {
                setFeedText(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="feedback_container_update">
          <div className="feedback_container_update_title">
            <p className="feedback_container_update_title_text">
              {intl.formatMessage({ id: "PROFILE.FEEBACK.LABEL.UPLOAD_PIC" })}
              <span className="feedback_container_update_title_text_sub">
                {intl.formatMessage({
                  id: "PROFILE.FEEBACK.LABEL.UPLOAD_LIMIT",
                })}
              </span>
            </p>
          </div>
          <div className="feedback_container_update_area">
            <input
              type="file"
              id="updatePostFile"
              className="displaynone"
              accept="image/gif, image/jpeg, image/png, image/jpg"
              onChange={updateFileEvent}
            />
            {postFileArray.map((data) => {
              return (
                <div
                  className="feedback_container_update_area_item"
                  key={data.key}
                >
                  <img
                    className="feedback_container_update_area_item_img"
                    src={data.url}
                    alt="a"
                  />
                </div>
              );
            })}
            {postFileArray.length < 3 ? (
              <label
                htmlFor="updatePostFile"
                className="feedback_container_update_area_item label"
              >
                <FontAwesomeIcon
                  className="feedback_container_update_area_item_img"
                  icon={faPlus}
                />
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="feedback_container_btn" onClick={feedbackSubmit}>
          <p className="feedback_container_btn_text">
            {intl.formatMessage({ id: "PROFILE.FEEBACK.LABEL.SUBMIT" })}
          </p>
        </div>
      </div>
    </ProfileFeedbackElement>
  );
};

export default ProfileFeedback;

export const ProfileFeedbackElement = styled.div`
  /*  */

  background-color: ${colors.back_grey};

  .feedback_container {
    display: flex;
    flex-direction: column;
    padding-top: ${main_height}px;
    box-sizing: border-box;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);

    &_content {
      &_title {
        padding: ${padding}px;

        &_text {
          font-size: 20px;
          color: ${colors.dark_pink};
        }
      }

      &_input {
        &_textarea {
          width: 100%;
          min-height: 200px;
          color: ${colors.text_grey};
          border: none;
          outline: none;
        }
      }
    }

    &_update {
      &_title {
        padding: ${padding}px;

        &_text {
          font-size: 20px;
          color: ${colors.dark_pink};

          &_sub {
            font-size: 0.5em;
            color: #000;
          }
        }
      }

      &_area {
        display: flex;
        background-color: #fff;

        &_item {
          position: relative;
          display: block;
          padding-bottom: 33%;
          margin: 10px;
          width: 33%;
          text-align: center;
          background-position: center;
          background-size: cover;
          background-color: #e9e9e9;
          background-image: url(${loadingImg});

          &_img {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          &.label {
            cursor: pointer;
            background-image: none;

            .feedback_container_update_area_item_img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }

    &_btn {
      cursor: pointer;
      margin-top: auto;

      &_text {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background-color: ${colors.dark_pink};
      }
    }
  }
`;
