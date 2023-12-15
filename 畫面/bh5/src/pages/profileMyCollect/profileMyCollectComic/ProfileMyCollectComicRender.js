import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";
import ImageComponent from "../../component/ImageComponent";
import girl404 from "../../../assets/imgPlaceholder/girl404.png";

const ProfileMyCollectComic = ({ type, dataList, getListData }) => {
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
    scrollBottomCallEvent(() => {
      getListData(type);
    });
  }
  return (
    <ProfileMyCollectComicElement>
      <div className="container">
        {dataList.length ? (
          dataList.map((data) => {
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
                    comicId: data.cid,
                  },
                }}
                key={data.id}
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
                    <p className="container_item_description_title_text fw-m">
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
                      {data.collect_time}
                    </p>
                  </div>
                </div>
              </LinkComponent>
            );
          })
        ) : (
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
            <LinkComponent
              className="empty_button  fw-m"
              routes={{
                name: pageUrlConstants.home.pages.homeMain.pages.homeCategory
                  .name,
                path: pageUrlConstants.home.pages.homeMain.pages.homeCategory
                  .path,
                dynamic: {
                  tab: intl.formatMessage({ id: "GLOBAL.COMICS" }),
                },
              }}
            >
              {intl.formatMessage({ id: "GLOBAL.TIP.SEARCH" })}
            </LinkComponent>
          </div>
        )}
      </div>
    </ProfileMyCollectComicElement>
  );
};

export default ProfileMyCollectComic;

export const ProfileMyCollectComicElement = styled.div`
  /*  */
  .container_item {
    display: flex;
    padding: ${padding}px;
    text-decoration: none;
    color: #000;
    border-bottom: 1px solid #aaa;

    &:last-child {
      border-bottom: none;
    }

    &_cover {
      flex-shrink: 0;
      width: 20%;
      max-width: 100px;
    }

    &_description {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 20px;

      &_title {
        font-size: 20px;
      }

      &_ep,
      &_time {
        &_text {
          color: ${colors.text_grey};
        }
      }

      &_ep {
        margin-top: 40px;
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

    &_button {
      background-color: ${colors.dark_pink};
      color: #fff;
      border-radius: 20px;
      font-size: 18px;
      padding: 10px 5%;
      border: 0;
    }
  }
`;
