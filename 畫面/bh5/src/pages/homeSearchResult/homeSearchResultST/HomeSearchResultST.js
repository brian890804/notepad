import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";
import PictureCard from "../../component/PictureCard";
import MobilePictureCard from "../../homeSearch/component/homeSearchResultST/MobilePictureCard";

import girl404 from "../../../assets/imgPlaceholder/girl404.png";
import useMediaSetting from "../../../reackHook/useMediaSetting";

function HomeSearchResultST({ isEnd, list }) {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();

  return (
    <HomeSearchResultSTElement className={!isMobile ? "px-indent" : "p-2 pb-4"}>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={isMobile ? 1 : 4}
      >
        {list.map((data) => {
          return isMobile ? (
            <Grid item xs={12} key={data.id}>
              <MobilePictureCard data={data}  total_view_show/>
            </Grid>
          ) : (
            <Grid item md={2} key={data.id}>
              <PictureCard data={data}  total_view_show/>
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
    </HomeSearchResultSTElement>
  );
}

const HomeSearchResultSTStateToProps = (state) => {
  let pathneme = state.router.location.pathname.split("/");

  return {
    isEnd: state.homeSearchResultData[pathneme[4]]
      ? state.homeSearchResultData[pathneme[4]]["ST"].isEnd
      : false,
    list: state.homeSearchResultData[pathneme[4]]
      ? [...state.homeSearchResultData[pathneme[4]]["ST"].list]
      : [],
  };
};

const HomeSearchResultSTDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    HomeSearchResultSTStateToProps,
    HomeSearchResultSTDispatchToProps
  )(HomeSearchResultST)
);

const HomeSearchResultSTElement = styled.div`
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
