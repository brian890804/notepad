import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { imgUrl, padding, pageUrlConstants } from "../../../constants";
import ImageComponent from "../../component/ImageComponent";
const ProfilePurchaseRecordSocial = ({ type, dataList, getListData }) => {

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
    <ProfilePurchaseRecordSocialElement>
      <div className="container">
        {dataList.map((data) => {
          return (
            <LinkComponent
              className="container_item"
              routes={{
                name: pageUrlConstants.social.pages.socialDetailInfo.name + data.title,
                path: pageUrlConstants.social.pages.socialDetailInfo.path,
                dynamic: {
                  profileId: data.bid,
                },
              }}
              key={'social'+data.id}
            >
              <div className="container_item_cover">
                <ImageComponent
                  src={imgUrl + data.img}
                  alt={data.title}
                  title={data.title}
                  height={145}
                />
              </div>
              <div className="container_item_description">
                <div className="container_item_description_title">
                  <p className="container_item_description_title_text">
                    {data.title}
                  </p>
                </div>
                <div className="container_item_description_info">
                  <p className="container_item_description_info_text">
                    {data.description}
                  </p>
                </div>
              </div>
            </LinkComponent>
          );
        })}
      </div>
    </ProfilePurchaseRecordSocialElement>
  );
};


export default ProfilePurchaseRecordSocial;

export const ProfilePurchaseRecordSocialElement = styled.div`/*  */
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
    width: 20%;
    max-width: 150px;
  }

  &_description {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 20px;
  }
}
`;