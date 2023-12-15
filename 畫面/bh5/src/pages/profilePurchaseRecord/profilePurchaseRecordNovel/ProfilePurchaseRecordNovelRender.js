import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";

const ProfilePurchaseRecordNovel = ({ type, dataList, getListData }) => {

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
    <ProfilePurchaseRecordNovelElement>
            <div className="container">
        {dataList.map((data) => {
          return (
            <LinkComponent
              className="container_item"
              routes={{
                name: pageUrlConstants.home.pages.homeNovelsContent.name + data.title,
                path: pageUrlConstants.home.pages.homeNovelsContent.path,
                dynamic: {
                  novelId: data.bid,
                },
              }}
              key={'novel'+data.id}
            >
              <div className="container_item_description">
                <div className="container_item_description_title">
                  <p className="container_item_description_title_text">
                    {data.title}
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
    </ProfilePurchaseRecordNovelElement>
  );
};


export default ProfilePurchaseRecordNovel;

export const ProfilePurchaseRecordNovelElement = styled.div`/*  */
.container_item {
  display: flex;
  padding: ${padding / 2}px;
  text-decoration: none;
  color: #000;
  border-bottom: 1px solid #aaa;

  &:last-child {
    border-bottom: none;
  }

  &_description {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 20px;

    &_time {
      margin-top: 20px;

      &_text {
        color: ${colors.text_grey};
      }
    }
  }
}
`;