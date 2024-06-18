import { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../../modules/scrollEvent";
import LinkComponent from "../../component/LinkComponent";
import { colors, padding, pageUrlConstants } from "../../../constants";
import girl404 from '../../../assets/imgPlaceholder/girl404.png'

const ProfileMyCollectNovel = ({ type, dataList, getListData }) => {
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
    <ProfileMyCollectNovelElement>
      <div className="container">
        {dataList.length ? dataList.map((data) => {
          return (
            <LinkComponent
              className="container_item"
              routes={{
                name:
                  pageUrlConstants.home.pages.homeNovelsContent.name +
                  data.title,
                path: pageUrlConstants.home.pages.homeNovelsContent.path,
                dynamic: {
                  novelId: data.cid,
                },
              }}
              key={data.id}
            >
              <div className="container_item_description">
                <div className="container_item_description_title">
                  <p className="container_item_description_title_text">
                    {data.title}
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
        }) :
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
                name: pageUrlConstants.home.pages.homeMain.pages.homeNovels.name,
                path: pageUrlConstants.home.pages.homeMain.pages.homeNovels.path,
              }}>
              {intl.formatMessage({ id: "GLOBAL.TIP.SEARCH" })}
            </LinkComponent>
          </div>
        }
      </div>
    </ProfileMyCollectNovelElement>
  );
};

export default ProfileMyCollectNovel;

export const ProfileMyCollectNovelElement = styled.div`
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
