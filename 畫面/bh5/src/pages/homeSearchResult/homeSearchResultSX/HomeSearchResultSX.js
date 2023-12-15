import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";
import NovelCard from "../../component/NovelCard";
import MobileNovelCard from "../../homeSearch/component/heomSearchResultSX/MobileNovelCard";

import girl404 from "../../../assets/imgPlaceholder/girl404.png";
import useMediaSetting from "../../../reackHook/useMediaSetting";

function HomeSearchResultSX({ isEnd, list }) {
  const { isMobile } = useMediaSetting();
  const intl = useIntl();

  return (
    <HomeSearchResultSXElement className={!isMobile ? "px-indent" : "p-2"}>
      <Grid container direction="row" alignItems="center" spacing={2}>
        {list.map((data, index) => {
          return isMobile ? (
            <Grid item xs={12} key={data.id}>
              <MobileNovelCard data={data} border={index < list.length - 1}total_view_show/>
            </Grid>
          ) : (
            <Grid item md={2} key={data.id}>
              <NovelCard data={data} total_view_show />
            </Grid>
          );
        })}
      </Grid>

      {isEnd && list.length === 0 ? (
        <div className="empty">
          <img
            className="empty_img"
            src={girl404}
            alt="404 girl
          "
          />
          <p className="empty_text">
            {intl.formatMessage({ id: "GLOBAL.TIP.NOTHING" })}
          </p>
        </div>
      ) : (
        ""
      )}
    </HomeSearchResultSXElement>
  );
}

const HomeSearchResultSXStateToProps = (state) => {
  let pathneme = state.router.location.pathname.split("/");
  return {
    isEnd: state.homeSearchResultData[pathneme[4]]
      ? state.homeSearchResultData[pathneme[4]]["SX"].isEnd
      : false,
    list: state.homeSearchResultData[pathneme[4]]
      ? [...state.homeSearchResultData[pathneme[4]]["SX"].list]
      : [],
  };
};

const HomeSearchResultSXDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    HomeSearchResultSXStateToProps,
    HomeSearchResultSXDispatchToProps
  )(HomeSearchResultSX)
);

const HomeSearchResultSXElement = styled.div`
  /*  */
  display: flex;
  flex-wrap: wrap;
  margin-top: 1%;

  .empty {
    width: 100%;
    text-align: center;

    &_img {
      margin: 50px 0 10px;
      width: 120px;
      vertical-align: middle;
    }

    &_text {
      font-size: 14px;
      color: #777;
    }
  }
`;
