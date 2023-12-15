import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getGameListAction } from "./GameAction";
import Game from "./GameRender";

const GameStateToProps = (state) => {
  return {
    gameListData: state.gameListData || [],
  };
};

const GameDispatch = (dispatch) => {
  return {
    updateGameListData: (type, scrollColdEnd = () => {}) => {
      dispatch(getGameListAction(type, scrollColdEnd));
    },
    resetGameListData: () => {
      dispatch({ type: "RESET_GAMELIST" });
    },
  };
};

export default withRouter(connect(GameStateToProps, GameDispatch)(Game));
