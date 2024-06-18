import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeLeaderboardAnime from "./HomeLeaderboardAnimeRender";

import { getHomeLeaderBoardDataAction } from "../HomeLeaderboardAction";

const HomeLeaderboardAnimeStateToProps = (state) => {
  return {
    list: state.homeLeaderBoard.anime
  };
};

const HomeLeaderboardAnimeDispatchToProps = (dispatch) => {
  return {
    getLeaderBoardData: () => {
      dispatch(getHomeLeaderBoardDataAction(0));
    }
  };
};

export default withRouter(
  connect(HomeLeaderboardAnimeStateToProps, HomeLeaderboardAnimeDispatchToProps)(HomeLeaderboardAnime)
);
