import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import ImageComponent from "../../component/ImageComponent";
import { pageUrlConstants, side_padding } from "../../../constants";
import { connect } from "react-redux";
import { pushRoutes } from "../../../reducers/actions/historyActions";
import viewDarkIcon from "../../../assets/icons/view_dark.svg";
import { judeTotalViewUnit } from "../../../reducers/actions/utilities";

const paddingNumber = (number, length) => {
  if (number.length < length) {
    number = "0" + number;
    return paddingNumber(number, length);
  } else {
    return number;
  }
};

const LeaderBoardCard = ({
  id,
  user,
  index,
  isComic,
  data,
  pushLoginRoutes,
  pushComicRoutes,
  pushAnimeRoutes,
}) => {
  const intl = useIntl();

  function clickToMoveRoute() {
    if (user.id === "guest") {
      pushLoginRoutes();
    } else {
      if (isComic) {
        pushComicRoutes(id, data.title);
      } else {
        pushAnimeRoutes(id, data.title);
      }
    }
  }

  return (
    <LeaderBoardCardElement>
      <div className="card" onClick={clickToMoveRoute}>
        <div className="card_rank">
          <span className={"card_rank_text " + (index < 3 ? "big" : "")}>
            {index < 3 ? index + 1 : paddingNumber(String(index + 1), 2)}
          </span>
        </div>
        <div className={"card_cover " + (isComic ? "comic" : "")}>
          <ImageComponent
            className="card_cover_img"
            src={data.img}
            alt={data.title}
            title={data.title}
            height={isComic ? 140 : 65}
            cover={!isComic}
          />
        </div>
        <div className="card_description">
          <div className="card_description_title">
            <p className="card_description_title_text">{data.title}</p>
          </div>
          <div className="card_description_text">
            <p className="card_description_text_text">{data.description}</p>
          </div>
          <div className="card_description_tag">
            <p className="card_description_tag_text">{data.tag_gp.join(" ")}</p>
          </div>
          <div className="card_description_total">
            <p className="card_description_total_text">
              <img
                src={viewDarkIcon}
                alt="Bh5_view"
                className="card_description_img"
              />
              {judeTotalViewUnit(data.fake_total_view)}・
              {data.process === 1
                ? intl.formatMessage({ id: "GLOBAL.UPDATE_TO" })
                : intl.formatMessage({ id: "GLOBAL.TOTAL" })}
              {data.total_episode}
              {intl.formatMessage({ id: "GLOBAL.WORD" })}
            </p>
          </div>
        </div>
      </div>
    </LeaderBoardCardElement>
  );
};

const LeaderBoardCardStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    user: state.user,
    index: ownProps.index,
    isComic: ownProps.isComic,
    data: ownProps.data,
  };
};

const LeaderBoardCardDispatchToProps = (dispatch) => {
  return {
    pushLoginRoutes: () => {
      dispatch(pushRoutes(pageUrlConstants.login));
    },
    pushComicRoutes: (id, title) => {
      dispatch(
        pushRoutes({
          name:
            pageUrlConstants.home.pages.homeComicList.pages.homeComicListSwitch
              .pages.homeComicListContent.name + title,
          path: pageUrlConstants.home.pages.homeComicList.pages
            .homeComicListSwitch.pages.homeComicListContent.path,
          dynamic: {
            comicId: id,
          },
        })
      );
    },
    pushAnimeRoutes: (id, title) => {
      dispatch(
        pushRoutes({
          name:
            pageUrlConstants.home.pages.homeAnimesSwitch.pages.homeAnimesContent
              .name +
            title +
            "-1",
          path: pageUrlConstants.home.pages.homeAnimesSwitch.pages
            .homeAnimesContent.path,
          dynamic: {
            animeId: id,
            animeEp: 1,
          },
        })
      );
    },
  };
};

export default connect(
  LeaderBoardCardStateToProps,
  LeaderBoardCardDispatchToProps
)(LeaderBoardCard);

export const LeaderBoardCardElement = styled.div`
  /*  */
  .card {
    cursor: pointer;
    display: flex;
    padding: 0 ${side_padding}px;
    margin: 20px 0;

    &_rank {
      flex-shrink: 0;
      position: relative;
      width: 50px;

      &_text {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 40px;

        &.big {
          font-weight: 700;
          margin-right: -5px;
          font-size: 80px;
        }
      }
    }

    &_cover {
      flex-shrink: 0;
      margin-left: 5px;
      width: 45%;

      &.comic {
        width: 20%;
        @media (min-width: 599px) {
          width: 30%;
        }
      }
    }

    &_description {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 10px;
      width: 0;

      &_title {
        overflow: hidden;
        height: 32px;

        &_text {
          font-size: 16px;
          line-height: 16px;
        }
      }

      &_text,
      &_tag,
      &_total {
        overflow: hidden;

        &_text {
          overflow: hidden;
          display: flex;
          width: 100%;
          font-size: 12px;
          line-height: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #a8a8a8;
        }
      }
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
`;
