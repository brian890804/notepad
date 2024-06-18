import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";
import ImageComponent from "../../component/ImageComponent";
const ProfilePurchaseRecordComic = ({ type, dataList, getListData }) => {
  const intl = useIntl();
  useEffect(() => {
    if (dataList.length === 0) {
      getListData(type);
    }
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      getListData(type, scrollColdEnd);
    });
  }
  return (
    <ProfilePurchaseRecordComicElement>
      <div className="container">
        {dataList.map((data) => {
          return (
            <LinkComponent
              className="container_item"
              routes={{
                name:
                  pageUrlConstants.home.pages.homeComicList.pages
                    .homeComicListSwitch.pages.homeComicListContent.name +
                  data.title,
                path: pageUrlConstants.home.pages.homeComicList.pages
                  .homeComicListSwitch.pages.homeComicListContent.path,
                dynamic: {
                  comicId: data.bid,
                },
              }}
              key={'comic'+data.id}
            >
              <div className="container_item_cover">
                <ImageComponent
                  src={data.img}
                  alt={data.title}
                  title={data.title}
                  height={140}
                  
                />
              </div>
              <div className="container_item_description">
                <div className="container_item_description_title">
                  <p className="container_item_description_title_text fw-l">
                    {data.title}
                  </p>
                </div>
                <div className="container_item_description_ep">
                  <p className="container_item_description_ep_text fw-m">
                    {data.process === 1
                      ? intl.formatMessage({ id: "GLOBAL.UPDATE_TO" })
                      : intl.formatMessage({ id: "GLOBAL.TOTAL" })}
                    {data.total_episode}
                    {intl.formatMessage({ id: "GLOBAL.WORD" })}
                  </p>
                </div>
                <div className="container_item_description_time">
                  <p className="container_item_description_time_text">
                    {data.create_time}
                  </p>
                </div>
              </div>
            </LinkComponent>
          );
        })}
      </div>
    </ProfilePurchaseRecordComicElement>
  );
};

export default ProfilePurchaseRecordComic;

export const ProfilePurchaseRecordComicElement = styled.div`
  /*  */
  .container_item {
    display: flex;
    padding: ${padding / 2}px;
    text-decoration: none;
    color: #000;
    border-bottom: 1px solid #aaa;

    &:last-child {
      border-bottom: none;
    }

    &_cover {
      flex-shrink: 0;
      width: 6%;
      max-width: 150px;
    }

    &_description {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 20px;

      &_ep,
      &_time {
        &_text {
          color: ${colors.text_grey};
        }
      }

      &_ep {
        margin-top: 20px;
      }
    }
  }
`;
