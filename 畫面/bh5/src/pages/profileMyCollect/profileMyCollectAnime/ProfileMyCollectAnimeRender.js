import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import ImageComponent from "../../component/ImageComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";
import girl404 from '../../../assets/imgPlaceholder/girl404.png'

const ProfileMyCollectAnime = ({ type, dataList, getListData }) => {
  const intl = useIntl();
  useEffect(() => {
    getListData(type);
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
    <ProfileMyCollectAnimeElement>
      <div className="container">
        {dataList.length ?
          dataList.map((data) => {
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
                    animeId: data.cid,
                    animeEp: 1,
                  },
                }}
                key={data.id}
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
                    <p className="container_item_description_title_text">
                      {data.title}
                    </p>
                  </div>
                  <div className="container_item_description_ep">
                    <p className="container_item_description_ep_text">
                      {data.process === 1
                        ? intl.formatMessage({ id: "GLOBAL.UPDATE_TO" })
                        : intl.formatMessage({ id: "GLOBAL.TOTAL" })}
                      {data.total_episode}
                      {intl.formatMessage({ id: "GLOBAL.WORD" })}
                    </p>
                  </div>
                  <div className="container_item_description_time">
                    <p className="container_item_description_time_text">
                      {data.collect_time}
                    </p>
                  </div>
                </div>
              </LinkComponent>
            );
          })
          :
          <div className="empty">
            <img
              className="empty_img"
              src={girl404}
              alt="404 girl
      "
            />
            <p className="empty_text mb-5 fw-m">
              {intl.formatMessage({ id: "GLOBAL.TIP.NOTHING" })}
            </p>
            <LinkComponent className="empty_button  fw-m"
              routes={{
                name:
                  pageUrlConstants.home.pages.homeMain.pages.homeCategory.name,
                path: pageUrlConstants.home.pages.homeMain.pages.homeCategory.path,
                dynamic: {
                  tab:
                    intl.formatMessage({ id: "GLOBAL.ANIMATE" }),
                },
              }}>
              {intl.formatMessage({ id: "GLOBAL.TIP.SEARCH" })}
            </LinkComponent>
          </div>}
      </div>
    </ProfileMyCollectAnimeElement>
  );
};

export default ProfileMyCollectAnime;

export const ProfileMyCollectAnimeElement = styled.div`
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
      width: 30%;
      max-width: 250px;
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

  .empty {
    width: 100%;
    text-align: center;

    &_img {
      margin: 8% auto 10px auto;
      width: 10%;
      vertical-align: middle;
    }

    &_text {
      font-size: 16px;
      color: #777;
    }

    &_button{
      background-color: ${colors.dark_pink};
      color:#fff;
      border-radius: 20px;
      font-size:18px;
      padding:10px 5%;
      border: 0;
    }
  }
`;
