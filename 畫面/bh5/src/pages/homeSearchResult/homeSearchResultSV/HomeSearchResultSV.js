import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";
import CoverCubeItem from "../../component/CoverCubeItem";

import girl404 from "../../../assets/imgPlaceholder/girl404.png";
import useMediaSetting from "../../../reackHook/useMediaSetting";

function HomeSearchResultSV({ isEnd, list }) {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();

  return (
    <HomeSearchResultSVElement className={!isMobile ? "px-indent":"p-2"}>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={isMobile ? 1 : 4}
      >
        {list.map((data) => {
          return (
            <Grid item md={3} xs={6} key={data.id}>
              <CoverCubeItem data={data} isVideo={true}  type="video" total_view_show />
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
    </HomeSearchResultSVElement>
  );
}

const HomeSearchResultSVStateToProps = (state) => {
  let pathneme = state.router.location.pathname.split("/");

  return {
    isEnd: state.homeSearchResultData[pathneme[4]]
      ? state.homeSearchResultData[pathneme[4]]["SV"].isEnd
      : false,
    list: state.homeSearchResultData[pathneme[4]]
      ? [...state.homeSearchResultData[pathneme[4]]["SV"].list]
      : [],
  };
};

const HomeSearchResultSVDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    HomeSearchResultSVStateToProps,
    HomeSearchResultSVDispatchToProps
  )(HomeSearchResultSV)
);

const HomeSearchResultSVElement = styled.div`
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
