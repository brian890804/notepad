import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";
import CoverCubeItem from "../../component/CoverCubeItem";

import girl404 from "../../../assets/imgPlaceholder/girl404.png";
import useMediaSetting from "../../../reackHook/useMediaSetting";

function HomeSearchResultSAC({ isEnd, list }) {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();

  return (
    <HomeSearchResultSACElement className={!isMobile ? "px-indent" : "p-2"}>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={isMobile ? 1 : 4}
      >
        {list.map((data) => {
          return (
            <Grid item md={2} xs={4} key={data.id}>
              <CoverCubeItem data={data} total_view_show />
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
    </HomeSearchResultSACElement>
  );
}

const HomeSearchResultSACStateToProps = (state) => {
  let pathneme = state.router.location.pathname.split("/");
  return {
    isEnd: state.homeSearchResultData[pathneme[4]]
      ? state.homeSearchResultData[pathneme[4]]["SAC"].isEnd
      : false,
    list: state.homeSearchResultData[pathneme[4]]
      ? [...state.homeSearchResultData[pathneme[4]]["SAC"].list]
      : [],
  };
};

const HomeSearchResultSACDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    HomeSearchResultSACStateToProps,
    HomeSearchResultSACDispatchToProps
  )(HomeSearchResultSAC)
);

const HomeSearchResultSACElement = styled.div`
  /*  */
  display: flex;
  flex-wrap: wrap;
  margin-top: 1%;
  padding-left: 10%;
  padding-right: 10%;

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
