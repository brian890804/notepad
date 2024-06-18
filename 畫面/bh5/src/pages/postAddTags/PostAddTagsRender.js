import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { colors } from "../../constants";
import WavaButton from "../component/WavaButton";

import close_icon from "../../assets/post/close_icon.svg";

const PostAddTags = ({
  getPostAddTags,
  postTags,
  setPostSelectTags,
  nowSelectTags,
  goBackRoutes,
}) => {
  const intl = useIntl();
  const [storeSelect, setStoreSelect] = useState(nowSelectTags || []);
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    getPostAddTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function onSubmitStore() {
    setPostSelectTags(storeSelect);
    goBackRoutes();
  }
  function onSelect(select) {
    if (storeSelect.find((data) => data.id === select.id)) {
      setStoreSelect(storeSelect.filter((data) => data.id !== select.id));
    } else {
      setStoreSelect((pre) => [...pre, select]);
    }
  }
  function onDelete(select) {
    setStoreSelect(storeSelect.filter((data) => data.id !== select.id));
  }
  return (
    <PostAddTagsElement>
      {isMobile && (
        <TopBarContainer>
          <TopTitleBar
            title={intl.formatMessage({ id: "POST.HOT_TOPIC" })}
            showBack={true}
            color="#000"
            back_color="#fff"
            show_back_color="#000"
          >
            <div className="post_add_tags_confirm_h5" onClick={onSubmitStore}>
              確定
            </div>
          </TopTitleBar>
        </TopBarContainer>
      )}
      {!isMobile && (
        <>
          <TopTitleBar
            title={intl.formatMessage({ id: "POST.HOT_TOPIC" })}
            showBack={true}
            color="#000"
            back_color="#fff"
            show_back_color="#000"
          />
          <div className="post_add_tags_confirm" onClick={onSubmitStore}>
            確定
          </div>
        </>
      )}
      <section className="post_add_tags_main">
        <h2 className="post_add_tags_title">热门标籤</h2>
        <div className="post_add_tags ">
          {postTags.map((item) => {
            return (
              <div onClick={() => onSelect(item)}>
                <WavaButton
                  className={`post_add_tags_main_item cursor ${
                    storeSelect.find((data) => data.id === item.id)
                      ? "active"
                      : ""
                  }`}
                  key={item.name}
                >
                  {item.name}
                </WavaButton>
              </div>
            );
          })}
        </div>

        <h2 className="post_add_tags_title">已选择</h2>
        <div className="post_add_tags">
          {storeSelect.map((item) => {
            return (
              <div className="post_add_tags_main_item_container">
                <div
                  className={`post_add_tags_main_item  ${
                    storeSelect.find((data) => data.id === item.id)
                      ? "active"
                      : ""
                  }`}
                  key={item.name}
                >
                  {item.name}
                </div>
                <div
                  className="post_add_tags_close cursor"
                  onClick={() => onDelete(item)}
                >
                  <img src={close_icon} alt="Close Icon" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PostAddTagsElement>
  );
};

export default PostAddTags;

export const PostAddTagsElement = styled.article`
  /*  */

  @media (max-width: 899px) {
    padding-top: ${main_height}px;
  }

  .post_add_tags {
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 5em;
    @media (max-width: 899px) {
      padding: 5px 10px;
    }
    &_confirm {
      position: absolute;
      top: 0;
      right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: ${main_height}px;
      cursor: pointer;
      color: ${colors.dark_pink};
      font-weight: 600;
      &_h5 {
        cursor: pointer;
        color: ${colors.dark_pink};
        font-weight: 600;
      }
    }

    &_title {
      padding: 5px 25px;
      margin-top: 10px;
      color: ${colors.text_grey};
      font-weight: 600;
      font-size: 18px;
    }

    &_main {
      background-color: #fff;
      min-height: 100vh;
      border-top: solid;
      border-width: 1px;
      border-color: rgba(0, 0, 0, 0.3);
      &_item {
        line-height:20px;
        padding: 5px 20px;
        border-radius: 16px;
        color: #a8a8a8;
        background: #f3f4f5;
        white-space: nowrap;
        transition: all 0.5s ease-in-out;
        &.active {
          color: #fff;
          background: ${colors.dark_pink};
        }

        &_container {
          position: relative;
        }
      }
    }

    &_close {
      position: absolute;
      top: 0;
      right: 0;
      top: -6px;
      right: -4px;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
`;
