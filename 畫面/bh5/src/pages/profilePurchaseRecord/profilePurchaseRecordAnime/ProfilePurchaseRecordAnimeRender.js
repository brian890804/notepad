import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";
import ImageComponent from "../../component/ImageComponent";
const ProfilePurchaseRecordAnime = ({ type, dataList, getListData }) => {
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
    <ProfilePurchaseRecordAnimeElement>
      <div className="container">
        {dataList.map((data) => {
          return (
            <LinkComponent
              className="container_item"
              routes={{
                name:
                  pageUrlConstants.home.pages.homeAnimesSwitch.pages
                    .homeAnimesContent.name +
                  data.title +
                  "-1",
                path: pageUrlConstants.home.pages.homeAnimesSwitch.pages
                  .homeAnimesContent.path,
                dynamic: {
                  animeId: data.bid,
                  animeEp: 1,
                },
              }}
              key={'animate' + data.id}
            >
              <div className="container_item_cover">
                <ImageComponent
                  src={data.img}
                  alt={data.title}
                  title={data.title}
                  height={65}
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
    </ProfilePurchaseRecordAnimeElement>
  );
};

export default ProfilePurchaseRecordAnime;

export const ProfilePurchaseRecordAnimeElement = styled.div`
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
      width: 12%;
      max-width: 250px;
      padding:0.5%;
    }

    &_description {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 10px;

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
