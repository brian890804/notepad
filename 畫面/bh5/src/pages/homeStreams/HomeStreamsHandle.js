import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getStreamListAction } from "./HomeStreamsAction";

import HomeStreamsPage from "./HomeStreamsRender";

const HomeStreamsStateToProps = (state) => {
  return {
    streamList: state.homeStreamList
  }
};

const HomeStreamsDispatchToProps = (dispatch) => {
  return {
    getStreamList: () => {
      dispatch(getStreamListAction());
    }
  }
}

const HomeStreamsHandle = connect( HomeStreamsStateToProps, HomeStreamsDispatchToProps )(HomeStreamsPage);

export default withRouter(HomeStreamsHandle);