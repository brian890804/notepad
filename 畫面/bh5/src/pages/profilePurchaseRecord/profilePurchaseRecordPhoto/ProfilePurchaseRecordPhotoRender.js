import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";
import ImageComponent from "../../component/ImageComponent";
const ProfilePurchaseRecordPhoto = ({ type, dataList, getListData }) => {

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
    <ProfilePurchaseRecordPhotoElement>
      <div className="container">
        {dataList.map((data) => {
          return (
            <LinkComponent
              className="container_item"
              routes={{
                name: pageUrlConstants.home.pages.homePhotosContent.name + data.title,
                path: pageUrlConstants.home.pages.homePhotosContent.path,
                dynamic: {
                  photoId: data.bid,
                },
              }}
              key={'photo' + data.id}
            >
              <div className="container_item_cover">
                <ImageComponent
                  src={data.img}
                  alt={data.title}
                  title={data.title}
                  height={145}
                />
              </div>
              <div className="container_item_description">
                <div className="container_item_description_title">
                  <p className="container_item_description_title_text fw-l">
                    {data.title}
                  </p>
                </div>
                <div className="container_item_description_time">
                  <p className="container_item_description_time_text fw-m">
                    {data.create_time}
                  </p>
                </div>
              </div>
            </LinkComponent>
          );
        })}
      </div>
    </ProfilePurchaseRecordPhotoElement>
  );
};


export default ProfilePurchaseRecordPhoto;

export const ProfilePurchaseRecordPhotoElement = styled.div`/*  */
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
    width: 10%;
    max-width: 250px;
  }

  &_description {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 20px;

    &_time {
      &_text {
        color: ${colors.text_grey};
      }
    }
  }
}
`;