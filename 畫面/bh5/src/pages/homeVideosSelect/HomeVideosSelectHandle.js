import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeVideosSelectPage from "./HomeVideosSelectRender";


const HomeVideosSelectStateToProps = (state, ownProps) => {

  return {
  }
};

const HomeVideosSelectDispatchToProps = (dispatch) => {
  return {
  }
}

const HomeVideosSelectHandle = connect( HomeVideosSelectStateToProps, HomeVideosSelectDispatchToProps )(HomeVideosSelectPage);

export default withRouter(HomeVideosSelectHandle);