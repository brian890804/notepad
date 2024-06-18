import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getHomeLeaderBoardDataAction } from "../HomeLeaderboardAction";

import HomeLeaderboardComic from "./HomeLeaderboardComicRender";

const HomeLeaderboardComicStateToProps = (state) => {
  return {
    list: state.homeLeaderBoard.comic
  };
};

const HomeLeaderboardComicDispatchToProps = (dispatch) => {
  return {
    getLeaderBoardData: () => {
      dispatch(getHomeLeaderBoardDataAction(1));
    }
  };
};

export default withRouter(
  connect(HomeLeaderboardComicStateToProps, HomeLeaderboardComicDispatchToProps)(HomeLeaderboardComic)
);
